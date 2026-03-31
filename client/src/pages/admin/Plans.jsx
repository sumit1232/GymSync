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
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

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

  // ================= API =================
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/plans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch plans");
    }
  };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/plans", formData);
      setFormData({
        name: "",
        price: "",
        duration: "",
        features: "",
        status: "Active",
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add plan");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLERS =================
  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= CHART LOGIC =================

  // Plan Popularity (count plans by name)
  const popularityData = useMemo(() => {
    if (!plans.length) return { labels: [], datasets: [] };

    const count = {};

    plans.forEach((p) => {
      count[p.name] = (count[p.name] || 0) + 1;
    });

    return {
      labels: Object.keys(count),
      datasets: [
        {
          label: "Subscribers",
          data: Object.values(count),
          backgroundColor: "#E36A6A",
          borderRadius: 6,
        },
      ],
    };
  }, [plans]);

  // Revenue Share (based on price)
  const revenueShare = useMemo(() => {
    if (!plans.length) return { labels: [], datasets: [] };

    const revenueMap = {};

    plans.forEach((p) => {
      const price = parseInt(p.price) || 0;
      revenueMap[p.name] = (revenueMap[p.name] || 0) + price;
    });

    return {
      labels: Object.keys(revenueMap),
      datasets: [
        {
          data: Object.values(revenueMap),
          backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
        },
      ],
    };
  }, [plans]);

  // ================= STATS =================
  const totalPlans = plans.length;

  const activePlans = plans.filter((p) => p.status === "Active").length;

  const topPlan = useMemo(() => {
    if (!plans.length) return "-";

    const count = {};
    plans.forEach((p) => {
      count[p.name] = (count[p.name] || 0) + 1;
    });

    return Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );
  }, [plans]);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Plans Management
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
        >
          + Add Plan
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">Add Plan</h2>

            <form onSubmit={saveForm} className="flex flex-col gap-3">

              <input
                name="name"
                value={formData.name}
                onChange={handleData}
                placeholder="Plan Name"
                className="border p-2 rounded"
                required
              />

              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleData}
                placeholder="Price"
                className="border p-2 rounded"
                required
              />

              <input
                name="duration"
                value={formData.duration}
                onChange={handleData}
                placeholder="Duration"
                className="border p-2 rounded"
                required
              />

              <textarea
                name="features"
                value={formData.features}
                onChange={handleData}
                placeholder="Features (comma separated)"
                className="border p-2 rounded"
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleData}
                className="border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
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
        <Card title="Total Plans" value={totalPlans} />
        <Card title="Active Plans" value={activePlans} />
        <Card title="Top Plan" value={topPlan} />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-semibold">Plan Popularity</h2>
          <Bar data={popularityData} />
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="mb-3 font-semibold">Revenue Share</h2>
          <div className="w-[250px]">
            <Doughnut data={revenueShare} />
          </div>
        </div>

      </div>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {plans.map((plan, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-bold text-[#E36A6A]">
              {plan.name}
            </h3>

            <p className="text-2xl font-bold mt-2">₹{plan.price}</p>
            <p className="text-gray-500">{plan.duration}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {(Array.isArray(plan.features)
                ? plan.features
                : plan.features?.split(",")
              )?.map((f, idx) => (
                <span key={idx} className="text-xs bg-[#FFF2D0] px-2 py-1 rounded">
                  {f}
                </span>
              ))}
            </div>

          </div>
        ))}
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

export default Plans;