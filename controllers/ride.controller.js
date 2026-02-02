const Ride = require("../models/Ride");

// CREATE RIDE
exports.createRide = async (req, res) => {
  const { pickupLocation, dropLocation } = req.body;

  const ride = await Ride.create({
    user: req.user.id,
    pickupLocation,
    dropLocation
  });

  res.json({ success: true, ride });
};

// GET USER RIDES
exports.getRides = async (req, res) => {
  const rides = await Ride.find({ user: req.user.id });
  res.json({ success: true, rides });
};

// GET SINGLE RIDE
exports.getRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id).populate("driver user");
  if (!ride) return res.status(404).json({ message: "Ride not found" });
  res.json({ success: true, ride });
};
