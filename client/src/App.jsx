import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import Trainers from "./pages/admin/Trainers";
import Payments from "./pages/admin/Payments";
import Plans from "./pages/admin/Plans";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Member Pages
import MemberDashboard from "./pages/member/Dashboard";
import Profile from "./pages/member/Profile";
import Workout from "./pages/member/Workout";
import Attendance from "./pages/member/Attendance";

// Protected Route
import ProtectedRoute from "./pages/routes/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute role="admin">
              <Members />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/trainers"
          element={
            <ProtectedRoute role="admin">
              <Trainers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute role="admin">
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute role="admin">
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* MEMBER ROUTES */}
        <Route
          path="/member/dashboard"
          element={
            <ProtectedRoute role="member">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/profile"
          element={
            <ProtectedRoute role="member">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/workout"
          element={
            <ProtectedRoute role="member">
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/attendance"
          element={
            <ProtectedRoute role="member">
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* 404 FALLBACK */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;