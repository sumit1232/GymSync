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

const Trainers = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainerData, setTrainerData] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });
  const [trainers, setTrainers] = useState([]);

  const openForm = () => setShowModal(true);
  const closeForm = () => {
    setTrainerData({ name: "", email: "", specialization: "", experience: "" });
    setShowModal(false);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [name]: value }));
  };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/trainers", trainerData);
      console.log("Trainer added:", response.data);
      closeForm();
      fetchData(); // refresh list
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("Failed to add trainer. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/trainers");
      setTrainers(response.data); // <-- store in trainers array
    } catch (error) {
      console.error("Error fetching trainers:", error);
      alert("Failed to fetch trainers. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const performanceData = {
    labels: ["Rahul", "Amit", "Sneha", "Priya"],
    datasets: [{ label: "Sessions/Week", data: [20, 15, 18, 22], backgroundColor: "#E36A6A" }],
  };

  const specializationData = {
    labels: ["Weight Loss", "Strength", "Yoga", "Cardio"],
    datasets: [{ data: [30, 25, 20, 25], backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0", "#FCA5A5"] }],
  };

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">
      {/* HEADER */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#E36A6A]">Trainers Management</h1>
        <button
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          onClick={openForm}
        >
          + Add Trainer
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
            <h2 className="text-2xl font-bold text-[#E36A6A] mb-6 text-center">Add New Trainer</h2>
            <form className="flex flex-col gap-4" onSubmit={saveForm}>
              <input
                type="text"
                name="name"
                value={trainerData.name}
                onChange={handleData}
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />
              <input
                type="email"
                name="email"
                value={trainerData.email}
                onChange={handleData}
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />
              <select
                name="specialization"
                value={trainerData.specialization}
                onChange={handleData}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              >
                <option value="">Select Specialization</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Strength">Strength</option>
                <option value="Yoga">Yoga</option>
                <option value="Cardio">Cardio</option>
              </select>
              <input
                type="text"
                name="experience"
                value={trainerData.experience}
                onChange={handleData}
                placeholder="Experience (e.g., 3 Years)"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeForm} className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-[#E36A6A] hover:bg-[#d85d5d] text-white transition font-medium">
                  Add Trainer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Trainers", value: trainers.length },
          { title: "Active", value: "20" },
          { title: "Specializations", value: "8" },
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-600">{item.title}</h3>
            <p className="text-2xl font-bold text-[#E36A6A] mt-2">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Trainer Performance</h2>
          <Bar data={performanceData} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Specialization Distribution</h2>
          <div className="w-[250px]">
            <Doughnut data={specializationData} />
          </div>
        </motion.div>
      </div>

      {/* TRAINERS TABLE */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-md mt-10 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Trainers List</h2>
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
                <td className="p-3">{trainer.experience} Years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Trainers;