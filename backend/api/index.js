const serverless = require("serverless-http");
const handler = require("../server");

module.exports = serverless(handler);