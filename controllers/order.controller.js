import Order from "../models/Order.js";
import Wallet from "../models/Wallet.js";

export const acceptOrder = async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  order.status = "accepted";
  await order.save();

  const commission = order.amount * 0.025;
  const wallet = await Wallet.findOne({ sellerId: order.sellerId });
  wallet.balance += order.amount - commission;
  await wallet.save();

  res.json({ message: "Order Accepted", commission });
};
