const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ===== MIDDLEWARES =====
app.use(express.json());
app.use(express.static("public"));

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== ROUTES =====
app.use("/api/otp", require("./routes/otp.routes"));
app.use("/api/ride", require("./routes/ride.routes"));

// ===== START =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
