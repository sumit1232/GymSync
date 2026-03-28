// src/pages/Login.jsx
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF1] px-4">

      {/* CONTAINER */}
      <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

        {/* LEFT SIDE (FORM) */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-[#E36A6A]">
            Welcome Back 👋
          </h2>
          <p className="text-gray-600 mt-2">
            Login to manage your gym
          </p>

          {/* FORM */}
          <form className="mt-6 space-y-4">

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E36A6A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E36A6A]"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-[#E36A6A] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="button"
              className="w-full bg-[#E36A6A] text-white py-2 rounded-lg hover:scale-105 transition"
            >
              Login
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <span className="text-[#E36A6A] font-semibold cursor-pointer">
              Register
            </span>
          </p>
        </motion.div>

        {/* RIGHT SIDE (IMAGE / ILLUSTRATION) */}
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