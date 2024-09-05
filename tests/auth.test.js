const request = require("supertest");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/Users");

describe("Auth Routes", () => {
  let server;
  let user;
  let token;

  beforeAll(async () => {
    server = app.listen(5000);
    await mongoose.connect(process.env.MONGOOSE_URL);

    // Create a sample user for testing
    user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  it("should sign in an existing user", async () => {
    const res = await request(server).post("/api/auth/signin").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // Add more tests as needed
});
