const mongoose = require("mongoose");

const HotelBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomsBooked: { type: Number, default: 1 },
  totalPrice: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["booked", "checked-in", "checked-out", "cancelled"],
    default: "booked"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HotelBooking", HotelBookingSchema);
