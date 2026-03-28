// src/pages/admin/Reports.jsx
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Reports = () => {
  // 📊 Charts Data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue ₹",
        data: [12000, 18000, 15000, 22000, 20000],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const memberGrowth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Members",
        data: [200, 250, 300, 380, 420],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#E36A6A", "#FFF2D0"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Reports & Analytics
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          Export Report
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        {[
          { title: "Total Revenue", value: "₹2.5L" },
          { title: "Total Members", value: "520" },
          { title: "Attendance Rate", value: "75%" },
          { title: "Growth Rate", value: "+12%" },
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

      {/* CHARTS ROW 1 */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* REVENUE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>
          <Bar data={revenueData} />
        </motion.div>

        {/* MEMBER GROWTH */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Member Growth
          </h2>
          <Line data={memberGrowth} />
        </motion.div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* ATTENDANCE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Attendance Overview
          </h2>
          <div className="w-[250px]">
            <Doughnut data={attendanceData} />
          </div>
        </motion.div>

        {/* SUMMARY CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-[#FFF2D0] p-6 rounded-xl shadow-md flex flex-col justify-center"
        >
          <h2 className="text-xl font-semibold text-[#E36A6A]">
            Insights
          </h2>

          <ul className="mt-4 space-y-3 text-gray-700">
            <li>• Revenue increased by 12% this month</li>
            <li>• Premium plan is most profitable</li>
            <li>• Attendance rate stable at 75%</li>
            <li>• Member growth trending upward</li>
          </ul>
        </motion.div>
      </div>

    </div>
  );
};

export default Reports;