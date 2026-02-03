import mongoose from "mongoose";
import Wallet from "../models/Wallet.model.js";
import Withdraw from "../models/Withdraw.model.js";

/**
 * Request Withdraw
 * Includes Pending Balance Check + Atomic Transactions
 */
export async function requestWithdraw({ ownerId, ownerType, amount, payoutMethod, bankDetails }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await Wallet.findOne({ ownerId, ownerType }).session(session);
    if(!wallet) throw new Error("Wallet not found");

    // Pending Balance Check
    const pendingWithdraws = await Withdraw.find({ ownerId, status: "pending" }).session(session);
    const totalPending = pendingWithdraws.reduce((sum, w) => sum + w.amount, 0);

    if(amount + totalPending > wallet.balance){
      throw new Error("Insufficient balance (including pending requests)");
    }

    // Deduct balance immediately
    wallet.balance -= amount;
    wallet.transactions.push({
      type: "debit",
      amount,
      source: "Withdraw Request",
      meta: { payoutMethod }
    });

    // Create Withdraw Request
    const withdraw = await Withdraw.create([{
      walletId: wallet._id,
      ownerId,
      ownerType,
      amount,
      payoutMethod,
      bankDetails
    }], { session });

    await wallet.save({ session });
    await session.commitTransaction();
    return withdraw[0];

  } catch(err){
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

/**
 * Admin Approve / Reject Withdraw
 */
export async function processWithdraw({ withdrawId, approve, adminNote }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const withdraw = await Withdraw.findById(withdrawId).session(session);
    if(!withdraw) throw new Error("Withdraw request not found");
    if(withdraw.status !== "pending") throw new Error("Already processed");

    withdraw.status = approve ? "approved" : "rejected";
    withdraw.processedAt = new Date();
    withdraw.adminNote = adminNote || "";

    // If rejected, refund wallet
    if(!approve){
      const wallet = await Wallet.findById(withdraw.walletId).session(session);
      wallet.balance += withdraw.amount;
      wallet.transactions.push({
        type:"credit",
        amount: withdraw.amount,
        source:"Withdraw Rejected",
      });
      await wallet.save({ session });
    }

    await withdraw.save({ session });
    await session.commitTransaction();
    return withdraw;

  } catch(err){
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

/**
 * List All Withdraws
 */
export async function listWithdraws() {
  return await Withdraw.find().sort({ createdAt: -1 });
}
