const Wallet = require("../models/Wallet");
const User = require("../models/User");

// GET WALLET BALANCE
exports.getWallet = async (req, res) => {
  let wallet = await Wallet.findOne({ user: req.user.id });
  if (!wallet) {
    wallet = await Wallet.create({ user: req.user.id });
  }
  res.json({ success: true, wallet });
};

// ADD FUNDS (Top-up)
exports.addFunds = async (req, res) => {
  const { amount, description } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  let wallet = await Wallet.findOne({ user: req.user.id });
  if (!wallet) {
    wallet = await Wallet.create({ user: req.user.id });
  }

  wallet.balance += amount;
  wallet.transactions.push({ type: "credit", amount, description });
  await wallet.save();

  res.json({ success: true, wallet });
};

// PAY FOR SERVICE (Deduct)
exports.pay = async (req, res) => {
  const { amount, description } = req.body;

  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  let wallet = await Wallet.findOne({ user: req.user.id });
  if (!wallet || wallet.balance < amount)
    return res.status(400).json({ message: "Insufficient balance" });

  wallet.balance -= amount;
  wallet.transactions.push({ type: "debit", amount, description });
  await wallet.save();

  res.json({ success: true, wallet });
};
