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
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Payments = () => {
  const [showModal, setShowModal] = useState(false);
  const openForm = () => {
    setShowModal(true);
  }
  const closeForm = () => { setShowModal(false); };
  const [payments, setPayments] = useState([]);
  const [paymentData, setPaymentData] = useState({
    name: "",
    amount: "",
    method: "",
    status: "",
  });

  const handlePaymentData = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const savePayment = async (e) => {
    e.preventDefault();
   try {
      const response = await axios.post("http://localhost:3000/payments", paymentData);
      console.log("Payment added:", response.data);
      closeForm();
      fetchData(); 
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    }
  };

  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payments");
      setPayments(response.data); 
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to fetch payments. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-[#E36A6A]">Payments Management</h1>
        <button className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition" onClick={openForm}>
          + Add Payment
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
        Add New Payment
      </h2>

      <form className="flex flex-col gap-4" onSubmit={savePayment}>
        <input
          type="text"
          name="name"
          value={paymentData.name}
          onChange={handlePaymentData}
          placeholder="Member Name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handlePaymentData}
          placeholder="Amount (₹)"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        />

        <select
          name="method"
          value={paymentData.method}
          onChange={handlePaymentData}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
        </select>

        <select
          name="status"
          value={paymentData.status}
          onChange={handlePaymentData}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
          required
        >
          <option value="">Select Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
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
            Add Payment
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

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
            <p className="text-2xl font-bold text-[#E36A6A] mt-2">{item.value}</p>
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
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <Bar data={revenueData} />
        </motion.div>

        {/* PAYMENT METHODS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
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
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
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