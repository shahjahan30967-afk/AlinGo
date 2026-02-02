const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected Driver Routes
router.get("/assignments", authMiddleware, driverController.getAssignments);

// Rides
router.post("/ride/accept/:id", authMiddleware, driverController.acceptRide);
router.post("/ride/status/:id", authMiddleware, driverController.updateRideStatus);

// Shipments
router.post("/shipment/accept/:id", authMiddleware, driverController.acceptShipment);
router.post("/shipment/status/:id", authMiddleware, driverController.updateShipmentStatus);

module.exports = router;
