// src/pages/admin/Settings.jsx
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Settings = () => {
  // 📊 Usage Chart
  const usageData = {
    labels: ["Storage Used", "Available"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#E36A6A", "#FFF2D0"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#E36A6A]"
      >
        Settings
      </motion.h1>

      {/* SETTINGS GRID */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {/* PROFILE SETTINGS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-[#E36A6A]">
            Profile Settings
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Gym Name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
              Save Changes
            </button>
          </div>
        </motion.div>

        {/* PASSWORD SETTINGS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-[#E36A6A]">
            Change Password
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
              Update Password
            </button>
          </div>
        </motion.div>

      </div>

      {/* SYSTEM SETTINGS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* NOTIFICATIONS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4 text-[#E36A6A]">
            Notifications
          </h2>

          <div className="space-y-4">
            {["Email Alerts", "SMS Notifications", "Push Notifications"].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* USAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4 text-[#E36A6A]">
            System Usage
          </h2>

          <div className="w-[200px]">
            <Doughnut data={usageData} />
          </div>

          <p className="text-gray-600 mt-4">
            65% storage used
          </p>
        </motion.div>

      </div>

      {/* EXTRA SETTINGS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#FFF2D0] p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold text-[#E36A6A] mb-4">
          Preferences
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-[#E36A6A] text-white px-6 py-2 rounded-lg hover:scale-105 transition">
            Enable Dark Mode
          </button>

          <button className="border border-[#E36A6A] px-6 py-2 rounded-lg hover:bg-[#FFB2B2] transition">
            Reset Settings
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default Settings;