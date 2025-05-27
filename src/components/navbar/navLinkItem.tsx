import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavLinkItem = ({ to, label }: { to: string; label: string }) => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const navTextSizeClass = isSpanish ? "text-sm" : "text-base";

  return (
    <Link
      to={to}
      className="relative font-semibold px-2 py-1 group whitespace-nowrap"
    >
      <span className={`relative z-10 ${navTextSizeClass}`}>
        {label}
        <span className="absolute left-1/2 bottom-0 translate-y-2 w-0 h-1 mt-10 bg-green-800 transition-all duration-300 group-hover:w-full group-hover:left-0" />
      </span>
    </Link>
  );
};

export default NavLinkItem;
