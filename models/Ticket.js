const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  type: { type: String, enum: ["bus", "flight", "train"], required: true },
  company: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model("Ticket", TicketSchema);
