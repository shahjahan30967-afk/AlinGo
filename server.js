import express from "express";
import dotenv from "dotenv";
import admin from "./config/firebase-admin.js"; // Firebase Admin
import cors from "cors";

// Import all module routes
import rideRoutes from "./routes/ride.routes.js";
import foodRoutes from "./routes/food.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import logisticsRoutes from "./routes/logistics.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // public folder serving
/* ==============================
   FIREBASE ADMIN INIT
================================ */
const serviceAccount = {
  type: process.env.FB_TYPE,
  project_id: process.env.FB_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_CERT,
  client_x509_cert_url: process.env.FB_CLIENT_CERT_URL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/* ==============================
   OTP VERIFY API
================================ */
app.post("/api/otp/verify", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: "Token missing" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    res.json({
      success: true,
      uid: decoded.uid,
      phone: decoded.phone_number
    });
  } catch (err) {
    console.error("Firebase Auth Error:", err.message);
    res.status(401).json({ success: false, message: "Invalid OTP" });
  }
});

/* ==============================
   MODULE ROUTES (Connected)
================================ */
app.use("/api/rides", rideRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logistics", logisticsRoutes);
app.use("/api/investor", investorRoutes);
/* ==============================
   HOME PAGE
================================ */
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

/* ==============================
   SERVER START
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
