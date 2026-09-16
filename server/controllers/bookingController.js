import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import OTP from "../models/OTP.js";

import { sendBookingEmail, sendOtpEmail } from "../utils/email.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ===============================
// SEND BOOKING OTP
// ===============================
export const sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOTP();

    // Remove old booking OTP
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event-booking",
    });

    // Create new OTP
    await OTP.create({
      email: req.user.email,
      otp,
      action: "event-booking",
    });

    // Send OTP email
    await sendOtpEmail(req.user.email, otp, "event-booking");

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error, "error123");
    console.error("Send booking OTP error:", error);

    res.status(500).json({
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

// ===============================
// BOOK EVENT
// ===============================
export const bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;
    console.log("Booking request received:", {
      eventId,
      otp,
      user: req.user.email,
    });

    // Validate input
    if (!eventId || !otp) {
      return res.status(400).json({
        message: "Event ID and OTP are required",
      });
    }

    // Verify OTP
    const validOTP = await OTP.findOne({
      email: req.user.email,
      otp,
      action: "event-booking",
    });
    console.log("Valid OTP found:", validOTP);
    if (!validOTP) {
      return res.status(400).json({
        message: "Invalid or expired OTP for booking",
      });
    }

    // Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check seats
    if (event.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    // Check existing booking
    const existingBooking = await Booking.findOne({
      userId: req.user._id,
      eventId,
    });

    if (existingBooking && existingBooking.status !== "cancelled") {
      return res.status(400).json({
        message: "Already booked or pending",
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      status: "pending",
      paymentStatus: "non_paid",
      amount: event.ticketPrice,
    });

    // Delete OTP after successful booking request
    await OTP.deleteOne({
      _id: validOTP._id,
    });

    res.status(201).json({
      message: "Booking request submitted",
      booking,
    });
  } catch (error) {
    console.error("Book event error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// CONFIRM BOOKING - ADMIN
// ===============================
export const confirmBooking = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    console.log(paymentStatus, "paymentStatus");

    const booking = await Booking.findById(req.params.id)
      .populate("userId")
      .populate("eventId");
    console.log("Booking found:", booking);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({
        message: "Booking is already confirmed",
      });
    }

    // Find event
    const event = await Event.findById(booking.eventId._id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // Check available seats
    if (event.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available to confirm this booking",
      });
    }

    // Confirm booking
    booking.status = "confirmed";

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    await booking.save();

    // Reduce available seats
    event.availableSeats -= 1;

    await event.save();

    // Send confirmation email
    await sendBookingEmail(
      booking.userId.email,
      booking.userId.name,
      booking.eventId.title,
    );

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    console.error("Confirm booking error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// GET MY BOOKINGS
// ===============================
export const getMYBookings = async (req, res) => {
  try {
    const bookings =
      req.user.role === "admin"
        ? await Booking.find()
            .populate("eventId")
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
        : await Booking.find({
            userId: req.user._id,
          })
            .populate("eventId")
            .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// CANCEL BOOKING
// ===============================
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Authorization check
    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Already cancelled",
      });
    }

    // Remember whether seat was previously deducted
    const wasConfirmed = booking.status === "confirmed";

    booking.status = "cancelled";

    await booking.save();

    // Restore seat only for confirmed booking
    if (wasConfirmed) {
      const event = await Event.findById(booking.eventId);

      if (event) {
        event.availableSeats += 1;

        await event.save();
      }
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
