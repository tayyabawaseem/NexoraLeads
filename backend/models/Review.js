const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      minlength: [10, "Review must be at least 10 characters"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index for the most common public query: status = "approved"
reviewSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);
