import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useState } from "react";
import axios from "axios"; // ✅ FIX 1

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ FIX 2

  const [formData, setFormData] = useState({
    name: "Rahul Sharma",
    email: "rahul@mail.com",
    phone: "+91 9876543210",
    plan: "Premium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openForm = () => setShowModal(true);
  const closeForm = () => setShowModal(false);

  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [78, 76, 75, 73],
        borderColor: "#E36A6A",
        backgroundColor: "#FFB2B2",
        fill: true,
      },
    ],
  };

  const bodyData = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#E36A6A", "#FFB2B2", "#FFF2D0"],
      },
    ],
  };

  // ✅ FIXED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name & Email required");
      return;
    }

    try {
      setLoading(true);

      // ✅ use PATCH for json-server
      await axios.patch("http://localhost:3000/profile", formData);

      console.log("Updated Profile:", formData);
      alert("Profile updated successfully ✅");

      closeForm();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#E36A6A]"
      >
        My Profile
      </motion.h1>

      {/* PROFILE */}
      <motion.div className="bg-white p-6 rounded-xl shadow-md mt-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
          className="w-28 h-28 rounded-full"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#E36A6A]">
            {formData.name}
          </h2>
          <p className="text-gray-600">{formData.email}</p>
          <p className="text-gray-600">Phone: {formData.phone}</p>
          <p className="text-gray-600">Plan: {formData.plan}</p>
        </div>

        <button
          onClick={openForm}
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 flex justify-center items-center"
          onClick={closeForm}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-xl w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="name" value={formData.name} onChange={handleChange} className="border p-2" />
              <input name="email" value={formData.email} onChange={handleChange} className="border p-2" />
              <input name="phone" value={formData.phone} onChange={handleChange} className="border p-2" />

              <select name="plan" value={formData.plan} onChange={handleChange} className="border p-2">
                <option>Premium</option>
                <option>Basic</option>
                <option>Standard</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#E36A6A] text-white py-2 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Line data={progressData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Doughnut data={bodyData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;