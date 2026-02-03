import mongoose from "mongoose";

/**
 * 🔐 Vercel + Serverless Safe MongoDB Connection
 * 
 * مسئلہ:
 * Serverless functions بار بار execute ہوتی ہیں،
 * اگر ہر بار نیا connection بنا تو MongoDB connection limit ختم ہو جائے گی۔
 * 
 * حل:
 * Global cached connection
 */

mongoose.set("strictQuery", true);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables");
  }

  // اگر پہلے سے کنکشن موجود ہے
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    };

    console.log("📡 Connecting to MongoDB Atlas...");

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, options)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("❌ MongoDB connection failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
