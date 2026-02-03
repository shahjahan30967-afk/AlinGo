import Wallet from "../models/Wallet.model.js";
import { ensureWallet } from "../services/wallet.service.js";

export const getWallet = async (req, res) => {
  const wallet = await ensureWallet({
    ownerId: req.user.id,
    ownerType: req.user.role
  });

  res.json({ success: true, wallet });
};

export const updateDriverSavings = async (req, res) => {
  const { enabled, percentage } = req.body;

  const wallet = await Wallet.findOne({
    ownerId: req.user.id,
    ownerType: "driver"
  });

  wallet.savingsPocket.enabled = enabled;
  wallet.savingsPocket.percentage = percentage || 0;

  await wallet.save();
  res.json({ success: true });
};

export const adminMoveFunds = async (req, res) => {
  const { from, to, amount } = req.body;

  const wallet = await Wallet.findOne({ ownerType: "admin" });

  if (wallet.adminBuckets[from] < amount)
    return res.status(400).json({ message: "Insufficient funds" });

  wallet.adminBuckets[from] -= amount;
  wallet.adminBuckets[to] += amount;

  wallet.transactions.push({
    type: "debit",
    amount,
    source: "Admin Transfer",
    meta: { from, to }
  });

  await wallet.save();
  res.json({ success: true });
};
