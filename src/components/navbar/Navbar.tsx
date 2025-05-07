import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavItemSet from "./navItemSet";

//import Turtle from './turtle';
import Dog from "./dog";
import Monkey from "./monkey";
import Logo from "@/assets/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] mt-8">
      {/* Turtle SVG Animation */}
      {/*
      <div className="absolute top-[5.5px] left-0 z-50 animate-walk">
        <div className="animate-bob">
          <Turtle />
        </div>
      </div>
      */}

      {/* Dog SVG Animation */}
      <div className="absolute top-[3px] left-0 z-50 animate-walk">
        <div className="animate-bob">
          <Dog />
        </div>
      </div>

      <nav className="bg-[#94EE8F] p-2 shadow-md relative z-50 border-b-2 border-green-200">
        <div className="absolute right-[10px] top-full mt-[58px] z-40">
          <Monkey />
        </div>

        <div className="mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <img
              src={Logo}
              alt="Little Einstein Logo"
              className="h-20 w-auto"
            />
            <span>{t("navbar.title")}</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex md:space-x-4 md:items-center">
            <NavItemSet />
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-black text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          ref={contentRef}
          className={`md:hidden transition-[max-height] duration-500 ease-in-out z-50 relative ${
            menuOpen ? "overflow-visible" : "overflow-hidden"
          }`}
          style={{
            maxHeight: menuOpen
              ? `${contentRef.current?.scrollHeight}px`
              : "0px",
          }}
        >
          <div
            className={`transition-all duration-600 ease-in-out transform ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            } flex flex-col items-center bg-[#94EE8F] py-2`}
          >
            <NavItemSet />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
