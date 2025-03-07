import { useState } from "react";

// Navbar Component
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#94EE8F] p-4 flex justify-between items-center relative">
      {/* Website Title */}
      <h1 className="text-2xl md:text-6xl font-bold text-black px-6 py-2">
        Little Einstein Childcare
      </h1>

      {/* Hamburger Menu Button for Small Screens */}
      <button
        className="md:hidden text-2xl px-4"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className="hidden md:flex space-x-12 gap-10 font-bold text-2xl px-10 mt-6">
        <a href="#" className="hover:underline">
          About us
        </a>
        <a href="#" className="hover:underline">
          Calendar
        </a>
        <a href="#" className="hover:underline">
          Staff
        </a>
        <a href="#" className="hover:underline">
          Resources
        </a>
        <a href="#" className="hover:underline">
          Sign in
        </a>
      </nav>

      {/* Dropdown menu for small */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#94EE8F] flex flex-col items-start gap-4 text-lg px-9 py-2 shadow-lg md:hidden font-bold">
          <a href="#" className="hover:underline">
            About us
          </a>
          <a href="#" className="hover:underline">
            Calendar
          </a>
          <a href="#" className="hover:underline">
            Staff
          </a>
          <a href="#" className="hover:underline">
            Resources
          </a>
          <a href="#" className="hover:underline">
            Sign in
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
