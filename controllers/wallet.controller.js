// ہم براہ راست سروس یا ماڈل سے جڑ رہے ہیں (آپ کے اسٹرکچر کے مطابق)
import Withdraw from "../models/Withdraw.js"; 
import Wallet from "../models/Wallet.js"; 

// 1. User / Driver: Request Withdraw (رقم نکالنے کی درخواست)
export const withdrawRequest = async (req, res) => {
  try {
    const { amount, payoutMethod, bankDetails } = req.body;
    const ownerId = req.user.id; // گلو کوڈ: ٹوکن سے آئی ڈی حاصل کرنا
    const ownerType = req.user.role; // یوزر یا ڈرائیور

    // لاجک: چیک کریں کہ بیلنس کافی ہے یا نہیں
    const wallet = await Wallet.findOne({ userId: ownerId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ success: false, message: "نا کافی بیلنس" });
    }

    // رقم نکالنے کی درخواست بنائیں
    const withdraw = await Withdraw.create({
      ownerId,
      ownerType,
      amount,
      payoutMethod,
      bankDetails,
      status: "pending"
    });

    // گلو کوڈ: عارضی طور پر والٹ سے رقم "Hold" کرنا (اختیاری)
    wallet.balance -= amount;
    await wallet.save();

    res.json({ success: true, message: "درخواست موصول ہو گئی ہے", withdraw });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Admin: Approve / Reject (ایڈمن کا فیصلہ)
export const withdrawProcess = async (req, res) => {
  try {
    // گلو کوڈ: چیک کریں کہ کیا یہ واقعی ایڈمن ہے
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "صرف ایڈمن یہ کارروائی کر سکتا ہے" });
    }

    const { withdrawId, approve, adminNote } = req.body;
    const withdraw = await Withdraw.findById(withdrawId);

    if (!withdraw) return res.status(404).json({ message: "درخواست نہیں ملی" });

    // اگر ریجیکٹ ہو تو رقم واپس والٹ میں بھیجنا
    if (!approve) {
      const wallet = await Wallet.findOne({ userId: withdraw.ownerId });
      if (wallet) {
        wallet.balance += withdraw.amount;
        await wallet.save();
      }
      withdraw.status = "rejected";
    } else {
      withdraw.status = "approved";
    }

    withdraw.adminNote = adminNote;
    await withdraw.save();

    res.json({ success: true, withdraw });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 3. Admin: List All (تمام درخواستوں کی لسٹ)
export const withdrawList = async (req, res) => {
  try {
    // گلو کوڈ: ایڈمن چیک اور ڈیٹا پاپولیشن
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });
    res.json({ success: true, withdraws });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
