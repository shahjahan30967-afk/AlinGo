const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pickup: String,
  drop: String,
  status: { type: String, default: "requested" }
});

module.exports = mongoose.model("Ride", RideSchema);
