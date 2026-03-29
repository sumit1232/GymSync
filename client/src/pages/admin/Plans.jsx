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
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Plans = () => {

  const [showModal, setShowModal] = useState(false);

const [plans, setPlans] = useState([]);
const [formData, setFormData] = useState({
  name: "",
  price: "",
  duration: "",
  features: "",
  status: "Active",
});

        // Function to open the modal
    const openForm = () => {
      setShowModal(true); // opens the modal
    };
  
    // Function to close the modal
    const closeForm = () => {
      setShowModal(false); // closes the modal
    };


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
  // const plans = [
  //   {
  //     name: "Basic",
  //     price: "₹999",
  //     duration: "1 Month",
  //     features: ["Gym Access", "Locker"],
  //   },
  //   {
  //     name: "Standard",
  //     price: "₹1999",
  //     duration: "3 Months",
  //     features: ["Gym Access", "Locker", "Trainer Support"],
  //   },
  //   {
  //     name: "Premium",
  //     price: "₹4999",
  //     duration: "6 Months",
  //     features: [
  //       "Gym Access",
  //       "Locker",
  //       "Personal Trainer",
  //       "Diet Plan",
  //     ],
  //   },
  // ];

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

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition" onClick={()=>openForm()}>
          + Add Plan
        </button>
      </motion.div>

{/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#E36A6A] mb-6 text-center">
        Add New Plan
      </h2>

      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("/api/plans", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            const newPlan = await res.json();
            setPlans([newPlan, ...plans]); // update plans state
            setShowModal(false);
            setFormData({ name: "", price: "", duration: "", features: "", status: "Active" });
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <input
          type="text"
          placeholder="Plan Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <input
          type="text"
          placeholder="Duration (e.g., 1 Month)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <textarea
          placeholder="Features (comma separated)"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={closeForm}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#E36A6A] hover:bg-[#d85d5d] text-white transition font-medium"
          >
            Add Plan
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

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