const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_SECRET = process.env.JWT_SECRET || "heheheha"; // Replace with your actual secret

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  // console.log("hey");
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Unauthorized", error: error.message });
  }
};

module.exports = { authMiddleware };
