import { useTranslation } from "react-i18next";
import NavLinkItem from "./navLinkItem";

const NavItemSet = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { t } = useTranslation();

  return (
    <>
      <NavLinkItem to="/about" label={t("navbar.about")} />
      <NavLinkItem to="/calendar" label={t("navbar.calendar")} />
      <NavLinkItem to="/resources" label={t("navbar.resources")} />
      <NavLinkItem to="/contact" label={t("navbar.contact")} />

      {isAuthenticated && (
        <NavLinkItem to="/profile" label={t("navbar.profile")} />
      )}

      {/*
      <Link
        to="/signin"
        className="block px-5 py-1 font-semibold whitespace-nowrap bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transform transition duration-300 mt-2 md:mt-0"
      >
        {t("navbar.signin")}
      </Link>
      <LanguageSelector />
        */}
    </>
  );
};

export default NavItemSet;
