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
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Payments = () => {
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState([]);

  const [paymentData, setPaymentData] = useState({
    name: "",
    amount: "",
    method: "",
    status: "",
  });

  // ================= API =================
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/payments");
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch payments");
    }
  };

  const savePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/payments", {
        ...paymentData,
        amount: Number(paymentData.amount),
        createdAt: new Date().toISOString(), // ✅ important
      });

      setPaymentData({ name: "", amount: "", method: "", status: "" });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add payment");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePaymentData = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= CHARTS =================

  // 📊 Monthly Revenue
  const revenueData = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const revenue = Array(12).fill(0);

    payments.forEach((p) => {
      if (p.createdAt && p.status === "Paid") {
        const m = new Date(p.createdAt).getMonth();
        revenue[m] += Number(p.amount);
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Revenue (₹)",
          data: revenue,
          backgroundColor: "#E36A6A",
          borderRadius: 6,
        },
      ],
    };
  }, [payments]);

  // 🍩 Payment Methods
  const methodData = useMemo(() => {
    const methods = { UPI: 0, Card: 0, Cash: 0 };

    payments.forEach((p) => {
      if (methods[p.method] !== undefined) {
        methods[p.method]++;
      }
    });

    return {
      labels: Object.keys(methods),
      datasets: [
        {
          data: Object.values(methods),
          backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
        },
      ],
    };
  }, [payments]);

  // ================= STATS =================

  const totalRevenue = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const thisMonthRevenue = payments
    .filter((p) => {
      if (!p.createdAt) return false;
      const d = new Date(p.createdAt);
      const now = new Date();
      return (
        p.status === "Paid" &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <motion.div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">Payments Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
        >
          + Add Payment
        </button>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Payment</h2>

            <form onSubmit={savePayment} className="flex flex-col gap-3">
              <input
                name="name"
                value={paymentData.name}
                onChange={handlePaymentData}
                placeholder="Member Name"
                className="border p-2 rounded"
                required
              />

              <input
                name="amount"
                type="number"
                value={paymentData.amount}
                onChange={handlePaymentData}
                placeholder="Amount"
                className="border p-2 rounded"
                required
              />

              <select name="method" value={paymentData.method} onChange={handlePaymentData} className="border p-2 rounded" required>
                <option value="">Method</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Cash</option>
              </select>

              <select name="status" value={paymentData.status} onChange={handlePaymentData} className="border p-2 rounded" required>
                <option value="">Status</option>
                <option>Paid</option>
                <option>Pending</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-3 py-1 rounded">
                  Cancel
                </button>
                <button className="bg-[#E36A6A] text-white px-3 py-1 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Card title="Total Revenue" value={`₹${totalRevenue}`} />
        <Card title="This Month" value={`₹${thisMonthRevenue}`} />
        <Card title="Pending" value={`₹${pendingAmount}`} />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-semibold">Monthly Revenue</h2>
          <Bar data={revenueData} />
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="mb-3 font-semibold">Payment Methods</h2>
          <div className="w-[250px]">
            <Doughnut data={methodData} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow mt-10 overflow-x-auto">
        <h2 className="mb-4 font-semibold">Payments</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-2">Name</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{p.name}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-sm ${
                    p.status === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// reusable card
const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold text-[#E36A6A]">{value}</h2>
  </div>
);

export default Payments;