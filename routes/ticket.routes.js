const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected routes
router.get("/all", authMiddleware, ticketController.getTickets);
router.post("/book", authMiddleware, ticketController.bookTicket);
router.get("/my-bookings", authMiddleware, ticketController.getBookings);

module.exports = router;
