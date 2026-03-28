import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    // validation
    if (!name || !email || !password || !confirmPassword) {
      return alert("All fields required");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert(res.data.message || "Registered successfully");

      // redirect to login
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF1] px-4">
      <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center justify-center bg-[#FFF2D0] p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
            alt="gym"
            className="rounded-xl shadow-md"
          />
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-[#E36A6A]">
            Create Account 🚀
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E36A6A] text-white py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

        </motion.div>

      </div>
    </div>
  );
};

export default Register;