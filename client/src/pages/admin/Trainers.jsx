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
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Trainers = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainerData, setTrainerData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });
  const [trainers, setTrainers] = useState([]);

  // ================= API =================
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/trainers");
      setTrainers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch trainers");
    }
  };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/trainers", trainerData);
      setTrainerData({ name: "", email: "", specialization: "", experience: "" });
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to add trainer");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FORM =================
  const handleData = (e) => {
    const { name, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= CHARTS =================

  // Trainer Performance (based on experience)
  const performanceData = useMemo(() => {
    if (!trainers.length) return { labels: [], datasets: [] };

    const labels = trainers.map((t) => t.name);

    const data = trainers.map((t) => {
      const exp = parseInt(t.experience);
      return isNaN(exp) ? 0 : exp * 5;
    });

    return {
      labels,
      datasets: [
        {
          label: "Performance Score",
          data,
          backgroundColor: "#E36A6A",
          borderRadius: 6,
        },
      ],
    };
  }, [trainers]);

  // Specialization Distribution
  const specializationData = useMemo(() => {
    if (!trainers.length) return { labels: [], datasets: [] };

    const map = {};

    trainers.forEach((t) => {
      if (!t.specialization) return;
      map[t.specialization] = (map[t.specialization] || 0) + 1;
    });

    return {
      labels: Object.keys(map),
      datasets: [
        {
          data: Object.values(map),
          backgroundColor: [
            "#E36A6A",
            "#FFB2B2",
            "#FFF2D0",
            "#FCA5A5",
            "#F87171",
          ],
        },
      ],
    };
  }, [trainers]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">
          Trainers Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
        >
          + Add Trainer
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Trainer</h2>

            <form onSubmit={saveForm} className="flex flex-col gap-3">
              <input
                name="name"
                value={trainerData.name}
                onChange={handleData}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                name="email"
                value={trainerData.email}
                onChange={handleData}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />

              <select
                name="specialization"
                value={trainerData.specialization}
                onChange={handleData}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Specialization</option>
                <option>Weight Loss</option>
                <option>Strength</option>
                <option>Yoga</option>
                <option>Cardio</option>
              </select>

              <input
                name="experience"
                value={trainerData.experience}
                onChange={handleData}
                placeholder="Experience (e.g., 3)"
                className="border p-2 rounded"
                required
              />

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
        <Card title="Total Trainers" value={trainers.length} />
        <Card title="Specializations" value={new Set(trainers.map(t => t.specialization)).size} />
        <Card title="Avg Experience" value={
          trainers.length
            ? Math.round(
                trainers.reduce((a, b) => a + (parseInt(b.experience) || 0), 0) / trainers.length
              )
            : 0
        } />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="mb-3 font-semibold">Trainer Performance</h2>
          <Bar data={performanceData} options={chartOptions} />
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="mb-3 font-semibold">Specializations</h2>
          <div className="w-[250px]">
            <Doughnut data={specializationData} />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow mt-10 overflow-x-auto">
        <h2 className="mb-4 font-semibold">Trainers</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-[#FFF2D0]">
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
            </tr>
          </thead>

          <tbody>
            {trainers.map((t, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{t.name}</td>
                <td>{t.email}</td>
                <td>{t.specialization}</td>
                <td>{t.experience} Years</td>
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

export default Trainers;