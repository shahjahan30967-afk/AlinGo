import winston from "winston";

/**
 * LOGGER LOGIC:
 * 1. 'info' لاگز: عام سرگرمیوں کے لیے۔
 * 2. 'error' لاگز: کریش یا غلطیوں کے لیے۔
 * 3. 'console' لاگز: صرف ڈیولپمنٹ کے دوران دیکھنے کے لیے۔
 */

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    // 1. تمام ایررز کو الگ فائل میں سیو کریں (لوکل ٹیسٹنگ کے لیے)
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // 2. تمام ایکٹیویٹی کو ایک بڑی فائل میں سیو کریں
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// 3. گلو کوڈ برائے Vercel/Production: 
// اگر سرور لائیو ہے تو لاگز کو کنسول پر دکھائیں تاکہ ہم ڈیش بورڈ میں دیکھ سکیں
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
