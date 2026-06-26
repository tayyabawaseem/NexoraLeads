import { useState } from "react";
import "./ReveiwBtn.css";
import { submitReview } from "../../Api/reviewApi";

function ReveiwBtn() {

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [nameError, setNameError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const resetForm = () => {
    setName("");
    setReview("");
    setRating(0);
    setNameError("");
    setReviewError("");
    setRatingError("");
    setSubmitError("");
    setSubmitSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    setNameError("");
    setReviewError("");
    setRatingError("");
    setSubmitError("");

    if (name.trim().length < 3) {
      setNameError("Please enter a full name.");
      isValid = false;
    }

    if (rating === 0) {
      setRatingError("Please select a rating.");
      isValid = false;
    }

    if (review.trim().length < 25) {
      setReviewError("Review must be at least 25 characters.");
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      await submitReview({ name, review, rating });

      setSubmitSuccess(true);

      // Reset form fields after successful submission
      setName("");
      setReview("");
      setRating(0);

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="reviews-sections">

      <div className="reviews-header">

        <button
          className="write-review-btn"
          onClick={() => setShowForm(true)}
        >
          Write a Review
        </button>

      </div>

      {showForm && (
        <div className="review-modal">

          <div className="review-form-box">

            <button
              className="close-review"
              onClick={handleClose}
            >
              ×
            </button>

            <div className="review-top">

              <h3>Share Your Experience</h3>

              <p>
                Your feedback helps us improve our services and
                helps other businesses make better decisions.
              </p>

            </div>

            {/* Success State */}
            {submitSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</p>
                <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#334155", marginBottom: "10px" }}>
                  Thank you for your review!
                </h4>
                <p style={{ color: "#64748b", lineHeight: "1.8", marginBottom: "24px" }}>
                  Your review has been submitted and is pending approval. It will appear publicly once approved by our team.
                </p>
                <button
                  className="submit-review-btn"
                  style={{ width: "100%" }}
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="review-form"
                onSubmit={handleSubmit}
              >

                <div className="input-group">

                  <label>Your Name</label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    className={nameError ? "input-error" : ""}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError("");
                    }}
                  />

                  {nameError && (
                    <span className="field-error">
                      {nameError}
                    </span>
                  )}

                </div>

                <div className="input-group">

                  <label>Rate Your Experience</label>

                  <div className="rating-stars">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={
                          rating >= star
                            ? "active-star"
                            : ""
                        }
                        onClick={() => {
                          setRating(star);
                          setRatingError("");
                        }}
                      >
                        ★
                      </button>
                    ))}

                  </div>

                  <p className="selected-rating">
                    {rating > 0
                      ? `${rating} / 5 Stars`
                      : "Select Rating"}
                  </p>

                  {ratingError && (
                    <span className="field-error">
                      {ratingError}
                    </span>
                  )}

                </div>

                <div className="input-group">

                  <label>Your Review</label>

                  <textarea
                    rows="5"
                    placeholder="Tell us about your experience..."
                    value={review}
                    className={reviewError ? "input-error" : ""}
                    onChange={(e) => {
                      setReview(e.target.value);
                      setReviewError("");
                    }}
                  />

                  {reviewError && (
                    <span className="field-error">
                      {reviewError}
                    </span>
                  )}

                </div>

                {/* API-level error */}
                {submitError && (
                  <span className="field-error" style={{ textAlign: "center" }}>
                    {submitError}
                  </span>
                )}

                <button
                  type="submit"
                  className="submit-review-btn"
                  disabled={isLoading}
                  style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                >
                  {isLoading ? "Submitting..." : "Submit Review"}
                </button>

              </form>
            )}

          </div>

        </div>
      )}

    </section>
  );
}

export default ReveiwBtn;
