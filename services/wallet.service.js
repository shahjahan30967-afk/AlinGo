import mongoose from "mongoose";
import Wallet from "../models/Wallet.model.js";
import Withdraw from "../models/Withdraw.model.js";

/**
 * 💸 MASTER WALLET SERVICE (Final Connected Version)
 * ------------------------------------------------
 * ✔ 2% Income + 2% Expense Split (Fixed)
 * ✔ Atomic Transaction Protection
 * ✔ Automated Pending Balance Locking
 * ✔ Comprehensive Withdraw Lifecycle
 */

/* =================================================
   1. UTILITY: والٹ حاصل کریں یا خود بخود بنائیں
================================================= */
export async function getOrCreateWallet({ ownerId, ownerType, currency = "PKR" }, session) {
  // لاجک: ownerType کو ماڈل کے ناموں سے میچ کرنے کے لیے پہلا حرف بڑا (Capitalize) ہونا چاہیے
  const type = ownerType.charAt(0).toUpperCase() + ownerType.slice(1).toLowerCase();
  
  let wallet = await Wallet.findOne({ ownerId, ownerType: type }).session(session);
  if (!wallet) {
    const newWallets = await Wallet.create(
      [{ ownerId, ownerType: type, currency, balance: 0, pendingBalance: 0 }],
      { session }
    );
    wallet = newWallets[0];
  }
  return wallet;
}

/* =================================================
   2. PAYMENT DISTRIBUTION (2% + 2% Separate Buckets)
================================================= */
export async function distributePayment({ amount, driverId, currency = "PKR" }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // ایڈمن والٹ (مستقل گلوبل آئی ڈی برائے کمیشن)
    const ADMIN_ID = new mongoose.Types.ObjectId("000000000000000000000001");
    const adminWallet = await getOrCreateWallet({ ownerId: ADMIN_ID, ownerType: "Admin", currency }, session);
    const driverWallet = await getOrCreateWallet({ ownerId: driverId, ownerType: "Driver", currency }, session);

    // 💰 فارمولا: 2% انکم اور 2% ایکسپینس الگ کریں
    const incomeReserve = amount * 0.02;   // 2% خالص منافع
    const expenseReserve = amount * 0.02;  // 2% آپریشنل اخراجات
    const adminCommission = incomeReserve + expenseReserve; // کل 4%

    // ڈرائیور کا حصہ
    let driverNet = amount - adminCommission;
    let savingsAmount = 0;

    // ڈرائیور سیونگ لاجک (اگر آن ہو)
    if (driverWallet.driverSavings?.enabled && driverWallet.driverSavings.percentage > 0) {
      savingsAmount = (driverNet * driverWallet.driverSavings.percentage) / 100;
      driverNet -= savingsAmount;
    }

    // ✅ ایڈمن بکٹس میں الگ الگ جمع کریں (Connected Glue)
    adminWallet.balance += adminCommission;
    adminWallet.adminBuckets.incomeReserve += incomeReserve;      // بکٹ 1
    adminWallet.adminBuckets.expenseReserveA += expenseReserve;   // بکٹ 2

    // ✅ ڈرائیور والٹ اپ ڈیٹ
    driverWallet.balance += driverNet;
    driverWallet.driverSavings.savedAmount += savingsAmount;

    await adminWallet.save({ session });
    await driverWallet.save({ session });

    await session.commitTransaction();
    return { success: true, split: { incomeReserve, expenseReserve, driverNet, savingsAmount } };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

/* =================================================
   3. REQUEST WITHDRAW (Lock Balance)
================================================= */
export async function requestWithdraw({ ownerId, ownerType, amount, payoutMethod, bankDetails, currency = "PKR" }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await getOrCreateWallet({ ownerId, ownerType, currency }, session);

    // سیکیورٹی چیک: دستیاب بیلنس (Total Balance - Locked Pending)
    if (wallet.pendingBalance + amount > wallet.balance) {
      throw new Error("ناکافی دستیاب بیلنس (Insufficient available balance)");
    }

    // رقم لاک کریں (Pending Balance میں اضافہ)
    wallet.pendingBalance += amount;
    await wallet.save({ session });

    // ود ڈرا ریکارڈ بنائیں
    const withdraw = await Withdraw.create(
      [{
        ownerId,
        ownerType: ownerType.charAt(0).toUpperCase() + ownerType.slice(1).toLowerCase(),
        walletId: wallet._id,
        amount,
        payoutMethod,
        bankDetails,
        currency,
        status: "pending"
      }],
      { session }
    );

    await session.commitTransaction();
    return withdraw[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

/* =================================================
   4. ADMIN PROCESS (Approve / Reject)
================================================= */
export async function processWithdraw({ withdrawId, action, adminId, note = "" }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const withdraw = await Withdraw.findById(withdrawId).session(session);
    if (!withdraw) throw new Error("درخواست نہیں ملی");
    if (withdraw.status !== "pending") throw new Error("درخواست پہلے ہی پروسیس ہو چکی ہے");

    const wallet = await Wallet.findById(withdraw.walletId).session(session);
    if (!wallet) throw new Error("والٹ نہیں ملا");

    if (action === "approve" || action === "paid") {
      // رقم مستقل کاٹیں
      wallet.pendingBalance -= withdraw.amount;
      wallet.balance -= withdraw.amount;
      withdraw.status = action === "paid" ? "paid" : "approved";
      withdraw.processedAt = new Date();
    } 
    else if (action === "reject") {
      // صرف لاک کھولیں، پیسے بیلنس میں رہیں گے
      wallet.pendingBalance -= withdraw.amount;
      withdraw.status = "rejected";
    }

    withdraw.adminAction = { adminId, note, actionAt: new Date() };

    await wallet.save({ session });
    await withdraw.save({ session });

    await session.commitTransaction();
    return { success: true, finalStatus: withdraw.status };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
