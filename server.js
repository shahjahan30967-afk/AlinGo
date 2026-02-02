import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Route imports
import otpRoutes from "./routes/otp.routes.js";
import rideRoutes from "./routes/ride.routes.js";
import foodRoutes from "./routes/food.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import logisticsRoutes from "./routes/logistics.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// API Routes
app.use("/api/otp", otpRoutes);
app.use("/api/ride", rideRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logistics", logisticsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
