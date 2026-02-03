import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, sparse: true }, // انویسٹرز کے لیے ضروری ہو سکتا ہے
  role: { 
    type: String, 
    enum: ["user", "driver", "admin", "investor"], 
    default: "user" 
  },
  
  // 🔔 FCM PUSH TOKEN (گلو کوڈ کے لیے اہم)
  fcmToken: { type: String, default: null },
  
  isOnline: { type: Boolean, default: false }
},{ timestamps: true });

export default mongoose.model("User", userSchema);
