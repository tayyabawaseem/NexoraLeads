import React, { useEffect, useState, useCallback, useRef } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import ReviewTable from "../components/ReviewTable.jsx";

const FILTERS = ["all", "pending", "approved", "rejected"];

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const { admin, logout } = useAuth();

  // Stores latest updatedAt from server
  const lastUpdatedRef = useRef(null);

  // Fetch reviews
  const fetchReviews = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);

      const params = filter !== "all" ? { status: filter } : {};
      const response = await api.get("/admin/reviews", { params });

      setReviews(response.data.data);

      // FIX 1: Sync the ref with the freshest data from the database
      if (response.data.data.length > 0) {
        lastUpdatedRef.current = response.data.data[0].updatedAt;
      } else {
        lastUpdatedRef.current = null;
      }

      setError("");
    } catch (err) {
      setError("Could not load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    // Initial Load (Show loading UI)
    fetchReviews(false);

    // Setup short-polling interval
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/admin/reviews/last-updated");
        const serverLastUpdated = res.data.lastUpdated;

        // FIX 2: Check if server timestamp differs from what we currently have
        if (serverLastUpdated !== lastUpdatedRef.current) {
          // Fetch silently in background without resetting UI loaders
          await fetchReviews(true);
          // Keep the ref updated in case filter changes didn't rewrite it
          lastUpdatedRef.current = serverLastUpdated;
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchReviews]);

  const handleApprove = async (id) => {
    setBusyId(id);
    try {
      await api.put(`/admin/reviews/${id}/approve`);

      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "approved" } : r
        )
      );
    } catch (err) {
      setError("Could not approve review. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id) => {
    setBusyId(id);
    try {
      await api.put(`/admin/reviews/${id}/reject`);

      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "rejected" } : r
        )
      );
    } catch (err) {
      setError("Could not reject review. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review permanently? This cannot be undone.")) {
      return;
    }

    setBusyId(id);

    try {
      await api.delete(`/admin/reviews/${id}`);

      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError("Could not delete review. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  // Helper to format date safely
  const formatDate = (review) => {
    const dateSource = review.createdAt || review.date || review.updatedAt;

    if (!dateSource) return "Recent";

    try {
      return new Date(dateSource).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>NexoraLeads</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          {admin?.email && <span className="admin-email">{admin.email}</span>}
          <button className="logout-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <main className="page-content">
        <div className="dashboard-header">
          <h2>Customer Reviews</h2>
          <div className="filter-tabs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-tab ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-state">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="empty-state">
            <h3>No Reviews Found</h3>
            <p>No customer submissions match this filter status.</p>
          </div>
        ) : (
          <>
            {/* 1. Desktop View */}
            <div className="table-card">
              <ReviewTable
                reviews={reviews}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                busyId={busyId}
              />
            </div>

            {/* 2. Mobile Cards Grid View */}
            <div className="mobile-reviews-grid">
              {reviews.map((review) => {
                const reviewContent = review.comment || review.text || review.review || review.message || "No content provided";
                const reviewerName = review.name || review.username || review.reviewer || "Anonymous";
                
                return (
                  <div key={review._id} className="review-mobile-card">
                    {/* Header: Avatar, Name and Rating */}
                    <div className="mobile-card-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {reviewerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="reviewer-name">{reviewerName}</div>
                          <div className="reviewer-id">#{review._id ? review._id.slice(-4) : "0000"}</div>
                        </div>
                      </div>
                      <div className="rating-stars">
                        {"★".repeat(Number(review.rating) || 5)}
                      </div>
                    </div>

                    {/* Body: Review Text Content */}
                    <div className="mobile-card-body">
                      <div className="review-text" style={{ wordBreak: "break-word" }}>
                        {reviewContent}
                      </div>
                    </div>

                    {/* Meta: Status & Date */}
                    <div className="mobile-card-meta">
                      <div className="date-cell">{formatDate(review)}</div>
                      <span className={`badge ${review.status || "pending"}`}>
                        {review.status || "pending"}
                      </span>
                    </div>

                    {/* Actions Area */}
                    <div className="mobile-card-actions">
                      <button
                        className="action-btn approve"
                        disabled={busyId === review._id || review.status === "approved"}
                        onClick={() => handleApprove(review._id)}
                      >
                        {busyId === review._id ? "..." : "Approve"}
                      </button>
                      <button
                        className="action-btn reject"
                        disabled={busyId === review._id || review.status === "rejected"}
                        onClick={() => handleReject(review._id)}
                      >
                        {busyId === review._id ? "..." : "Reject"}
                      </button>
                      <button
                        className="action-btn delete"
                        disabled={busyId === review._id}
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;