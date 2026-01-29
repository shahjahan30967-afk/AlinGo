const express = require('express');
const path = require('path');
const app = express();

// سٹیٹک فائلز کے لیے راستہ
app.use(express.static(path.join(__dirname, '../public')));

// مین پیج کا راستہ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ٹیکسی پیج کا راستہ (یہی وہ حصہ ہے جو غائب تھا)
app.get('/taxi', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/taxi.html'));
});

module.exports = app;
