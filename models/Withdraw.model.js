import mongoose from "mongoose";

/**
 * 💸 Withdraw Schema (The Payout Bridge)
 * ------------------------------------------------
 * یہ فائل آپ کے والٹ اور بینک ٹرانسفر کے درمیان رابطہ پیدا کرتی ہے۔
 */

const withdrawSchema = new mongoose.Schema(
  {
    // کس نے رقم نکلوائی (User/Driver/Investor)
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'ownerType',
      required: true,
      index: true
    },

    ownerType: {
      type: String,
      enum: ["User", "Driver", "Investor", "Admin"],
      required: true,
      index: true
    },

    // Wallet Reference (Central Glue)
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true
    },

    /* === AMOUNT & FEES === */
    amount: {
      type: Number,
      required: true,
      min: [1, "رقم کم از کم 1 ہونی چاہیے"]
    },

    fee: {
      type: Number,
      default: 0
    },

    netAmount: {
      type: Number, // amount - fee
      required: true
    },

    currency: {
      type: String,
      default: "PKR"
    },

    /* === PAYOUT METHOD === */
    payoutMethod: {
      type: String,
      enum: ["bank", "mobile_wallet", "international"],
      required: true
    },

    bankDetails: {
      bankName: String,
      accountTitle: String,
      accountNumber: String,
      iban: String,
      swiftCode: String,
      country: String
    },

    /* === STATUS FLOW === */
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
      index: true
    },

    /* === TRANSACTION TRACKING === */
    transactionId: {
      type: String,
      unique: true,
      index: true
    },

    processedAt: Date,

    /* === ADMIN AUDIT TRAIL === */
    adminAction: {
      adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      note: String,
      actionAt: Date
    }
  },
  {
    timestamps: true
  }
);

/* ==========================
   AUTO TRANSACTION ID LOGIC
========================== */
withdrawSchema.pre("validate", function (next) {
  // netAmount خود بخود سیٹ کریں
  if (this.amount) {
    this.netAmount = this.amount - this.fee;
  }
  
  if (!this.transactionId) {
    this.transactionId =
      "WTH-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).substring(2, 7).toUpperCase();
  }
  next();
});

/* ==========================
   INDEXES for Performance
========================== */
withdrawSchema.index({ ownerId: 1, status: 1 });
withdrawSchema.index({ createdAt: -1 });

/* ==========================
   GLUE HELPERS (Static Methods)
========================== */
// یہ میتھڈ چیک کرتا ہے کہ کیا یوزر کے پاس رقم نکالنے کی گنجائش ہے
withdrawSchema.statics.canRequest = async function (walletId, requestAmount) {
  const Wallet = mongoose.model("Wallet");
  const wallet = await Wallet.findById(walletId);
  if (!wallet) throw new Error("والٹ نہیں ملا");
  
  return wallet.availableBalance >= requestAmount;
};

const Withdraw = mongoose.model("Withdraw", withdrawSchema);

export default Withdraw;
