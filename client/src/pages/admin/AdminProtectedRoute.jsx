import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function AdminProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/admin/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          setAuthenticated(false);
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.error("Admin verification failed:", error);

        localStorage.removeItem("adminToken");
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, []);

  if (checking) {
    return (
      <main className="page">
        <div className="page-header">
          <p>PL SPORTS FEST 2026</p>
          <h1>Checking Access...</h1>
          <span>Please wait.</span>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
