const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */
  name: {
    type: String,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  email: {
    type: String,
    lowercase: true,
    trim: true
  },

  profileImage: {
    type: String // URL
  },

  /* ================= OTP / AUTH ================= */
  otp: {
    type: String
  },

  otpExpiresAt: {
    type: Date
  },

  firebaseUid: {
    type: String // if Firebase OTP used
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  /* ================= ROLE & ACCESS ================= */
  role: {
    type: String,
    enum: ["user", "driver", "vendor", "admin"],
    default: "user"
  },

  status: {
    type: String,
    enum: ["active", "blocked", "pending"],
    default: "active"
  },

  /* ================= WALLET ================= */
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: "PKR"
    }
  },

  /* ================= DRIVER PROFILE ================= */
  driver: {
    isDriver: {
      type: Boolean,
      default: false
    },
    vehicleType: {
      type: String,
      enum: ["bike", "car", "van", "truck"]
    },
    vehicleNumber: {
      type: String
    },
    licenseNumber: {
      type: String
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 5
    }
  },

  /* ================= VENDOR PROFILE ================= */
  vendor: {
    isVendor: {
      type: Boolean,
      default: false
    },
    businessName: {
      type: String
    },
    businessType: {
      type: String,
      enum: ["food", "hotel", "shop"]
    },
    address: {
      type: String
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },

  /* ================= LOCATION ================= */
  location: {
    lat: Number,
    lng: Number,
    address: String
  },

  /* ================= META ================= */
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }

});

/* ================= AUTO UPDATE ================= */
UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", UserSchema);
