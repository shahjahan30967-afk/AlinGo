const Ticket = require("../models/Ticket");
const TicketBooking = require("../models/TicketBooking");

// GET ALL TICKETS
exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json({ success: true, tickets });
};

// BOOK TICKET
exports.bookTicket = async (req, res) => {
  const { ticketId, seatsBooked } = req.body;

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (seatsBooked > ticket.seatsAvailable)
    return res.status(400).json({ message: "Not enough seats available" });

  ticket.seatsAvailable -= seatsBooked;
  await ticket.save();

  const totalPrice = ticket.price * seatsBooked;

  const booking = await TicketBooking.create({
    user: req.user.id,
    ticket: ticketId,
    seatsBooked,
    totalPrice
  });

  res.json({ success: true, booking });
};

// GET USER BOOKINGS
exports.getBookings = async (req, res) => {
  const bookings = await TicketBooking.find({ user: req.user.id }).populate("ticket");
  res.json({ success: true, bookings });
};
