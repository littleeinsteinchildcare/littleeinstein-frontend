import { useTranslation } from "react-i18next";
import NavLinkItem from "./navLinkItem";
import UserSection from "./userSection";
const NavItemSet = () => {
  const { t } = useTranslation();
  return (
    <>
      <NavLinkItem to="/about" label={t("navbar.about")} />
      <NavLinkItem to="/calendar" label={t("navbar.calendar")} />
      <NavLinkItem to="/resources" label={t("navbar.resources")} />
      <NavLinkItem to="/contact" label={t("navbar.contact")} />
      <UserSection />
    </>
  );
};
export default NavItemSet;
