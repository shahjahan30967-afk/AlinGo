const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },

  status: {
    type: String,
    enum: ["requested", "accepted", "ongoing", "completed", "cancelled"],
    default: "requested"
  },

  fare: { type: Number, default: 0 },
  distance: { type: Number }, // in km
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ride", RideSchema);
