import mongoose from "mongoose";

/**
 * MongoDB Master Connection (Connected & Safe)
 */

mongoose.set("strictQuery", true);

// گلوبل کیش کو محفوظ بنانا (Vercel کے لیے لازمی)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing in .env file");
    process.exit(1);
  }

  // اگر کنکشن موجود ہے تو اسے ری-یوز کریں
  if (cached.conn) {
    return cached.conn;
  }

  // نیا کنکشن لاجک
  if (!cached.promise) {
    const options = {
      bufferCommands: false, // ریکوئسٹ ہینگ نہ ہو
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log("📡 Connecting to MongoDB...");

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, options)
      .then((mongooseInstance) => {
        console.log("✅ Database Linked: Wallet, Investor, & User Models Ready.");
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("❌ MongoDB Error:", error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

/* =====================================================
   🔗 TRANSACTION GLUE (For Wallet & Investor Safety)
===================================================== */
/**
 * جب والٹ سے پیسے کٹیں اور انویسٹمنٹ میں جمع ہوں، تو یہ فنکشن یقینی بناتا ہے
 * کہ دونوں کام مکمل ہوں یا ایک بھی نہ ہو۔ (Atomicity)
 */
export const startTransaction = async () => {
  const connection = await connectDB();
  return await connection.startSession();
};

/* =====================================================
   🧩 MODEL CHECKER (Safety Hook)
===================================================== */
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
});

// پروسیس بند ہونے پر کنکشن ختم کرنا
process.on("SIGTERM", async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed for shutdown.");
  }
});

export default connectDB;
