const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

// Check
router.get("/checkUser", verifyUser, (req, res) => {
  res.status(200).json("Hello, iam User ☻");
});
router.get("/checkAdmin", verifyAdmin, (req, res) => {
  res.status(200).json("Hello, iam Admin ☻♥");
});

// Create
router.post("/create", verifyAdmin, async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json("I Can not Create Hotel !!~");
  }
});

// Update
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json("I Can not Update Hotel !!~");
  }
});

// Delete
router.delete("/delete/:id", verifyAdmin, async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted ☻♥");
  } catch (error) {
    res.status(500).json("I Can not Delete Hotel !!~");
  }
});

// Get
router.get("/get/:id", async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (error) {
    res.status(500).json("I Can not Get Hotel !!~");
  }
});

// Get ALL
router.get("/get", async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const getAllHotels = await Hotel.find({
      ...others,
      chapestPrice: { $gt: min || 1, $lt: max || 1000 },
    }).limit(req.query.limit);
    res.status(200).json(getAllHotels);
  } catch (error) {
    res.status(500).json("I Can not Get ALL Hotels !!~");
  }
});

// Count By City
router.get("/countByCity", async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city }); // only return number OF ((hotels)) in this city
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json("I Can not Get ALL Hotels ((Count By City)) !!~");
  }
});

// Count By Type
router.get("/countByType", async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    res.status(500).json("I Can not Get ALL Hotels ((Count By Type)) !!~");
  }
});

// Get Hotel Rooms
router.get("/rooms/:hotelId", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json("I Can not Get Hotel ((Rooms)) !~~~");
  }
});

module.exports = router;
