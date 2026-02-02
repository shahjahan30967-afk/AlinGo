const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected routes
router.get("/items", authMiddleware, foodController.getFoodItems);
router.post("/order", authMiddleware, foodController.placeOrder);
router.get("/my-orders", authMiddleware, foodController.getOrders);

module.exports = router;
