const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");

async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }

  return app(req, res);
}

module.exports = handler;