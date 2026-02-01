const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: String, required: true }, // یا Restaurant ID
  items: [{
    foodName: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  
  // آرڈر کی لائیو صورتحال
  status: { 
    type: String, 
    enum: ['Placed', 'Preparing', 'OutForDelivery', 'Delivered', 'Cancelled'], 
    default: 'Placed' 
  },
  
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  deliveryAddress: {
    lat: Number,
    lng: Number,
    text: String
  },
  orderTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
