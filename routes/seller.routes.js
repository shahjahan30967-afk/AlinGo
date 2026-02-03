import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  registerSeller,
  updateStoreStatus,
  addProduct,
  getSellerOrders,
  getSellerDashboard
} from "../controllers/seller.controller.js";

const router = express.Router();

/**
 * SELLER ROUTES
 */

// Seller registration
router.post(
  "/register",
  auth,
  authorizeRoles("user"),
  registerSeller
);

// Seller dashboard
router.get(
  "/dashboard",
  auth,
  authorizeRoles("seller", "admin"),
  getSellerDashboard
);

// Add product
router.post(
  "/product",
  auth,
  authorizeRoles("seller"),
  addProduct
);

// Seller orders
router.get(
  "/orders",
  auth,
  authorizeRoles("seller", "admin"),
  getSellerOrders
);

// Admin: enable / disable store
router.patch(
  "/store/status/:sellerId",
  auth,
  authorizeRoles("admin"),
  updateStoreStatus
);

export default router;
