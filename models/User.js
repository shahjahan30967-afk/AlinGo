const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  role: { 
    type: String, 
    enum: ['customer', 'rider', 'admin'], 
    default: 'customer' 
  },
  address: {
    lat: Number,
    lng: Number,
    addressText: String
  },
  profilePic: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
