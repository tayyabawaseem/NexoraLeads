import React, { useEffect, useState, useCallback } from "react";
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

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = filter !== "all" ? { status: filter } : {};
      const response = await api.get("/admin/reviews", { params });
      setReviews(response.data.data);
    } catch (err) {
      setError("Could not load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (id) => {
    setBusyId(id);
    try {
      await api.put(`/admin/reviews/${id}/approve`);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "approved" } : r))
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
        prev.map((r) => (r._id === id ? { ...r, status: "rejected" } : r))
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

        <div className="table-card">
          {loading ? (
            <div className="loading-state">Loading reviews...</div>
          ) : (
            <ReviewTable
              reviews={reviews}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
              busyId={busyId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
