import {
  getOrCreateWallet,
  distributePayment,
  requestWithdraw,
  processWithdraw
} from "../services/wallet.service.js";

/**
 * =========================================
 * 👤 USER / DRIVER / INVESTOR WALLET
 * =========================================
 */

/**
 * GET /api/wallet/me
 * لاگ ان یوزر کا والٹ ڈیٹا حاصل کریں
 */
export const getMyWallet = async (req, res) => {
  try {
    // سروس سے والٹ حاصل کریں یا بنوائیں
    const wallet = await getOrCreateWallet({
      ownerId: req.user.id,
      ownerType: req.user.role 
    });

    res.status(200).json({
      success: true,
      data: wallet
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "والٹ ڈیٹا حاصل کرنے میں ناکامی: " + err.message
    });
  }
};

/**
 * =========================================
 * 💸 PAYMENT DISTRIBUTION
 * (Ride / Order / Ticket completion)
 * رائیڈ ختم ہونے پر 2%+2% کی تقسیم کا عمل
 * =========================================
 */
export const distributePaymentController = async (req, res) => {
  try {
    const { amount, driverId } = req.body;

    // سروس کو کال کریں جو بکٹس میں پیسے بانٹتی ہے
    const result = await distributePayment({
      amount,
      driverId
    });

    res.json({
      success: true,
      message: "ادائیگی کامیابی سے تقسیم ہو گئی",
      split: result.split // 2%+2% کی تفصیلات
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "ادائیگی کی تقسیم میں غلطی: " + err.message
    });
  }
};

/**
 * =========================================
 * 🏦 REQUEST WITHDRAW
 * رقم نکلوانے کی درخواست (بیلنس لاک لاجک)
 * =========================================
 */
export const requestWithdrawController = async (req, res) => {
  try {
    const { amount, payoutMethod, bankDetails } = req.body;

    const withdraw = await requestWithdraw({
      ownerId: req.user.id,
      ownerType: req.user.role,
      amount,
      payoutMethod,
      bankDetails
    });

    res.status(201).json({
      success: true,
      message: "ود ڈرا کی درخواست موصول ہو گئی اور رقم لاک کر دی گئی ہے",
      withdraw
    });
  } catch (err) {
    // 400 Bad Request اگر بیلنس کم ہو
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * =========================================
 * 🛡 ADMIN: APPROVE / REJECT / PAID
 * ایڈمن کی طرف سے درخواست پر کارروائی
 * =========================================
 */
export const adminProcessWithdrawController = async (req, res) => {
  try {
    const { withdrawId, action, note } = req.body;

    const result = await processWithdraw({
      withdrawId,
      action, // approve | reject | paid
      adminId: req.user.id,
      note
    });

    res.json({
      success: true,
      message: `درخواست کامیابی سے ${action} کر دی گئی`,
      status: result.finalStatus
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
