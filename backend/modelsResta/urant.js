const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  isOpen: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
