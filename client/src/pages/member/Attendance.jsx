// src/pages/member/Attendance.jsx
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

const Attendance = () => {
  // 📊 Attendance Trend
  const trendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Days Attended",
        data: [5, 6, 5, 6],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  // 📊 Summary
  const summaryData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [22, 8],
        backgroundColor: ["#E36A6A", "#FFF2D0"],
      },
    ],
  };

  // 📅 Static Calendar Data
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const presentDays = [1,2,3,5,6,8,10,12,13,15,16,18,20,22,23,25,26,28];

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#E36A6A]"
      >
        Attendance Tracker
      </motion.h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Days", value: "30" },
          { title: "Present", value: "22" },
          { title: "Absent", value: "8" },
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

        {/* TREND */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Weekly Attendance Trend
          </h2>
          <Line data={trendData} />
        </motion.div>

        {/* SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Attendance Summary
          </h2>
          <div className="w-[250px]">
            <Doughnut data={summaryData} />
          </div>
        </motion.div>
      </div>

      {/* CALENDAR */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#FFF2D0] p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold text-[#E36A6A] mb-4">
          Monthly Attendance
        </h2>

        <div className="grid grid-cols-7 gap-3">
          {days.map((day) => {
            const isPresent = presentDays.includes(day);

            return (
              <div
                key={day}
                className={`p-3 text-center rounded-lg font-medium ${
                  isPresent
                    ? "bg-[#E36A6A] text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-[#E36A6A] rounded-full"></span>
            <span>Present</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border rounded-full"></span>
            <span>Absent</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Attendance;