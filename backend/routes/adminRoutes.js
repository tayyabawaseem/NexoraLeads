const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const {
  getAllReviews,
  approveReview,
  rejectReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/admin/login -> public, returns JWT
router.post("/login", loginAdmin);

// Everything below this line requires a valid JWT (protect middleware)
router.get("/reviews", protect, getAllReviews);
router.put("/reviews/:id/approve", protect, approveReview);
router.put("/reviews/:id/reject", protect, rejectReview);
router.delete("/reviews/:id", protect, deleteReview);

module.exports = router;
