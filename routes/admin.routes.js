import express from "express";
import adminController from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";

// Wallet & Investors Controllers
import { withdrawList, withdrawProcess } from "../controllers/wallet.controller.js";
import { investorList, investorInvest } from "../controllers/investor.controller.js";

const router = express.Router();

// ========================================
// OTP Protected + Admin Only Middleware
// ========================================
router.use(authMiddleware, adminOnly);

// ========================================
// Core Admin Routes
// ========================================
router.get("/users", adminController.getAllUsers);
router.get("/drivers", adminController.getAllDrivers);
router.get("/rides", adminController.getAllRides);
router.get("/shipments", adminController.getAllShipments);
router.get("/food-orders", adminController.getAllFoodOrders);
router.get("/hotel-bookings", adminController.getAllHotelBookings);
router.get("/ticket-bookings", adminController.getAllTicketBookings);
router.get("/wallets", adminController.getWalletReports);

// Update user status
router.post("/user/status/:id", adminController.updateUserStatus);

// ========================================
// Wallet Withdraw Approval Routes
// ========================================
router.get("/withdraws", withdrawList);            // List all withdraw requests
router.post("/withdraws/process", withdrawProcess); // Approve/Reject withdraw

// ========================================
// Investors Management Routes
// ========================================
router.get("/investors", investorList);            // List all investors
router.post("/investors/invest", investorInvest);  // Add investment to investor wallet

export default router;
