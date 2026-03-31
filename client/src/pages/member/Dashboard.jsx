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
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [member, setMember] = useState(null);
  const [progress, setProgress] = useState([]);
  const [attendance, setAttendance] = useState({ present: 0, absent: 0 });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data
  const fetchData = async () => {
    try {
      const [memberRes, progressRes, attendanceRes] = await Promise.all([
        axios.get("http://localhost:3000/profile"),
        axios.get("http://localhost:3000/progress"),
        axios.get("http://localhost:3000/attendance"),
      ]);

      setMember(memberRes.data);
      setProgress(progressRes.data);

      setAttendance({
        present: attendanceRes.data.present.value,
        absent: attendanceRes.data.absent.value,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  // 📊 Progress Chart
  const progressData = {
    labels: progress.map((p) => p.week),
    datasets: [
      {
        label: "Weight Progress (kg)",
        data: progress.map((p) => p.weight),
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
        data: [attendance.present, attendance.absent],
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

      {/* PROFILE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-6 flex flex-col md:flex-row items-center gap-6"
      >
        <img
          src={member?.avatar || "https://i.pravatar.cc/150"}
          alt="profile"
          className="w-24 h-24 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold text-[#E36A6A]">
            {member?.name}
          </h2>
          <p className="text-gray-600">{member?.plan}</p>
          <p className="text-gray-600">Trainer: {member?.trainer}</p>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Days Attended", value: attendance.present },
          { title: "Calories Burn", value: member?.calories || "0" },
          { title: "Workout Hours", value: member?.hours || "0h" },
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
          {member?.workout?.map((w, i) => (
            <li key={i}>• {w}</li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
};

export default MemberDashboard;