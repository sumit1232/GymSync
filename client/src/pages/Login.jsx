import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF1] to-[#FFF2D0] px-4">

      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/40">

        {/* LEFT - FORM */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-[#E36A6A]">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Login to manage your fitness journey
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E36A6A] transition"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#E36A6A]" />
                Remember me
              </label>

              <span className="text-[#E36A6A] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E36A6A] hover:bg-[#d85d5d] text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER LINK */}

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#E36A6A] hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>

          </form>
        </motion.div>

        {/* RIGHT - IMAGE + OVERLAY */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex relative items-center justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
            alt="gym"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-[#E36A6A]/60 backdrop-blur-sm" />

          {/* text */}
          <div className="relative text-white text-center px-6">
            <h3 className="text-2xl font-bold">
              Transform Your Body 💪
            </h3>
            <p className="mt-2 text-sm opacity-90">
              Track workouts, monitor progress, and stay consistent.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;