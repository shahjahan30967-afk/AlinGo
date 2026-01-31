import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db", "orders.json");

const FLOW = ["new", "accepted", "preparing", "dispatched", "delivered"];

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, orderId, sellerId, amount } = req.body;
  const db = readDB();

  // 🆕 CREATE ORDER (customer side)
  if (action === "create") {
    if (!sellerId || !amount) {
      return res.status(400).json({ error: "Invalid order" });
    }

    const id = "ORD-" + Date.now();

    db.orders.push({
      orderId: id,
      sellerId,
      amount,
      status: "new",
      history: [{ status: "new", time: Date.now() }]
    });

    writeDB(db);
    return res.json({ success: true, orderId: id });
  }

  const order = db.orders.find(o => o.orderId === orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  // 🔄 UPDATE STATUS
  if (action === "update") {
    const { status } = req.body;

    const currentIndex = FLOW.indexOf(order.status);
    const nextIndex = FLOW.indexOf(status);

    if (nextIndex !== currentIndex + 1) {
      return res.status(403).json({ error: "Invalid status flow" });
    }

    order.status = status;
    order.history.push({ status, time: Date.now() });

    writeDB(db);

    // 💰 Delivered → Wallet Credit
    if (status === "delivered") {
      await fetch(`${process.env.VERCEL_URL || ""}/api/wallet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "order",
          userId: order.sellerId,
          amount: order.amount,
          orderId: order.orderId
        })
      });
    }

    return res.json({ success: true, status });
  }

  // 📦 FETCH SELLER ORDERS
  if (action === "fetch") {
    const sellerOrders = db.orders.filter(o => o.sellerId === sellerId);
    return res.json({ orders: sellerOrders });
  }

  res.status(400).json({ error: "Unknown action" });
}
