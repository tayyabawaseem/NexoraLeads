const express = require("express");
const router = express.Router();
const { submitReview, getApprovedReviews } = require("../controllers/reviewController");

// POST /api/reviews -> customer submits a review (no auth)
router.post("/", submitReview);

// GET /api/reviews -> public list of approved reviews only
router.get("/", getApprovedReviews);

module.exports = router;
