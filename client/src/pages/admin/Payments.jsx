// src/pages/admin/Payments.jsx
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

const Payments = () => {
  // 📊 Chart Data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [15000, 20000, 18000, 25000, 22000],
        backgroundColor: "#E36A6A",
      },
    ],
  };

  const methodData = {
    labels: ["UPI", "Card", "Cash"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

  // 📋 Static Payments
  const payments = [
    { name: "Rahul Sharma", amount: "₹2000", method: "UPI", status: "Paid" },
    { name: "Amit Patil", amount: "₹1500", method: "Cash", status: "Pending" },
    { name: "Sneha Joshi", amount: "₹2500", method: "Card", status: "Paid" },
    { name: "Priya Singh", amount: "₹3000", method: "UPI", status: "Paid" },
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
          Payments Management
        </h1>

        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition">
          + Add Payment
        </button>
      </motion.div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Revenue", value: "₹1.2L" },
          { title: "This Month", value: "₹25K" },
          { title: "Pending", value: "₹5K" },
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

        {/* REVENUE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>
          <Bar data={revenueData} />
        </motion.div>

        {/* PAYMENT METHODS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Payment Methods
          </h2>
          <div className="w-[250px]">
            <Doughnut data={methodData} />
          </div>
        </motion.div>
      </div>

      {/* PAYMENTS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md mt-10 overflow-x-auto"
      >
        <h2 className="text-lg font-semibold mb-4">
          Payment History
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-3">Member</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{pay.name}</td>
                <td className="p-3">{pay.amount}</td>
                <td className="p-3">{pay.method}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      pay.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {pay.status}
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

export default Payments;