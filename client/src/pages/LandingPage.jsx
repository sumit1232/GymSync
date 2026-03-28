// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="bg-[#FFFBF1] text-gray-800 overflow-x-hidden">

      {/* NAVBAR */}
    <Navbar/>

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Your <span className="text-[#E36A6A]">Dream Gym</span> System
          </h2>

          <p className="mt-4 text-gray-600">
            Manage members, track performance, and grow your gym business with smart tools.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-[#E36A6A] text-white px-6 py-3 rounded-lg hover:scale-105 transition">
              Get Started
            </button>
            <button className="border border-[#E36A6A] px-6 py-3 rounded-lg hover:bg-[#FFB2B2] transition">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.img
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
          alt="gym"
          className="w-[300px] md:w-[450px] rounded-2xl shadow-lg mt-10 md:mt-0"
        />
      </section>

      {/* FEATURES */}
      <section className="bg-[#FFF2D0] py-16 px-6 md:px-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {["Member Management", "Workout Plans", "Analytics"].map((title, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#FFFBF1] p-6 rounded-2xl shadow-md"
            >
              <h4 className="text-xl font-semibold text-[#E36A6A]">{title}</h4>
              <p className="text-gray-600 mt-2">
                Powerful tools to manage your gym efficiently.
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6 md:px-16 text-center">
        <div className="grid md:grid-cols-3 gap-8">

          {[
            { value: "500+", label: "Active Members" },
            { value: "50+", label: "Trainers" },
            { value: "99%", label: "Satisfaction" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <h2 className="text-4xl font-bold text-[#E36A6A]">{item.value}</h2>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E36A6A] text-white py-16 text-center px-6">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Ready to Grow Your Gym?
        </motion.h3>

        <button className="mt-6 bg-white text-[#E36A6A] px-8 py-3 rounded-lg hover:scale-105 transition">
          Start Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500">
        © 2026 GymStack. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;