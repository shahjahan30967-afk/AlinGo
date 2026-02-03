import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  storeName: String,
  isActive: {
    type: Boolean,
    default: false
  },
  totalSales: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
