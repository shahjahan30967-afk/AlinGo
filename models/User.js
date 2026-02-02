const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: String,
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", UserSchema);
