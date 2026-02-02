const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  otp: { type: String },
  otpExpiresAt: { type: Date },

  role: {
    type: String,
    enum: ["user", "driver", "admin", "vendor"],
    default: "user"
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
