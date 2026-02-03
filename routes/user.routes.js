// routes/user.routes.js
import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { updateFcmToken } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * 🔔 Update / Save FCM Token
 * (User / Driver / Investor / Admin)
 */
router.post("/fcm-token", auth, updateFcmToken);

export default router;
