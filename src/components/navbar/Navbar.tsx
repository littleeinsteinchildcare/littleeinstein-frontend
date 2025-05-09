import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// auth stuff
import { useMsal } from "@azure/msal-react";

// navbar components
import NavItemSet from "./navItemSet";
import Dog from "./dog";
import Monkey from "./monkey";
import Logo from "@/assets/logo.svg";
import LanguageSelector from "./languageSelector";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleSignOut = () => {
    instance.logoutPopup().catch((error) => {
      console.error("Logout failed: ", error);
    });
  };

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
            <NavItemSet isAuthenticated={isAuthenticated} />

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">
                  {accounts[0]?.name || accounts[0]?.username || "User"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="block px-5 md:py-1 mt-2 md:mt-0 font-semibold whitespace-nowrap bg-green-200 text-black rounded-2xl shadow-sm hover:bg-green-100 hover:shadow-md hover:scale-105 transform transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="block px-5 py-1 font-semibold whitespace-nowrap bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transform transition duration-300 mt-2 md:mt-0"
              >
                {t("navbar.signin")}
              </Link>
            )}

            <LanguageSelector />
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
            <NavItemSet isAuthenticated={isAuthenticated} />

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">
                  {accounts[0]?.name || accounts[0]?.username || "User"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="block px-5 md:py-1 mt-2 md:mt-0 font-semibold whitespace-nowrap bg-green-200 text-black rounded-2xl shadow-sm hover:bg-green-100 hover:shadow-md hover:scale-105 transform transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="block px-5 py-1 font-semibold whitespace-nowrap bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transform transition duration-300 mt-2 md:mt-0"
              >
                {t("navbar.signin")}
              </Link>
            )}

            <LanguageSelector />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
