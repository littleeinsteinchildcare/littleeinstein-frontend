import NavItemSet from "./navItemSet";
import LanguageSelector from "./languageSelector";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex md:space-x-4 md:items-center">
      <NavItemSet />
      <LanguageSelector />
    </div>
  );
};

export default DesktopMenu;
