const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// راؤٹس کو امپورٹ کریں
const orderRoutes = require('./routes/orderRoutes');
// اگر آپ نے یوزر راؤٹس بنا لیے ہیں تو انہیں بھی یہاں شامل کریں
// const authRoutes = require('./routes/authRoutes');

// انوائرمنٹ ویری ایبلز لوڈ کریں
dotenv.config();

const app = express();

// مڈل ویئر (Middleware)
app.use(cors()); // دوسری ڈومینز سے ریکوسٹ کی اجازت کے لیے
app.use(express.json()); // JSON ڈیٹا ریڈ کرنے کے لیے

// ڈیٹا بیس کنکشن (MongoDB Connection)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Alingo app Database Connected Successfully!"))
    .catch((err) => {
        console.error("❌ Database Connection Error: ", err.message);
        process.exit(1); // کنکشن نہ ہونے کی صورت میں سرور روک دیں
    });

// راؤٹس کا استعمال (Route Handlers)
app.use('/api/orders', orderRoutes);
// app.use('/api/auth', authRoutes);

// بیسک ٹیسٹنگ روٹ
app.get('/', (req, res) => {
    res.send("Alingo app Backend is Running...");
});

// سرور پورٹ سیٹ اپ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port ${PORT}`);
});
