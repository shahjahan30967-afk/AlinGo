const mongoose = require("mongoose");

const LogisticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  parcelDetails: { type: String, required: true },
  weight: { type: Number }, // in kg
  status: {
    type: String,
    enum: ["requested", "picked", "in-transit", "delivered", "cancelled"],
    default: "requested"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Logistics", LogisticsSchema);
