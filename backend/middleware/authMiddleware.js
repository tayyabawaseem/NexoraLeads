const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Protects routes — only requests with a valid JWT in the
// Authorization header ("Bearer <token>") are allowed through.
const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the admin (minus password) to the request for use in controllers
      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "Admin no longer exists" });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token provided" });
};

module.exports = { protect };
