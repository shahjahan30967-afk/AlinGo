const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // فائل پاتھ کے لیے ضروری

// انوائرمنٹ ویری ایبلز لوڈ کریں
dotenv.config();

// راؤٹس کو امپورٹ کریں
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// --- مڈل ویئر (Middleware) ---
app.use(cors()); 
app.use(express.json()); 

// --- اسٹینگ فائلز (Static Files) ---
// یہ لائن ایکسپریس کو بتائے گی کہ تمام HTML, CSS اور تصاویر 'public' فولڈر میں ہیں
app.use(express.static(path.join(__dirname, 'public')));

// --- ڈیٹا بیس کنکشن ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Alingo Database Connected!"))
    .catch((err) => {
        console.error("❌ DB Error: ", err.message);
        process.exit(1);
    });

// --- API راؤٹس ---
app.use('/api/orders', orderRoutes);

// --- فرنٹ اینڈ ہینڈلنگ (حرکت اور ری ڈائریکشن روکنے کے لیے) ---
// یہ روٹ یقینی بنائے گا کہ کوئی بھی پیج کھلے، وہ آپ کی سادہ HTML فائل ہی دکھائے
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// سرور پورٹ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
