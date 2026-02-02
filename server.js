const express = require("express");
const app = express();

app.use(express.json());

// OTP routes
app.use("/api/otp", require("./routes/otp.routes"));

// Ride routes
app.use("/api/ride", require("./routes/ride.routes"));

// Logistics routes
app.use("/api/logistics", require("./routes/logistics.routes"));

// Food routes
app.use("/api/food", require("./routes/food.routes"));

// Hotel routes
app.use("/api/hotel", require("./routes/hotel.routes"));

// Ticketing routes
app.use("/api/ticket", require("./routes/ticket.routes"));

// Wallet / Payments routes
app.use("/api/wallet", require("./routes/wallet.routes"));

module.exports = app;
