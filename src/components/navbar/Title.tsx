import Logo from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Title = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/"
      className="text-lg md:text-xl font-bold flex items-center space-x-2"
    >
      <img src={Logo} alt="Little Einstein Logo" className="h-20 w-auto" />
      <span>{t("navbar.title")}</span>
    </Link>
  );
};

export default Title;
