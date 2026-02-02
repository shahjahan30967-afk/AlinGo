const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SEND OTP
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }

  const otp = generateOTP();

  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  // TODO: Replace with real SMS gateway
  console.log("OTP SENT:", otp);

  res.json({
    success: true,
    message: "OTP sent successfully"
  });
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    user.otp !== otp ||
    !user.otpExpiresAt ||
    user.otpExpiresAt < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  const token = generateToken(user);

  res.json({
    success: true,
    token,
    user
  });
};
