import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db", "otp.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateUserId() {
  return "AL-" + Math.floor(100000 + Math.random() * 900000);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { mobile, otp } = req.body;
  if (!mobile) {
    return res.status(400).json({ error: "Mobile required" });
  }

  const db = readDB();
  const now = Date.now();

  // STEP 1: SEND OTP
  if (!otp) {
    const code = generateOTP();

    db.requests = db.requests.filter(
      r => !(r.mobile === mobile && now - r.created < 120000)
    );

    db.requests.push({
      mobile,
      otp: code,
      created: now,
      attempts: 0,
      verified: false,
      userId: null
    });

    writeDB(db);

    // 🔌 یہاں SMS API لگے گی (Twilio / Firebase)
    console.log("OTP:", code);

    return res.json({
      success: true,
      message: "OTP sent",
      expiresIn: 120
    });
  }

  // STEP 2: VERIFY OTP
  const record = db.requests.find(
    r => r.mobile === mobile && !r.verified
  );

  if (!record) {
    return res.status(400).json({ error: "OTP not found" });
  }

  if (now - record.created > 120000) {
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.attempts >= 3) {
    return res.status(403).json({ error: "Too many attempts" });
  }

  record.attempts++;

  if (record.otp !== otp) {
    writeDB(db);
    return res.status(401).json({ error: "Invalid OTP" });
  }

  record.verified = true;
  record.userId = generateUserId();
  writeDB(db);

  return res.json({
    success: true,
    verified: true,
    userId: record.userId
  });
}
