import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  bookEvent,
  sendBookingOTP,
  getMYBookings,
  confirmBooking,
  cancelBooking,
} from "../controllers/bookingController.js";
import Booking from "../models/Booking.js";
const router = express.Router();
router.get("/", protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});
router.post("/", protect, bookEvent);
router.post("/send-otp", protect, sendBookingOTP);
router.get("/my", protect, getMYBookings);
router.put("/:id/confirm", protect, admin, confirmBooking);
router.delete("/:id", protect, admin, cancelBooking);

export default router;
