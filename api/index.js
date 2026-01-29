const express = require("express");
const path = require("path");
const app = express();

// یہ لائن آپ کی سپلیش اسکرین اور لوگو کو لوڈ کروائے گی
app.use(express.static(path.join(__dirname, "../public")));

// جب کوئی مین سائٹ کھولے (Customer Page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// جب کوئی ایڈمن پیج کھولے
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin.html"));
});

module.exports = app;
