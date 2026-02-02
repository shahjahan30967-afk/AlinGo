const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");
const auth = require("../middlewares/auth.middleware");

router.post("/create", auth, async (req, res) => {
  const ride = await Ride.create({
    user: req.user.id,
    pickup: req.body.pickup,
    drop: req.body.drop
  });
  res.json(ride);
});

router.get("/my", auth, async (req, res) => {
  const rides = await Ride.find({ user: req.user.id });
  res.json(rides);
});

module.exports = router;
