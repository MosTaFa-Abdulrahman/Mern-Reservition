const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    const userSaved = await newUser.save();
    res.status(200).json(userSaved);
  } catch (error) {
    res.status(500).json("Error Register !!~");
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("User not Found ~!");

    const validatePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(404).json("Password Wrong ~!");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...others }, isAdmin });
  } catch {
    res.status(500).json("Error Login !!~");
  }
});

module.exports = router;
