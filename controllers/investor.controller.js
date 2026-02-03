import Investor from "../models/Investor.js";
import Wallet from "../models/Wallet.js";
import { sendPushNotification } from "../services/notification.service.js";

/**
 * 1. Create Investor + Wallet
 */
export const investorCreate = async (req, res) => {
  try {
    const { name, email, phone, userId } = req.body;

    // Investor Record
    const investor = await Investor.create({ name, email, phone, userId });

    // Wallet Check or Create
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0, transactions: [] });
    }

    res.json({ success: true, investor, wallet });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * 2. Investor Invest Amount + Push Notification to Admin
 */
export const investorInvest = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const invAmount = parseFloat(amount);

    const investor = await Investor.findOne({ userId });
    if (!investor) throw new Error("Investor record not found");

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new Error("Wallet not found");

    // Wallet Update
    wallet.balance += invAmount;
    wallet.transactions.push({
      type: "credit",
      amount: invAmount,
      source: "Manual Investment Entry",
      status: "completed"
    });

    // Investor Record Update
    investor.investedAmount += invAmount;

    await wallet.save();
    await investor.save();

    // ===============================
    // Push Notification to Admin
    // ===============================
    try {
      const adminToken = process.env.ADMIN_FCM_TOKEN || "ADMIN_DEVICE_FCM_TOKEN";
      await sendPushNotification(
        adminToken,
        "New Investment 💰",
        `${investor.name || "A user"} نے Rs ${invAmount} انویسٹ کیے ہیں۔`
      );
    } catch (notifErr) {
      console.error("Push Notification Error:", notifErr.message);
    }

    res.json({ success: true, balance: wallet.balance, totalInvested: investor.investedAmount });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * 3. List Investors
 */
export const investorList = async (req, res) => {
  try {
    const investors = await Investor.find().sort({ createdAt: -1 });
    res.json({ success: true, investors });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
