const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { verifyAdmin } = require("../utils/verifyToken");

// Create
router.post("/create/:hotelId", verifyAdmin, async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      res.status(400).json("I Can not Update ((Hotel)) Room !!~~");
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json("I Can not Create Room !!~");
  }
});

// Update Room
router.put("/update/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json("I Can not Update Room !!~");
  }
});
// Update ((Room Number)) not Room  ||Confuse for me||  roomId
router.put("/update/availability/:id", async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("Room status has been updated ☻♥");
  } catch (error) {
    res.status(500).json("I Can not Update ((Availability)) Room !!~");
  }
});

// Delete
router.delete("/delete/:id/:hotelId", verifyAdmin, async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      res.status(400).json("I Can not Delete ((Hotel)) Room !!~~");
    }
    res.status(200).json("Room Deleted ☻♥");
  } catch (error) {
    res.status(500).json("I Can not Delete Room !!~");
  }
});

// Get
router.get("/get/:id", async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    res.status(500).json("I Can not Get Room !!~");
  }
});

// Get ALL
router.get("/get", async (req, res, next) => {
  try {
    const getAllRooms = await Room.find();
    res.status(200).json(getAllRooms);
  } catch (error) {
    res.status(500).json("I Can not Get ALL Rooms !!~");
  }
});

module.exports = router;
