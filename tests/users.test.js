const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/Users");

describe("User Routes", () => {
  let server;
  let token;
  let userId;

  beforeAll(async () => {
    server = app.listen(4000);
    await mongoose.connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
    // server.close();
  });

  it("should retrieve all users", async () => {
    const res = await request(server)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should retrieve a user by ID", async () => {
    const res = await request(server)
      .get(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should like a user", async () => {
    const res = await request(server)
      .post(`/api/users/${userId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.likes).toBeGreaterThan(0);
  });

  it("should delete a user", async () => {
    const res = await request(server)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("User deleted");
  });
});
