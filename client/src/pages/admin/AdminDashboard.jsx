import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch registrations.");
      }

      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Fetch registrations error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const deleteRegistration = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this registration? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/registrations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete registration.");
      }

      setRegistrations((current) =>
        current.filter((registration) => registration._id !== id),
      );
    } catch (error) {
      console.error("Delete registration error:", error);
      alert(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/registrations/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status.");
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration._id === id
            ? {
                ...registration,
                status: data.registration.status,
              }
            : registration,
        ),
      );
    } catch (error) {
      console.error("Update status error:", error);
      alert(error.message);
    }
  };

  const pendingCount = registrations.filter(
    (registration) => registration.status === "pending",
  ).length;

  const verifiedCount = registrations.filter(
    (registration) => registration.status === "verified",
  ).length;

  const rejectedCount = registrations.filter(
    (registration) => registration.status === "rejected",
  ).length;

  const totalAmount = registrations.reduce(
    (total, registration) => total + Number(registration.fee || 0),
    0,
  );

  if (loading) {
    return (
      <main className="page">
        <div className="page-header">
          <p>PL SPORTS FEST 2026</p>
          <h1>Admin Dashboard</h1>
          <span>Loading registrations...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="page admin-page">
      <div className="page-header">
        <p>PL SPORTS FEST 2026</p>

        <h1>Admin Dashboard</h1>

        <span>Manage registrations and verify payment submissions.</span>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {/* STATS */}

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Registrations</span>
          <strong>{registrations.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Verified</span>
          <strong>{verifiedCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Rejected</span>
          <strong>{rejectedCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Amount</span>
          <strong>₹{totalAmount}</strong>
        </div>
      </div>

      {/* HEADER */}

      <div className="admin-list-header">
        <div>
          <h2>Registrations</h2>
          <p>Review submitted registrations and payment screenshots.</p>
        </div>

        <button className="add-more-button" onClick={fetchRegistrations}>
          ↻ Refresh
        </button>
      </div>

      {/* REGISTRATIONS */}

      {registrations.length === 0 ? (
        <div className="empty-registration">
          <div className="empty-registration-icon">📋</div>

          <h2>No Registrations Yet</h2>

          <p>Submitted registrations will appear here.</p>
        </div>
      ) : (
        <div className="admin-registration-list">
          {registrations.map((registration) => (
            <div className="admin-registration-card" key={registration._id}>
              {/* TOP */}

              <div className="admin-registration-top">
                <div>
                  <span className="admin-registration-type">
                    {registration.type}
                  </span>

                  <h2>{registration.sportName}</h2>

                  <p>{registration.categoryName}</p>
                </div>

                <div className={`status-badge ${registration.status}`}>
                  {registration.status}
                </div>
              </div>

              {/* DETAILS */}

              <div className="admin-registration-details">
                <div>
                  <span>Players</span>
                  <strong>{registration.players}</strong>
                </div>

                <div>
                  <span>Age Group</span>
                  <strong>{registration.ageGroup}</strong>
                </div>

                <div>
                  <span>Format</span>
                  <strong>{registration.format}</strong>
                </div>

                <div>
                  <span>Amount</span>
                  <strong>₹{registration.fee}</strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>
                    {new Date(registration.createdAt).toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* PLAYERS */}

              <div className="admin-players">
                <h3>Player Details</h3>

                {registration.playerDetails?.map((player, index) => (
                  <div className="admin-player" key={index}>
                    <strong>Player {index + 1}</strong>

                    <div>
                      <span>Name</span>
                      <p>{player.name}</p>
                    </div>

                    <div>
                      <span>WhatsApp</span>
                      <p>{player.mobile}</p>
                    </div>

                    <div>
                      <span>Flat</span>
                      <p>{player.flatNo}</p>
                    </div>

                    <div>
                      <span>Age</span>
                      <p>{player.age}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAYMENT */}

              <div className="admin-payment">
                <div>
                  <h3>Payment Screenshot</h3>

                  {registration.paymentScreenshot ? (
                    <button
                      className="view-screenshot-button"
                      onClick={() =>
                        setSelectedScreenshot(registration.paymentScreenshot)
                      }
                    >
                      View Screenshot
                    </button>
                  ) : (
                    <span>Screenshot unavailable</span>
                  )}
                </div>

                <strong>₹{registration.totalAmount}</strong>
              </div>

              {/* ACTIONS */}

              <div className="admin-actions">
                {/* Verify + Reject only available while pending */}
                {registration.status === "pending" && (
                  <>
                    <button
                      className="admin-verify-button"
                      onClick={() => updateStatus(registration._id, "verified")}
                    >
                      ✓ Verify Payment
                    </button>

                    <button
                      className="admin-reject-button"
                      onClick={() => updateStatus(registration._id, "rejected")}
                    >
                      ✕ Reject Payment
                    </button>
                  </>
                )}

                <button
                  className="admin-delete-button"
                  onClick={() => deleteRegistration(registration._id)}
                >
                  🗑 Delete Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedScreenshot && (
        <div
          className="screenshot-modal-overlay"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div
            className="screenshot-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="screenshot-modal-header">
              <h2>Payment Screenshot</h2>

              <button
                className="screenshot-close-button"
                onClick={() => setSelectedScreenshot(null)}
              >
                ✕
              </button>
            </div>

            <div className="screenshot-modal-body">
              <img
                src={`${API_URL}/uploads/${selectedScreenshot}`}
                alt="Payment screenshot"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
