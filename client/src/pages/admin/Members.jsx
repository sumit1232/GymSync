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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Members = () => {
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

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          + Add Member
        </button>
      </motion.div>

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