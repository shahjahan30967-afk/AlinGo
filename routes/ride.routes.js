const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP protected routes
router.post("/create", authMiddleware, rideController.createRide);
router.get("/my-rides", authMiddleware, rideController.getRides);
router.get("/:id", authMiddleware, rideController.getRide);

module.exports = router;
