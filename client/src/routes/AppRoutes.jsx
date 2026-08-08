import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Tournament from "../pages/tournament/Tournament";
import TournamentSection from "../pages/tournament/TournamentSection";
import Sport from "../pages/sports/Sport";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProtectedRoute from "../pages/admin/AdminProtectedRoute";

import Payment from "../pages/payment/Payment";

import Registration from "../pages/registration/Registration";
import RegistrationForm from "../pages/registration/RegistrationForm";
import RegistrationSuccess from "../pages/registration/RegistrationSuccess";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Tournament */}
      <Route path="/tournament" element={<Tournament />} />

      {/* Indoor / Outdoor / Field Games */}
      <Route path="/tournament/:type" element={<TournamentSection />} />

      {/* Specific sport */}
      <Route path="/tournament/:type/:sportId" element={<Sport />} />

      {/* Player details form */}
      <Route
        path="/registration/form/:type/:sportId/:categoryId"
        element={<RegistrationForm />}
      />

      {/* Registration summary */}
      <Route path="/registration" element={<Registration />} />

      <Route path="/payment" element={<Payment />} />

      {/* Success */}
      <Route path="/registration/success" element={<RegistrationSuccess />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
