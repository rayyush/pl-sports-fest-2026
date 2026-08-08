import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../index.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      // Save JWT token
      localStorage.setItem("adminToken", data.token);

      // Go to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(error.message || "Unable to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-wrapper">
        {/* Branding */}

        <div className="admin-login-brand">
          <div className="admin-brand-mark">🏆</div>

          <p>PL SPORTS FEST 2026</p>

          <h1>Admin Portal</h1>

          <span>Manage registrations, payments and tournament entries.</span>
        </div>

        {/* Login Card */}

        <div className="admin-login-card">
          <div className="admin-login-card-header">
            <h2>Welcome Back</h2>

            <p>Sign in to access the administration dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {/* Username */}

            <div className="admin-form-group">
              <label htmlFor="admin-username">Username</label>

              <input
                id="admin-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </div>

            {/* Password */}

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>

              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>

            {/* Error */}

            {error && <div className="admin-login-error">{error}</div>}

            {/* Submit */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <div className="admin-login-footer">
            <span>PL Sports Fest 2026</span>

            <span>Authorized Personnel Only</span>
          </div>
        </div>

        {/* Back to website */}

        <button className="admin-back-button" onClick={() => navigate("/")}>
          ← Back to Website
        </button>
      </div>
    </main>
  );
}

export default AdminLogin;
