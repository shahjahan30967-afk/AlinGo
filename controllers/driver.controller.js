const Ride = require("../models/Ride");
const Logistics = require("../models/Logistics");
const User = require("../models/User");

// GET Pending Rides / Assignments
exports.getAssignments = async (req, res) => {
  const rides = await Ride.find({ status: "requested" });
  const shipments = await Logistics.find({ status: "requested" });
  res.json({ success: true, rides, shipments });
};

// ACCEPT Ride
exports.acceptRide = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) return res.status(404).json({ message: "Ride not found" });

  ride.driver = req.user.id;
  ride.status = "accepted";
  await ride.save();

  res.json({ success: true, ride });
};

// UPDATE Ride Status
exports.updateRideStatus = async (req, res) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) return res.status(404).json({ message: "Ride not found" });

  const { status } = req.body;
  ride.status = status;
  await ride.save();

  res.json({ success: true, ride });
};

// ACCEPT Shipment
exports.acceptShipment = async (req, res) => {
  const shipment = await Logistics.findById(req.params.id);
  if (!shipment) return res.status(404).json({ message: "Shipment not found" });

  shipment.driver = req.user.id;
  shipment.status = "picked";
  await shipment.save();

  res.json({ success: true, shipment });
};

// UPDATE Shipment Status
exports.updateShipmentStatus = async (req, res) => {
  const shipment = await Logistics.findById(req.params.id);
  if (!shipment) return res.status(404).json({ message: "Shipment not found" });

  const { status } = req.body;
  shipment.status = status;
  await shipment.save();

  res.json({ success: true, shipment });
};
