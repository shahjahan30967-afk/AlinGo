const Hotel = require("../models/Hotel");
const HotelBooking = require("../models/HotelBooking");

// GET ALL HOTELS
exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.json({ success: true, hotels });
};

// BOOK HOTEL
exports.bookHotel = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, roomsBooked } = req.body;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  if (roomsBooked > hotel.roomsAvailable)
    return res.status(400).json({ message: "Not enough rooms available" });

  hotel.roomsAvailable -= roomsBooked;
  await hotel.save();

  const totalPrice = hotel.pricePerNight * roomsBooked;
  
  const booking = await HotelBooking.create({
    user: req.user.id,
    hotel: hotelId,
    checkInDate,
    checkOutDate,
    roomsBooked,
    totalPrice
  });

  res.json({ success: true, booking });
};

// GET USER BOOKINGS
exports.getBookings = async (req, res) => {
  const bookings = await HotelBooking.find({ user: req.user.id }).populate("hotel");
  res.json({ success: true, bookings });
};
