// src/pages/admin/Dashboard.jsx
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // 📊 Static Chart Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 22000, 18000],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const doughnutData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#E36A6A", "#FFB2B2"],
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
        Admin Dashboard
      </motion.h1>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        {[
          { title: "Members", value: "520+" },
          { title: "Trainers", value: "25" },
          { title: "Revenue", value: "₹1.2L" },
          { title: "Active Plans", value: "12" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-gray-600">{item.title}</h3>
            <p className="text-2xl font-bold text-[#E36A6A] mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* BAR CHART */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>
          <Bar data={barData} />
        </motion.div>

        {/* DOUGHNUT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Member Status
          </h2>
          <div className="w-[250px]">
            <Doughnut data={doughnutData} />
          </div>
        </motion.div>
      </div>

      {/* RECENT ACTIVITY */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          {[
            "New member joined",
            "Payment received ₹2000",
            "Trainer added",
            "Plan updated",
          ].map((item, i) => (
            <li
              key={i}
              className="p-3 bg-[#FFF2D0] rounded-lg text-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;