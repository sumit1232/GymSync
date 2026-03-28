// src/pages/admin/Trainers.jsx
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

const Trainers = () => {
  // 📊 Chart Data
  const performanceData = {
    labels: ["Rahul", "Amit", "Sneha", "Priya"],
    datasets: [
      {
        label: "Sessions/Week",
        data: [20, 15, 18, 22],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const specializationData = {
    labels: ["Weight Loss", "Strength", "Yoga", "Cardio"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0", "#FCA5A5"],
      },
    ],
  };

  // 📋 Static Trainers
  const trainers = [
    {
      name: "Rahul Sharma",
      email: "rahul@mail.com",
      specialization: "Strength",
      experience: "5 Years",
    },
    {
      name: "Amit Patil",
      email: "amit@mail.com",
      specialization: "Cardio",
      experience: "3 Years",
    },
    {
      name: "Sneha Joshi",
      email: "sneha@mail.com",
      specialization: "Yoga",
      experience: "4 Years",
    },
    {
      name: "Priya Singh",
      email: "priya@mail.com",
      specialization: "Weight Loss",
      experience: "6 Years",
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
          Trainers Management
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          + Add Trainer
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Trainers", value: "25" },
          { title: "Active", value: "20" },
          { title: "Specializations", value: "8" },
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

        {/* PERFORMANCE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Trainer Performance
          </h2>
          <Bar data={performanceData} />
        </motion.div>

        {/* SPECIALIZATION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Specialization Distribution
          </h2>
          <div className="w-[250px]">
            <Doughnut data={specializationData} />
          </div>
        </motion.div>
      </div>

      {/* TRAINERS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-10 overflow-x-auto"
      >
        <h2 className="text-lg font-semibold mb-4">
          Trainers List
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Experience</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((trainer, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{trainer.name}</td>
                <td className="p-3">{trainer.email}</td>
                <td className="p-3">{trainer.specialization}</td>
                <td className="p-3">{trainer.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

    </div>
  );
};

export default Trainers;