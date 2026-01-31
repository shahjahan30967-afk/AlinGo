import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db", "wallet.json");

const COMMISSION = 0.025;
const WALLET_LIMIT = 50000;

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getUser(db, userId) {
  let user = db.users.find(u => u.userId === userId);
  if (!user) {
    user = {
      userId,
      balance: 0,
      ledger: [],
      withdrawals: []
    };
    db.users.push(user);
  }
  return user;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, userId, amount, orderId } = req.body;
  if (!action || !userId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const db = readDB();
  const user = getUser(db, userId);

  // ADD ORDER EARNING
  if (action === "order") {
    if (!amount || amount <= 0 || !orderId) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const commission = amount * COMMISSION;
    const net = amount - commission;

    if (user.balance + net > WALLET_LIMIT) {
      return res.status(403).json({ error: "Wallet limit exceeded" });
    }

    user.balance += net;
    user.ledger.push({
      orderId,
      amount,
      commission,
      net,
      time: Date.now()
    });

    writeDB(db);

    return res.json({
      success: true,
      balance: user.balance,
      commission
    });
  }

  // WITHDRAW REQUEST
  if (action === "withdraw") {
    if (user.balance <= 0) {
      return res.status(400).json({ error: "No balance available" });
    }

    user.withdrawals.push({
      amount: user.balance,
      requestedAt: Date.now(),
      status: "pending"
    });

    user.balance = 0;
    writeDB(db);

    return res.json({
      success: true,
      message: "Withdrawal requested"
    });
  }

  // FETCH WALLET
  if (action === "fetch") {
    return res.json({
      balance: user.balance,
      ledger: user.ledger,
      withdrawals: user.withdrawals
    });
  }

  return res.status(400).json({ error: "Unknown action" });
}
