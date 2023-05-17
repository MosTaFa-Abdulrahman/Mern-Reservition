const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  desc: { type: String, required: true },
  title: { type: String, required: true },
  photos: { type: [String] },
  rooms: { type: [String] },
  rating: { type: Number, min: 0, max: 5 },
  chapestPrice: { type: Number, required: true },
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model("hotel", HotelSchema);
