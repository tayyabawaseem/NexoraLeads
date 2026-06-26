// One-time script to create the first admin account.
// There is no public signup route by design (kept simple, no user accounts).
// Run with: npm run seed:admin
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first");
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });

  if (existing) {
    console.log(`Admin with email ${email} already exists. Nothing to do.`);
    process.exit(0);
  }

  // Password is hashed automatically by the pre("save") hook in models/Admin.js
  await Admin.create({ email, password });

  console.log(`Admin account created for ${email}`);
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error("Failed to seed admin:", error.message);
  process.exit(1);
});
