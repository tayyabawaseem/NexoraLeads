const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminController");

const {
  getAllReviews,
  getLastReviewUpdate,
  approveReview,
  rejectReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// ==============================
// Public Route
// ==============================

// POST /api/admin/login
router.post("/login", loginAdmin);

// ==============================
// Protected Routes
// ==============================

// Check if reviews have changed
router.get("/reviews/last-updated", protect, getLastReviewUpdate);

// Get all reviews
router.get("/reviews", protect, getAllReviews);

// Approve review
router.put("/reviews/:id/approve", protect, approveReview);

// Reject review
router.put("/reviews/:id/reject", protect, rejectReview);

// Delete review
router.delete("/reviews/:id", protect, deleteReview);

module.exports = router;