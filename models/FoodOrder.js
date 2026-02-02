const mongoose = require("mongoose");

const FoodOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalPrice: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["placed", "preparing", "on-the-way", "delivered", "cancelled"],
    default: "placed"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FoodOrder", FoodOrderSchema);
