import User from "../models/User.js";
import OTP from "../models/OTP.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/email.js";

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      email,
      otp,
      action: "account-verification",
    });

    await sendOtpEmail(email, otp, "account-verification");

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials. Please sign up.",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!existingUser.isVerified && existingUser.role === "user") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OTP.deleteMany({
        email,
        action: "account-verification",
      });

      await OTP.create({
        email,
        otp,
        action: "account-verification",
      });

      await sendOtpEmail(email, otp, "account-verification");

      return res.status(400).json({
        message: "Please verify your email. OTP sent.",
        email,
      });
    }

    res.status(200).json({
      message: "Login successful",
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      token: generateToken(existingUser._id, existingUser.role),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({
      email,
      otp,
      action: "account-verification",
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    );

    await OTP.deleteMany({
      email,
      action: "account-verification",
    });

    res.status(200).json({
      message: "OTP verified successfully",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id, updatedUser.role),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
