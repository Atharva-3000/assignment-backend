const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/Users");

describe("Job Listings Routes", () => {
  let server;
  let token;
  let userId;

  beforeAll(async () => {
    server = app.listen(4000);
    await mongoose.connect(process.env.MONGOOSE_URL);
    const user = await request(server).post("/api/auth/signup").send({
      name: "User Tester",
      email: "usertester@example.com",
      password: "password123",
    });
    token = user.body.token;
    userId = user.body.user._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should retrieve all job listings", async () => {
    const res = await request(server)
      .get("/api/job-listings")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a job listing by ID", async () => {
    const res = await request(server)
      .get(`/api/job-listings/${jobListingId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should create a new job listing", async () => {
    const res = await request(server)
      .post("/api/job-listings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "New Job",
        description: "Job description",
        company: "Company name",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "New Job");
  });

  it("should update a job listing", async () => {
    const res = await request(server)
      .put(`/api/job-listings/${jobListingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Job",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Job");
  });

  it("should delete a job listing", async () => {
    const res = await request(server)
      .delete(`/api/job-listings/${jobListingId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Job listing deleted");
  });
});
