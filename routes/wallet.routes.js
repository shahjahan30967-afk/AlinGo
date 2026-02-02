const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// OTP Protected routes
router.get("/", authMiddleware, walletController.getWallet);
router.post("/add", authMiddleware, walletController.addFunds);
router.post("/pay", authMiddleware, walletController.pay);

module.exports = router;
