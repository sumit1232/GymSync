// src/pages/Register.jsx
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF1] px-4">

      {/* CONTAINER */}
      <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">

        {/* LEFT SIDE (IMAGE) */}
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

        {/* RIGHT SIDE (FORM) */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-[#E36A6A]">
            Create Account 🚀
          </h2>
          <p className="text-gray-600 mt-2">
            Join and manage your gym efficiently
          </p>

          {/* FORM */}
          <form className="mt-6 space-y-4">

            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E36A6A]"
              />
            </div>

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
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E36A6A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E36A6A]"
              />
            </div>

            <button
              type="button"
              className="w-full bg-[#E36A6A] text-white py-2 rounded-lg hover:scale-105 transition"
            >
              Register
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-[#E36A6A] font-semibold cursor-pointer">
              Login
            </span>
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Register;