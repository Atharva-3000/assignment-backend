const express = require("express");
const User = require("../models/Users");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Get all users in ascending order of points
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ points: 1 });
    res.send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Like a user
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user is liking their own profile
    if (user._id.toString() === req.params.id) {
      return res
        .status(400)
        .send({ message: "You cannot like your own profile" });
    }

    user.points += 1;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// CRUD operations for users
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the user is deleting their own profile
    if (user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this user" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
