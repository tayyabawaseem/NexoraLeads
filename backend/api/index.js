const mongoose = require("mongoose");
const app = require("../app");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }

  return app(req, res);
};