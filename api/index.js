const express = require('express');
const app = express();
const path = require('path');

// یہ لائن آپ کی HTML فائلز کو سرور کے ذریعے دکھائے گی
app.use(express.static(path.join(__dirname, '../')));

app.get('/api/hello', (req, res) => {
  res.json({ message: "Alingo Express Server is Running!" });
});

module.exports = app;
