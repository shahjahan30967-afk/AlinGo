const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  roomsAvailable: { type: Number, default: 0 },
  pricePerNight: { type: Number, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Hotel", HotelSchema);
