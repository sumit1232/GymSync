// src/pages/member/Dashboard.jsx
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const MemberDashboard = () => {
  // 📊 Progress Chart
  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight Progress (kg)",
        data: [78, 76, 75, 73],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  // 📊 Attendance Chart
  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [22, 8],
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
        Member Dashboard
      </motion.h1>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-6 flex flex-col md:flex-row items-center gap-6"
      >
        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
          className="w-24 h-24 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold text-[#E36A6A]">
            Rahul Sharma
          </h2>
          <p className="text-gray-600">Premium Plan</p>
          <p className="text-gray-600">Trainer: Amit Patil</p>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Days Attended", value: "22" },
          { title: "Calories Burn", value: "12,500" },
          { title: "Workout Hours", value: "40h" },
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

        {/* PROGRESS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Progress Tracking
          </h2>
          <Line data={progressData} />
        </motion.div>

        {/* ATTENDANCE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
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
      </div>

      {/* WORKOUT PLAN */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#FFF2D0] p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold text-[#E36A6A] mb-4">
          Today’s Workout Plan
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>• Warm-up (10 mins cardio)</li>
          <li>• Chest Press - 3 sets</li>
          <li>• Push-ups - 20 reps</li>
          <li>• Treadmill - 15 mins</li>
        </ul>
      </motion.div>

    </div>
  );
};

export default MemberDashboard;