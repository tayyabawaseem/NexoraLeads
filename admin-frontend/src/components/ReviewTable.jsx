import React from "react";
import StatusBadge from "./StatusBadge.jsx";

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getInitials = (name) => {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ReviewTable = ({
  reviews,
  onApprove,
  onReject,
  onDelete,
  busyId,
}) => {
  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Reviews Found</h3>
        <p>No reviews available in this category.</p>
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Review</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {reviews.map((r) => {
          const isBusy = busyId === r._id;

          return (
            <tr key={r._id}>
              <td>
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {getInitials(r.name)}
                  </div>

                  <div>
                    <div className="reviewer-name">
                      {r.name}
                    </div>

                    <div className="reviewer-id">
                      #{r._id.slice(-6)}
                    </div>
                  </div>
                </div>
              </td>

              <td className="review-text">
                {r.review}
              </td>

              <td>
                <div className="rating-stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>
              </td>

              <td>
                <StatusBadge status={r.status} />
              </td>

              <td className="date-cell">
                {formatDate(r.createdAt)}
              </td>

              <td>
                <div className="actions">
                  {r.status !== "approved" && (
                    <button
                      className="action-btn approve"
                      disabled={isBusy}
                      onClick={() => onApprove(r._id)}
                    >
                      ✓ Approve
                    </button>
                  )}

                  {r.status !== "rejected" && (
                    <button
                      className="action-btn reject"
                      disabled={isBusy}
                      onClick={() => onReject(r._id)}
                    >
                      ✕ Reject
                    </button>
                  )}

                  <button
                    className="action-btn delete"
                    disabled={isBusy}
                    onClick={() => onDelete(r._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReviewTable;