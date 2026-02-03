import express from "express";
import auth from "../middlewares/auth.middleware.js"; // یقینی بنائیں کہ سپیلنگ ٹھیک ہے
import { investorCreate, investorList, investorInvest } from "../controllers/investor.controller.js";

const router = express.Router();

router.post("/create", auth, investorCreate);
router.get("/list", auth, investorList);
router.post("/invest", auth, investorInvest);

export default router;
