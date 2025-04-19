import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    // We can add more languages later on
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <div className="bg-[#FFFBCF] mt-8">
      <nav className="bg-[#94EE8F] p-5 shadow-md">
        <div className="mx-auto flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold">
            {t("navbar.title")}
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
              className="block p-2 md:py-0 hover:underline font-semibold whitespace-nowrap"
            >
              {t("navbar.about")}
            </Link>
            <Link
              to="/calendar"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              {t("navbar.calendar")}
            </Link>
            <Link
              to="/resources"
              className="block p-2 md:py-0 hover:underline font-semibold"
            >
              {t("navbar.resources")}
            </Link>
            <Link
              to="/signin"
              className="block p-2 md:py-0 hover:underline font-semibold whitespace-nowrap"
            >
              {t("navbar.signin")}
            </Link>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="block p-2 md:py-0 hover:underline font-semibold whitespace-nowrap"
              >
                {t("navbar.selectLanguage")} ↓
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        i18n.language === lang.code ? "font-bold" : ""
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
