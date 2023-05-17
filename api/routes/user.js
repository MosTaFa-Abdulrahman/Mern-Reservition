const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

// Update
router.put("/update/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("I Can not Update User !!~");
  }
});

// Delete
router.delete("/delete/:id", verifyUser, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted ☻♥");
  } catch (error) {
    res.status(500).json("I Can not Delete User !!~");
  }
});

// Get
router.get("/get/:id", verifyUser, async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json("I Can not Get User !!~");
  }
});

// Get ALL
router.get("/get", verifyAdmin, async (req, res, next) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json("I Can not Get ALL Users !!~");
  }
});

module.exports = router;
