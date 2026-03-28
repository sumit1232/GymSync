// src/pages/admin/Plans.jsx
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

const Plans = () => {
  // 📊 Chart Data
  const popularityData = {
    labels: ["Basic", "Standard", "Premium"],
    datasets: [
      {
        label: "Subscribers",
        data: [120, 90, 60],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const revenueShare = {
    labels: ["Basic", "Standard", "Premium"],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

  // 📋 Static Plans
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      duration: "1 Month",
      features: ["Gym Access", "Locker"],
    },
    {
      name: "Standard",
      price: "₹1999",
      duration: "3 Months",
      features: ["Gym Access", "Locker", "Trainer Support"],
    },
    {
      name: "Premium",
      price: "₹4999",
      duration: "6 Months",
      features: [
        "Gym Access",
        "Locker",
        "Personal Trainer",
        "Diet Plan",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Plans Management
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          + Add Plan
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Plans", value: "3" },
          { title: "Active Subscribers", value: "270" },
          { title: "Top Plan", value: "Standard" },
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

        {/* POPULARITY */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Plan Popularity
          </h2>
          <Bar data={popularityData} />
        </motion.div>

        {/* REVENUE SHARE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Revenue Share
          </h2>
          <div className="w-[250px]">
            <Doughnut data={revenueShare} />
          </div>
        </motion.div>
      </div>

      {/* PLANS CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-6 mt-10"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#E36A6A]"
          >
            <h3 className="text-xl font-bold text-[#E36A6A]">
              {plan.name}
            </h3>

            <p className="text-2xl font-bold mt-2">{plan.price}</p>
            <p className="text-gray-600">{plan.duration}</p>

            <ul className="mt-4 space-y-2 text-gray-600">
              {plan.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>

            <button className="mt-6 w-full bg-[#E36A6A] text-white py-2 rounded-lg hover:scale-105 transition">
              Edit Plan
            </button>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default Plans;