const express = require("express");
const router = express.Router();
const logisticsController = require("../controllers/logistics.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected routes
router.post("/create", authMiddleware, logisticsController.createShipment);
router.get("/my-shipments", authMiddleware, logisticsController.getShipments);
router.get("/:id", authMiddleware, logisticsController.getShipment);

module.exports = router;
