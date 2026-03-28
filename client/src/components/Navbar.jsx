import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#FFFBF1]"
    >
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-[#E36A6A]">
        GymStack
      </Link>

      {/* MENU */}
      <div className="hidden md:flex gap-8 font-medium">
        <a href="#" className="hover:text-[#E36A6A] transition">
          Home
        </a>
        <a href="#features" className="hover:text-[#E36A6A] transition">
          Features
        </a>
        <a href="#pricing" className="hover:text-[#E36A6A] transition">
          Pricing
        </a>
      </div>

      {/* AUTH BUTTONS */}
      <div className="flex gap-3">
        <Link
          to="/login"
          className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="border border-[#E36A6A] px-4 py-2 rounded-lg hover:bg-[#FFB2B2] transition"
        >
          Register
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;