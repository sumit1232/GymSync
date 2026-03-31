// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Pricing", path: "/#pricing" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-[#FFFBF1]/80 backdrop-blur-md shadow-sm"
    >
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-[#E36A6A]">
        GymStack
      </Link>

     
      {/* AUTH */}
      <div className="hidden md:flex gap-3">
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

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="hover:text-[#E36A6A]"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="bg-[#E36A6A] text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="border border-[#E36A6A] px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;