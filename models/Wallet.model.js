import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  source: String,
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

const walletSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    sparse: true
  },

  ownerType: {
    type: String,
    enum: ["user", "driver", "admin"],
    required: true
  },

  balance: { type: Number, default: 0 },

  // Driver only
  savingsPocket: {
    enabled: { type: Boolean, default: false },
    percentage: { type: Number, default: 0 },
    amount: { type: Number, default: 0 }
  },

  // Admin only
  adminBuckets: {
    income2: { type: Number, default: 0 },
    expense2A: { type: Number, default: 0 },
    expense2B: { type: Number, default: 0 }
  },

  transactions: [transactionSchema]

}, { timestamps: true });

export default mongoose.model("Wallet", walletSchema);
