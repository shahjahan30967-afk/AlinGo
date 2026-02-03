import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // فائر بیس UID کے ساتھ لنک
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  investedAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export default mongoose.model("Investor", investorSchema);
