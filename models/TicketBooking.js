const mongoose = require("mongoose");

const TicketBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  seatsBooked: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TicketBooking", TicketBookingSchema);
