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
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Members = () => {
  const [members, setMembers] = useState([]);
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    plan: "",
    status: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleData = (e) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const saveForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/members", userdata);
      console.log("Member added:", response.data);
      setUserdata({ name: "", email: "", plan: "", status: "" });
      closeForm();
      fetchData(); // refresh member list
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("Failed to fetch members. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = () => setShowModal(true);
  const closeForm = () => setShowModal(false);

  // Chart Data
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

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-[#E36A6A]">Members Management</h1>
        <button
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
          onClick={openForm}
        >
          + Add Member
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
              Add New Member
            </h2>

            <form className="flex flex-col gap-4" onSubmit={saveForm}>
              <input
                type="text"
                name="name"
                value={userdata.name}
                onChange={handleData}
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />
              <input
                type="email"
                name="email"
                value={userdata.email}
                onChange={handleData}
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              />
              <select
                name="plan"
                value={userdata.plan}
                onChange={handleData}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              >
                <option value="">Select Plan</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
              <select
                name="status"
                value={userdata.status}
                onChange={handleData}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
                required
              >
                <option value="">Select Status</option>
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
          { title: "Total Members", value: members.length },
          { title: "Active", value: members.filter(m => m.status === "Active").length },
          { title: "Inactive", value: members.filter(m => m.status === "Inactive").length },
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
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-4">Member Growth</h2>
          <Bar data={growthData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-lg font-semibold mb-4">Plan Distribution</h2>
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
        <h2 className="text-lg font-semibold mb-4">Members List</h2>

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
            {members.map((val, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{val.name}</td>
                <td className="p-3">{val.email}</td>
                <td className="p-3">{val.plan}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${val.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {val.status}
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