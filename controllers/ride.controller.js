// 1. 'require' کی جگہ 'import' استعمال کریں
import Ride from "../models/Ride.js"; 

// 2. 'exports' کی جگہ 'export const' استعمال کریں
export const createRide = async (req, res) => {
  try {
    const { pickupLocation, dropLocation } = req.body;

    // گلو کوڈ: چیک کریں کہ کیا یوزر لاگ ان ہے (req.user)
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const ride = await Ride.create({
      user: req.user.id,
      pickupLocation,
      dropLocation
    });

    res.json({ success: true, ride });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user.id });
    res.json({ success: true, rides });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate("driver user");
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.json({ success: true, ride });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
