const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/Users");

const jobListingSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  link: { type: String, required: true },
  title: { type: String, required: true },
  usersApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("JobListing", jobListingSchema);
