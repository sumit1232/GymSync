// src/pages/admin/Members.jsx
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

const Members = () => {
   const [showModal, setShowModal] = useState(false);

     // Function to open the modal
  const openForm = () => {
    setShowModal(true); // opens the modal
  };

  // Function to close the modal
  const closeForm = () => {
    setShowModal(false); // closes the modal
  };
  // 📊 Chart Data
  const growthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Members",
        data: [20, 35, 28, 45, 40],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const planData = {
    labels: ["Basic", "Standard", "Premium"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

  // 📋 Static Members
  const members = [
    { name: "Rahul Sharma", email: "rahul@mail.com", plan: "Premium", status: "Active" },
    { name: "Amit Patil", email: "amit@mail.com", plan: "Basic", status: "Inactive" },
    { name: "Sneha Joshi", email: "sneha@mail.com", plan: "Standard", status: "Active" },
    { name: "Priya Singh", email: "priya@mail.com", plan: "Premium", status: "Active" },
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
          Members Management
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition" onClick={()=>openForm()}>
          + Add Member
        </button>
      </motion.div>


      {/* Modal */}
{showModal && (
  <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#E36A6A] mb-6 text-center">
        Add New Member
      </h2>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
        />
        <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition">
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition">
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
            Add Member
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Members", value: "520" },
          { title: "Active", value: "420" },
          { title: "Inactive", value: "100" },
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

        {/* MEMBER GROWTH */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Member Growth
          </h2>
          <Bar data={growthData} />
        </motion.div>

        {/* PLAN DISTRIBUTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Plan Distribution
          </h2>
          <div className="w-[250px]">
            <Doughnut data={planData} />
          </div>
        </motion.div>
      </div>

      {/* MEMBERS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-10 overflow-x-auto"
      >
        <h2 className="text-lg font-semibold mb-4">
          Members List
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.plan}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

    </div>
  );
};

export default Members;