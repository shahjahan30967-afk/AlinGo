const express = require("express");
const app = express();

app.get("/api/health", (req, res) => {
  res.json({ status: "Alingo API Running" });
});

module.exports = app;

const digitalRoutes = require("./digital/digital.routes");

module.exports = (req, res) => {
  if (req.url.startsWith("/api/digital")) {
    return digitalRoutes(req, res);
  }

  res.statusCode = 404;
  res.end("API Not Found");
};

