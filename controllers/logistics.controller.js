const Logistics = require("../models/Logistics");

// CREATE Parcel / Shipment
exports.createShipment = async (req, res) => {
  const { pickupAddress, deliveryAddress, parcelDetails, weight } = req.body;

  const shipment = await Logistics.create({
    user: req.user.id,
    pickupAddress,
    deliveryAddress,
    parcelDetails,
    weight
  });

  res.json({ success: true, shipment });
};

// GET USER Shipments
exports.getShipments = async (req, res) => {
  const shipments = await Logistics.find({ user: req.user.id });
  res.json({ success: true, shipments });
};

// GET SINGLE Shipment
exports.getShipment = async (req, res) => {
  const shipment = await Logistics.findById(req.params.id).populate("user");
  if (!shipment) return res.status(404).json({ message: "Shipment not found" });
  res.json({ success: true, shipment });
};
