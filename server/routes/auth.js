import express from "express";
import {
  registerUser,
  loginUser,
  verifyOTP,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", protect, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-otp", verifyOTP);

export default router;
