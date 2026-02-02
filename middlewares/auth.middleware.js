import admin from "../config/firebase-admin.js";

const authMiddleware = async (req, res, next) => {
  // ہیڈر سے ٹوکن حاصل کریں
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "لاگ ان ہونا ضروری ہے" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // فائر بیس کے ذریعے ٹوکن کی تصدیق
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // یوزر کا ڈیٹا ریکوئسٹ میں شامل کریں تاکہ کنٹرولر اسے استعمال کر سکے
    req.user = {
      id: decodedToken.uid,
      phone: decodedToken.phone_number,
      email: decodedToken.email
    };
    
    next(); // اگلے مرحلے (Controller) پر جائیں
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(403).json({ success: false, message: "سیشن ختم ہو چکا ہے، دوبارہ لاگ ان کریں" });
  }
};

export default authMiddleware;
