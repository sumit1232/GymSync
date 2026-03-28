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

import PageNotFound from "./pages/PageNotFound";
import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="plans" element={<Plans />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* MEMBER */}
        <Route path="/member" element={<MemberLayout />}>
          <Route path="dashboard" element={<MemberDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="workout" element={<Workout />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;