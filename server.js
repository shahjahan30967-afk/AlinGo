import express from "express";
import dotenv from "dotenv";
import admin from "./config/firebase-admin.js"; // آپ کی فائل کا درست راستہ
import cors from "cors";

// انوائرمنٹ ویری ایبلز لوڈ کریں
dotenv.config();

const app = express();

// بنیادی مڈل ویئرز (Middlewares)
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // آپ کے public فولڈر کی فائلز دکھانے کے لیے

/* ==============================
   FIREBASE ADMIN INIT
================================ */
const serviceAccount = {
  type: process.env.FB_TYPE,
  project_id: process.env.FB_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"), // ایرر سے بچنے کے لیے ? کا اضافہ
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_CERT,
  client_x509_cert_url: process.env.FB_CLIENT_CERT_URL
};

// فائر بیس کو صرف ایک بار انیشلائز کریں
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/* ==============================
   API ROUTES (آپ کے فولڈرز کو جوڑنے کے لیے)
================================ */

// مثال کے طور پر آپ کے 'routes' فولڈر سے رائڈز کو جوڑنا
// import rideRoutes from "./routes/ride.routes.js";
// app.use("/api/rides", rideRoutes);

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

// ہوم پیج کے لیے (اگر public فولڈر میں index.html ہے)
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
