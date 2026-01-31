import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { acceptOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", auth, acceptOrder);

export default router;
