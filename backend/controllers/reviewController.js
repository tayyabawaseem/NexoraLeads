const Review = require("../models/Review");

// @route   POST /api/reviews
// @desc    Customer submits a review (no auth required)
// @access  Public
const submitReview = async (req, res) => {
  try {
    const { name, review, rating } = req.body;

    const newReview = await Review.create({
      name,
      review,
      rating,
      // status defaults to "pending" via the schema — not set here on purpose
    });

    return res.status(201).json({
      message: "Review submitted successfully and is awaiting approval",
      data: newReview,
    });
  } catch (error) {
    // Mongoose validation errors (min length, required fields, rating range)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    return res.status(500).json({ message: "Server error while submitting review" });
  }
};

// @route   GET /api/reviews
// @desc    Get all approved reviews for the public website
// @access  Public
const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" }).sort({ createdAt: -1 });
    return res.status(200).json({ data: reviews });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

// @route   GET /api/admin/reviews
// @desc    Get all reviews regardless of status (pending, approved, rejected)
// @access  Private (admin)
const getAllReviews = async (req, res) => {
  try {
    const { status } = req.query; // optional filter: ?status=pending

    const filter = status ? { status } : {};
    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({ data: reviews });
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

// @route   PUT /api/admin/reviews/:id/approve
// @desc    Approve a pending review
// @access  Private (admin)
const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review approved", data: review });
  } catch (error) {
    return res.status(500).json({ message: "Server error while approving review" });
  }
};

// @route   PUT /api/admin/reviews/:id/reject
// @desc    Reject a pending review
// @access  Private (admin)
const rejectReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review rejected", data: review });
  } catch (error) {
    return res.status(500).json({ message: "Server error while rejecting review" });
  }
};

// @route   DELETE /api/admin/reviews/:id
// @desc    Permanently delete a review
// @access  Private (admin)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting review" });
  }
};

module.exports = {
  submitReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  rejectReview,
  deleteReview,
};
