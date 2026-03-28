// src/pages/member/Profile.jsx
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

const Profile = () => {
  // 📊 Progress Data
  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [78, 76, 75, 73],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  // 📊 Body Stats
  const bodyData = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
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
        My Profile
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
          className="w-28 h-28 rounded-full"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#E36A6A]">
            Rahul Sharma
          </h2>
          <p className="text-gray-600">rahul@mail.com</p>
          <p className="text-gray-600">Phone: +91 9876543210</p>
          <p className="text-gray-600">Plan: Premium</p>
        </div>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          Edit Profile
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Height", value: "175 cm" },
          { title: "Weight", value: "73 kg" },
          { title: "BMI", value: "23.8" },
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
            Fitness Progress
          </h2>
          <Line data={progressData} />
        </motion.div>

        {/* BODY STATS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Nutrition Breakdown
          </h2>
          <div className="w-[250px]">
            <Doughnut data={bodyData} />
          </div>
        </motion.div>
      </div>

      {/* GOALS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#FFF2D0] p-6 rounded-xl shadow-md mt-10"
      >
        <h2 className="text-lg font-semibold text-[#E36A6A] mb-4">
          Fitness Goals
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>• Lose 5kg weight</li>
          <li>• Improve stamina</li>
          <li>• Build muscle mass</li>
        </ul>
      </motion.div>

    </div>
  );
};

export default Profile;