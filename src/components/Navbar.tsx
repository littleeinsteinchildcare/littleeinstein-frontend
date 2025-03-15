import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#FFFBCF] mt-8">
      <nav className="bg-[#94EE8F] p-5 shadow-md">
        <div className="mx-auto flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold">
            Little Einstein Childcare
          </Link>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-black text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div
            className={`bg-[#94EE8F] absolute p-2 md:p-0 md:static top-28 left-0 w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-10 ${
              menuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <Link
              to="/about"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              About us
            </Link>
            <Link
              to="/calendar"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              Calendar
            </Link>
            <Link
              to="/resources"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              Resources
            </Link>
            <Link
              to="/signin"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
