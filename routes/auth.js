const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "heheheha"; // Replace with your actual secret

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, githubLink } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password, githubLink });
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Send token in response header
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // Find user and check password
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send token in response header
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
