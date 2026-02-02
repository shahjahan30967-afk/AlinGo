const express = require("express");
const app = express();

app.use(express.json());

// OTP routes
app.use("/api/otp", require("./routes/otp.routes"));

// Ride routes
app.use("/api/ride", require("./routes/ride.routes"));

// Logistics routes (OTP Protected)
app.use("/api/logistics", require("./routes/logistics.routes"));

module.exports = app;
