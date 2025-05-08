import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import NavLinkItem from "./navLinkItem";
import LanguageSelector from "./languageSelector";

const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <nav className="bg-[#94EE8F] p-5 shadow-md">
        <div className="mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">
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
            className={`bg-[#94EE8F] absolute p-2 md:p-0 md:static top-28 left-0 w-full md:w-auto flex flex-col md:flex-row items-center md:space-x-4 ${
              menuOpen ? "block" : "hidden md:flex"
            }`}
          >
            <NavLinkItem to="/about" label={t("navbar.about")} />
            <NavLinkItem to="/calendar" label={t("calendar.title")} />
            <NavLinkItem to="/resources" label={t("navbar.resources")} />
            <NavLinkItem to="/contact" label={t("navbar.contact")} />
            {isLoggedIn && (
              <NavLinkItem to="/profile" label={t("navbar.profile")} />
            )}

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
                className="block px-5 md:py-1 mt-2 md:mt-0 font-semibold whitespace-nowrap bg-green-200 text-black rounded-2xl shadow-sm hover:bg-green-100 hover:shadow-md hover:scale-105 transform transition duration-300"
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
