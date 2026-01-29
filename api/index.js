const express = require('express');
const path = require('path');
const app = express();

// بتاتا ہے کہ تمام فائلیں public فولڈر میں ہیں
app.use(express.static(path.join(__dirname, '../public')));

// مین ہوم پیج
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ٹیکسی بکنگ پیج کا راستہ (یہ ایرر ختم کرے گا)
app.get('/taxi', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/taxi.html'));
});

// ایڈمن پینل کا راستہ
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

module.exports = app;
