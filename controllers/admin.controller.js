const User = require("../models/User");
const Ride = require("../models/Ride");
const Logistics = require("../models/Logistics");
const FoodOrder = require("../models/FoodOrder");
const HotelBooking = require("../models/HotelBooking");
const TicketBooking = require("../models/TicketBooking");
const Wallet = require("../models/Wallet");
const Driver = require("../models/User"); // drivers are also in User model

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" });
  res.json({ success: true, users });
};

// GET ALL DRIVERS
exports.getAllDrivers = async (req, res) => {
  const drivers = await User.find({ role: "driver" });
  res.json({ success: true, drivers });
};

// GET ALL RIDES
exports.getAllRides = async (req, res) => {
  const rides = await Ride.find().populate("user driver");
  res.json({ success: true, rides });
};

// GET ALL LOGISTICS SHIPMENTS
exports.getAllShipments = async (req, res) => {
  const shipments = await Logistics.find().populate("user driver");
  res.json({ success: true, shipments });
};

// GET ALL FOOD ORDERS
exports.getAllFoodOrders = async (req, res) => {
  const orders = await FoodOrder.find().populate("user items.food");
  res.json({ success: true, orders });
};

// GET ALL HOTEL BOOKINGS
exports.getAllHotelBookings = async (req, res) => {
  const bookings = await HotelBooking.find().populate("user hotel");
  res.json({ success: true, bookings });
};

// GET ALL TICKET BOOKINGS
exports.getAllTicketBookings = async (req, res) => {
  const bookings = await TicketBooking.find().populate("user ticket");
  res.json({ success: true, bookings });
};

// GET WALLET REPORTS
exports.getWalletReports = async (req, res) => {
  const wallets = await Wallet.find().populate("user");
  res.json({ success: true, wallets });
};

// UPDATE USER / DRIVER STATUS
exports.updateUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { status } = req.body;
  user.status = status; // active / blocked
  await user.save();

  res.json({ success: true, user });
};
