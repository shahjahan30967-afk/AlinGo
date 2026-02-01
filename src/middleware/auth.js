const jwt = require('jsonwebtoken');

/**
 * Alingo Food Authentication Middleware
 * یہ مڈل ویئر چیک کرتا ہے کہ آیا کسٹمر یا رائیڈر لاگ ان ہے یا نہیں۔
 */
const authMiddleware = (req, res, next) => {
    // ہیڈر سے ٹوکن حاصل کریں
    const token = req.header('Authorization');

    // اگر ٹوکن موجود نہ ہو
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "رسائی کی اجازت نہیں ہے۔ ٹوکن غائب ہے۔" 
        });
    }

    try {
        // ٹوکن کی صفائی (اگر Bearer لکھا ہو) اور تصدیق
        const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // یوزر کا ڈیٹا ریکوسٹ آبجیکٹ میں محفوظ کریں تاکہ آگے استعمال ہو سکے
        req.user = decoded.user;
        
        next(); // اگلے مرحلے (Controller) پر جائیں
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            message: "ٹوکن درست نہیں ہے یا اس کی مدت ختم ہو چکی ہے۔" 
        });
    }
};

module.exports = authMiddleware;
