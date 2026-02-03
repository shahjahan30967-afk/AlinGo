import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getWallet,
  updateDriverSavings,
  adminMoveFunds
} from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/", auth, getWallet);
router.post("/driver/savings", auth, updateDriverSavings);
router.post("/admin/transfer", auth, adminMoveFunds);

export default router;
