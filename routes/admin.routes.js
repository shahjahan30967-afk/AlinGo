const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminOnly = require("../middlewares/admin.middleware"); // only admin access

// OTP Protected + Admin Only
router.use(authMiddleware, adminOnly);

router.get("/users", adminController.getAllUsers);
router.get("/drivers", adminController.getAllDrivers);
router.get("/rides", adminController.getAllRides);
router.get("/shipments", adminController.getAllShipments);
router.get("/food-orders", adminController.getAllFoodOrders);
router.get("/hotel-bookings", adminController.getAllHotelBookings);
router.get("/ticket-bookings", adminController.getAllTicketBookings);
router.get("/wallets", adminController.getWalletReports);
router.post("/user/status/:id", adminController.updateUserStatus);

module.exports = router;
