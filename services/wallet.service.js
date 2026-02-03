import mongoose from "mongoose";
import Wallet from "../models/Wallet.model.js";

/**
 * Ensure wallet exists (User / Driver / Admin)
 */
export async function ensureWallet({ ownerId = null, ownerType }, session) {
  return Wallet.findOneAndUpdate(
    { ownerId, ownerType },
    {
      $setOnInsert: {
        ownerId,
        ownerType,
        balance: 0
      }
    },
    { upsert: true, new: true, session }
  );
}

/**
 * Main payment distribution logic
 */
export async function distributePayment({ amount, driverId, source = "Ride" }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1️⃣ Ensure wallets
    const adminWallet = await ensureWallet(
      { ownerType: "admin" },
      session
    );

    const driverWallet = await ensureWallet(
      { ownerId: driverId, ownerType: "driver" },
      session
    );

    // 2️⃣ Commission calculation
    const adminIncome = amount * 0.02;
    const expenseA = amount * 0.02;
    const expenseB = amount * 0.02;

    const distributable = amount - (adminIncome + expenseA + expenseB);

    // 3️⃣ Admin wallet update
    adminWallet.adminBuckets.income2 += adminIncome;
    adminWallet.adminBuckets.expense2A += expenseA;
    adminWallet.adminBuckets.expense2B += expenseB;
    adminWallet.balance += distributable;

    adminWallet.transactions.push({
      type: "credit",
      amount,
      source,
      meta: { adminIncome, expenseA, expenseB }
    });

    // 4️⃣ Driver wallet update
    let savingsCut = 0;

    if (driverWallet.savingsPocket.enabled) {
      savingsCut =
        distributable *
        (driverWallet.savingsPocket.percentage / 100);

      driverWallet.savingsPocket.amount += savingsCut;
    }

    driverWallet.balance += distributable - savingsCut;

    driverWallet.transactions.push({
      type: "credit",
      amount: distributable,
      source,
      meta: { savingsCut }
    });

    // 5️⃣ Save atomically
    await adminWallet.save({ session });
    await driverWallet.save({ session });

    await session.commitTransaction();
    return { success: true };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
