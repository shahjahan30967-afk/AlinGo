import fs from "fs";
import path from "path";

const DB = path.join(process.cwd(), "db", "deliveries.json");
const FLOW = ["assigned","accepted","picked","onroute","delivered"];

function readDB() {
  if (!fs.existsSync(DB)) {
    return { deliveries: [] };
  }
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

function writeDB(data) {
  fs.mkdirSync(path.dirname(DB), { recursive: true });
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

export const deliveryHandler = (req, res) => {
  const { action, orderId, driverId, status, otp } = req.body;
  const db = readDB();

  // assign
  if (action === "assign") {
    const deliveryId = "DLV-" + Date.now();
    const otpCode = String(Math.floor(1000 + Math.random() * 9000));

    db.deliveries.push({
      deliveryId,
      orderId,
      driverId,
      status: "assigned",
      otp: otpCode,
      history: [{ status: "assigned", time: Date.now() }]
    });

    writeDB(db);
    return res.json({ success: true, deliveryId });
  }

  const del = db.deliveries.find(d => d.orderId === orderId);
  if (!del) return res.status(404).json({ error: "Not found" });

  if (action === "update") {
    const ci = FLOW.indexOf(del.status);
    const ni = FLOW.indexOf(status);

    if (ni !== ci + 1) {
      return res.status(403).json({ error: "Invalid flow" });
    }

    if (status === "delivered" && String(otp) !== del.otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    del.status = status;
    del.history.push({ status, time: Date.now() });
    writeDB(db);

    return res.json({ success: true, status });
  }

  res.status(400).json({ error: "Invalid action" });
};
