import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import orderRoutes from "./routes/order.routes.js";
import walletRoutes from "./routes/wallet.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", app: "Alingo Backend LIVE" });
});

app.use("/api/auth", authRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallet", walletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("🚀 Backend running on port", PORT)
);

export default app;
