import admin from "../config/firebase-admin.js";
import User from "../models/User.model.js";
import Wallet from "../models/Wallet.model.js";
import jwt from "jsonwebtoken";

/**
 * @DESC Firebase ID Token verify + Login/Register
 * @ROUTE POST /api/auth/firebase
 */
export const firebaseAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: "Firebase ID Token is required"
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "JWT_SECRET not configured"
    });
  }

  try {
    // 1️⃣ Verify Firebase Token
    const decoded = await admin.auth().verifyIdToken(idToken);

    const uid = decoded.uid;
    const phone = decoded.phone_number || null;
    const email = decoded.email || null;
    const name = decoded.name || "AlinGo User";

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: "Firebase token must contain phone or email"
      });
    }

    // 2️⃣ Find or Create User
    let user = await User.findOne({
      $or: [{ phone }, { email }]
    });

    if (!user) {
      user = await User.create({
        name,
        phone,
        email,
        firebaseUid: uid,
        role: "user"
      });

      console.log("✅ New user created:", user._id);
    }

    // 3️⃣ Ensure Wallet Exists
    let wallet = await Wallet.findOne({ ownerId: user._id });

    if (!wallet) {
      wallet = await Wallet.create({
        ownerId: user._id,
        ownerType: "User",
        balance: 0,
        currency: "PKR",
        transactions: []
      });

      console.log("✅ Wallet created for user:", user._id);
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Response
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        email: user.email
      }
    });

  } catch (err) {
    console.error("❌ Firebase Auth Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: err.message
    });
  }
};

/**
 * @DESC Get logged-in user profile
 * @ROUTE GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
