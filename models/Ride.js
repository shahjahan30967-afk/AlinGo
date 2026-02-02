import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["requested","accepted","ongoing","completed","cancelled"], 
    default: "requested" 
  }
}, { timestamps: true });

export default mongoose.model("Ride", rideSchema);
