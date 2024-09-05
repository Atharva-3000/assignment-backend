const express = require("express");
const JobListing = require("../models/JobListing");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// CRUD operations for job listings
router.get("/", async (req, res) => {
  try {
    const jobListings = await JobListing.find();
    res.send(jobListings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id);
    if (!jobListing) {
      return res.status(404).send({ message: "Job listing not found" });
    }
    res.send(jobListing);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const jobListing = new JobListing(req.body);
    await jobListing.save();
    res.status(201).send(jobListing);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!jobListing) {
      return res.status(404).send({ message: "Job listing not found" });
    }
    res.send(jobListing);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndDelete(req.params.id);
    if (!jobListing) {
      return res.status(404).send({ message: "Job listing not found" });
    }
    res.send({ message: "Job listing deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Add a user to the list of users who applied for a job
router.post("/:id/apply", authMiddleware, async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id);
    if (!jobListing) {
      return res.status(404).send({ message: "Job listing not found" });
    }
    jobListing.usersApplied.push(req.user.id);
    await jobListing.save();
    res.send(jobListing);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
