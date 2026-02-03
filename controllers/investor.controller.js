import Investor from "../models/Investor.js";
import Wallet from "../models/Wallet.js";

// 1. نیا انویسٹر بنانا اور والٹ چیک کرنا
export const investorCreate = async (req, res) => {
  try {
    const { name, email, phone, userId } = req.body;
    
    // انویسٹر ریکارڈ بنائیں
    const investor = await Investor.create({ name, email, phone, userId });

    // والٹ چیک کریں یا بنائیں
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0, transactions: [] });
    }

    res.json({ success: true, investor, wallet });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 2. سرمایہ کاری کرنا (Invest Amount)
export const investorInvest = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const invAmount = parseFloat(amount);

    const investor = await Investor.findOne({ userId });
    if (!investor) throw new Error("Investor record not found");

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new Error("Wallet not found");

    // لاجک: والٹ میں پیسے جمع کرنا اور انویسٹمنٹ ریکارڈ اپ ڈیٹ کرنا
    wallet.balance += invAmount;
    wallet.transactions.push({
      type: "credit",
      amount: invAmount,
      source: "Manual Investment Entry",
      status: "completed"
    });

    investor.investedAmount += invAmount;

    await wallet.save();
    await investor.save();

    res.json({ success: true, balance: wallet.balance, totalInvested: investor.investedAmount });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 3. لسٹ دکھانا
export const investorList = async (req, res) => {
  try {
    const investors = await Investor.find().sort({ createdAt: -1 });
    res.json({ success: true, investors });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
