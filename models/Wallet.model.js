import mongoose from "mongoose";

/**
 * 💼 Wallet Schema (The Core Financial Glue)
 */

const walletSchema = new mongoose.Schema(
  {
    // کس کا والٹ ہے (Can be Driver, User, or Investor)
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'ownerType', // ڈائنامک ریفرنس
      required: true,
      index: true
    },

    ownerType: {
      type: String,
      enum: ["User", "Driver", "Investor", "Admin"], // Capitalized to match Model names
      required: true,
      index: true
    },

    balance: {
      type: Number,
      default: 0,
      min: [0, "بیلنس صفر سے کم نہیں ہو سکتا"]
    },

    pendingBalance: {
      type: Number,
      default: 0,
      min: 0
    },

    currency: {
      type: String,
      default: "PKR"
    },

    /* === ADMIN BUCKETS (FOR REVENUE SHARING) === */
    adminBuckets: {
      incomeReserve: { type: Number, default: 0 },   // Net Profit
      expenseReserveA: { type: Number, default: 0 }, // Operational Cost
      expenseReserveB: { type: Number, default: 0 }  // Emergency Fund
    },

    /* === DRIVER SAVINGS LOGIC === */
    driverSavings: {
      enabled: { type: Boolean, default: false },
      percentage: { type: Number, default: 0, min: 0, max: 100 },
      savedAmount: { type: Number, default: 0 }
    },

    /* === TRANSACTION LOG GLUE === */
    // یہ حصہ والٹ کو ٹرانزیکشن لسٹ سے جوڑتا ہے
    recentTransactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction' 
    }],

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* === INDEXES === */
walletSchema.index({ ownerId: 1, ownerType: 1 }, { unique: true });

/* === VIRTUALS (Calculated on the fly) === */
// دستیاب رقم جو نکلوائی جا سکتی ہے
walletSchema.virtual("availableBalance").get(function () {
  return this.balance - this.pendingBalance;
});

/* === STATIC METHODS (The Glue Logic) === */

// رقم جمع کرنے کا محفوظ طریقہ (مع ڈرائیور سیونگ لاجک)
walletSchema.methods.addMoney = async function (amount, isRideEarning = false) {
  if (this.status === "blocked") throw new Error("والٹ بلاک ہے");

  let actualDeposit = amount;
  
  // اگر ڈرائیور ہے اور سیونگ آن ہے
  if (isRideEarning && this.ownerType === "Driver" && this.driverSavings.enabled) {
    const savings = (amount * this.driverSavings.percentage) / 100;
    this.driverSavings.savedAmount += savings;
    actualDeposit = amount - savings;
  }

  this.balance += actualDeposit;
  return this.save();
};

// رقم نکالنے کا محفوظ طریقہ
walletSchema.methods.deductMoney = async function (amount) {
  if (this.availableBalance < amount) {
    throw new Error("ناکافی بیلنس (Insufficient Balance)");
  }
  this.balance -= amount;
  return this.save();
};

/* === PRE-SAVE SAFETY === */
walletSchema.pre("save", function (next) {
  if (this.pendingBalance > this.balance) {
    return next(new Error("پینڈنگ بیلنس کل بیلنس سے زیادہ نہیں ہو سکتا"));
  }
  next();
});

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
