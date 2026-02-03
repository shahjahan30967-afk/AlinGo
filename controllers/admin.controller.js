import User from "../models/User.js";
import Ride from "../models/Ride.js";
import Logistics from "../models/Logistics.js";
import FoodOrder from "../models/FoodOrder.js";
import HotelBooking from "../models/HotelBooking.js";
import TicketBooking from "../models/TicketBooking.js";
import Wallet from "../models/Wallet.js";
import Investor from "../models/Investor.model.js"; // Investors model
import mongoose from "mongoose";

/* ==============================
   USERS & DRIVERS
================================ */

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

// GET ALL DRIVERS
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" });
    res.json({ success: true, drivers });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

/* ==============================
   RIDES, LOGISTICS, ORDERS
================================ */

// GET ALL RIDES
export const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate("user driver");
    res.json({ success: true, rides });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

// GET ALL LOGISTICS SHIPMENTS
export const getAllShipments = async (req, res) => {
  try {
    const shipments = await Logistics.find().populate("user driver");
    res.json({ success: true, shipments });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

// GET ALL FOOD ORDERS
export const getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find().populate("user items.food");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

// GET ALL HOTEL BOOKINGS
export const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().populate("user hotel");
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

// GET ALL TICKET BOOKINGS
export const getAllTicketBookings = async (req, res) => {
  try {
    const bookings = await TicketBooking.find().populate("user ticket");
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

/* ==============================
   WALLET REPORTS
================================ */

export const getWalletReports = async (req, res) => {
  try {
    const wallets = await Wallet.find().populate("user");
    res.json({ success: true, wallets });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

/* ==============================
   USER / DRIVER STATUS
================================ */

export const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { status } = req.body;
    user.status = status; // active / blocked
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success:false, message:err.message });
  }
};

/* ==============================
   INVESTORS MODULE (NEW)
================================ */

// CREATE INVESTOR
export const createInvestor = async (req,res)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const { name, email, phone } = req.body;
    const investor = new Investor({ name,email,phone });
    await investor.save({ session });

    // create Wallet
    const wallet = await Wallet.create([{ ownerId: investor._id, ownerType:"investor", balance:0, transactions:[] }], { session });
    investor.walletId = wallet[0]._id;
    await investor.save({ session });

    await session.commitTransaction();
    res.json({ success:true, investor });
  }catch(err){
    await session.abortTransaction();
    res.status(400).json({ success:false, message:err.message });
  }finally{
    session.endSession();
  }
}

// LIST ALL INVESTORS
export const listInvestors = async (req,res)=>{
  try{
    const investors = await Investor.find().populate("walletId").sort({createdAt:-1});
    res.json({ success:true, investors });
  }catch(err){
    res.status(500).json({ success:false, message:err.message });
  }
}

// INVEST AMOUNT
export const investAmount = async (req,res)=>{
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const { investorId, amount } = req.body;
    const investor = await Investor.findById(investorId).session(session);
    if(!investor) throw new Error("Investor not found");

    const wallet = await Wallet.findById(investor.walletId).session(session);
    wallet.balance += amount;
    wallet.transactions.push({ type:"credit", amount, source:"Investment", meta:{ investorId } });
    investor.investedAmount += amount;
    investor.updatedAt = new Date();

    await wallet.save({ session });
    await investor.save({ session });
    await session.commitTransaction();

    res.json({ success:true, investor, wallet });
  }catch(err){
    await session.abortTransaction();
    res.status(400).json({ success:false, message:err.message });
  }finally{
    session.endSession();
  }
}
