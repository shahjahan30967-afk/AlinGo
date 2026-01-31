import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  sellerId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "prepared", "dispatched"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
