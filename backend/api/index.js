const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../config/db");

let isConnected = false;

const handler = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return serverless(app)(req, res);
};

module.exports = handler;