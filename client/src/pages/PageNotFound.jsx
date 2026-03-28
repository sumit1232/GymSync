// src/pages/PageNotFound.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PageNotFound = () => {
  // 📊 Fun Chart (Error Ratio)
  const errorData = {
    labels: ["Found", "Not Found"],
    datasets: [
      {
        data: [10, 90],
        backgroundColor: ["#FFF2D0", "#E36A6A"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF1] px-6 text-center">

      {/* 404 TEXT */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-7xl md:text-9xl font-bold text-[#E36A6A]"
      >
        404
      </motion.h1>

      {/* MESSAGE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-lg text-gray-600"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* CHART VISUAL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-[200px] mt-8"
      >
        <Doughnut data={errorData} />
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 mt-8"
      >
        <Link
          to="/"
          className="bg-[#E36A6A] text-white px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Go Home
        </Link>

        <Link
          to="/login"
          className="border border-[#E36A6A] px-6 py-2 rounded-lg hover:bg-[#FFB2B2] transition"
        >
          Login
        </Link>
      </motion.div>

    </div>
  );
};

export default PageNotFound;