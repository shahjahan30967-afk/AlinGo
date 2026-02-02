const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected routes
router.get("/all", authMiddleware, hotelController.getHotels);
router.post("/book", authMiddleware, hotelController.bookHotel);
router.get("/my-bookings", authMiddleware, hotelController.getBookings);

module.exports = router;
