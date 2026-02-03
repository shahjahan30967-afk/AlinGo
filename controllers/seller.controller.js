import Seller from "../models/Seller.model.js";
import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import User from "../models/User.model.js";

/**
 * Register Seller
 */
export const registerSeller = async (req, res) => {
  const exists = await Seller.findOne({ owner: req.user.id });
  if (exists) {
    return res.status(400).json({ message: "آپ پہلے سے سیلر ہیں" });
  }

  const seller = await Seller.create({
    owner: req.user.id,
    storeName: req.body.storeName
  });

  await User.findByIdAndUpdate(req.user.id, { role: "seller" });

  res.json({ success: true, seller });
};

/**
 * Dashboard
 */
export const getSellerDashboard = async (req, res) => {
  const seller = await Seller.findOne({ owner: req.user.id });
  if (!seller) return res.status(404).json({ message: "Seller not found" });

  const products = await Product.countDocuments({ seller: seller._id });
  const orders = await Order.countDocuments({ seller: seller._id });

  res.json({
    success: true,
    data: {
      storeStatus: seller.isActive,
      products,
      orders,
      totalSales: seller.totalSales
    }
  });
};

/**
 * Add Product
 */
export const addProduct = async (req, res) => {
  const seller = await Seller.findOne({ owner: req.user.id });

  if (!seller || !seller.isActive) {
    return res.status(403).json({ message: "اسٹور ایکٹیو نہیں" });
  }

  const product = await Product.create({
    seller: seller._id,
    ...req.body
  });

  res.json({ success: true, product });
};

/**
 * Seller Orders
 */
export const getSellerOrders = async (req, res) => {
  const seller = await Seller.findOne({ owner: req.user.id });
  const orders = await Order.find({ seller: seller._id });
  res.json({ success: true, orders });
};

/**
 * Admin: Activate / Deactivate Store
 */
export const updateStoreStatus = async (req, res) => {
  const seller = await Seller.findByIdAndUpdate(
    req.params.sellerId,
    { isActive: req.body.isActive },
    { new: true }
  );
  res.json({ success: true, seller });
};
