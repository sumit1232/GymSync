import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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

    const { email, password } = form;

    // validation
    if (!email || !password) {
      return alert("Email and password required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // store token
      localStorage.setItem("token", res.data.token);

      alert(res.data.message || "Login successful");

      // redirect
      navigate("/member/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF1] px-4">
      <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-[#E36A6A]">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E36A6A]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E36A6A] text-white py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center justify-center bg-[#FFF2D0] p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            alt="gym"
            className="rounded-xl shadow-md"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Login;