import { useState, useRef, useEffect } from "react";
import AnimatedDog from "./animations/animatedDog";
import AnimatedMonkey from "./animations/AnimatedMonkey";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Title from "./Title";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // ref to track menu area

  // Close on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="bg-[#FFFBCF] mt-8">
      {/* Dog SVG Animation */}
      <AnimatedDog />

      <nav
        ref={menuRef}
        className="bg-[#94EE8F] p-2 shadow-md relative z-50 border-b-2 border-green-200"
      >
        {/* Monkey SVG Animation */}
        <AnimatedMonkey />
        <div className="mx-auto flex justify-between items-center">
          <Title />
          {/* Desktop menu */}
          <DesktopMenu />

          {/* Hamburger Button */}
          <button
            className="md:hidden text-black text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        <MobileMenu menuOpen={menuOpen} />
      </nav>
    </div>
  );
};

export default Navbar;
