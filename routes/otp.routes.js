const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/verify", async (req, res) => {
  const decoded = await admin.auth().verifyIdToken(req.body.token);

  let user = await User.findOne({ phone: decoded.phone_number });
  if (!user) user = await User.create({ phone: decoded.phone_number });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
