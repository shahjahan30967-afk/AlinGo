import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, ref:"Wallet", required:true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, required:true },
  ownerType: { type: String, enum:["user","driver"], required:true },

  amount: { type: Number, required:true },
  status: { type: String, enum:["pending","approved","rejected"], default:"pending" },

  payoutMethod: { type: String, enum:["bank","paypal","stripe","wise"], default:"bank" },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    iban: String,
    swift: String,
    bankName: String,
    country: String
  },

  transactionId: { type: String, unique: true },
  fee: { type: Number, default: 0 },
  currency: { type: String, default: "PKR" },

  createdAt: { type: Date, default: Date.now },
  processedAt: Date,
  adminNote: String
});

// Generate unique Transaction ID before save
withdrawSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = 'WTH-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

export default mongoose.model("Withdraw", withdrawSchema);
