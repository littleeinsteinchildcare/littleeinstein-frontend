import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterSiteLinks = () => {
  const { t } = useTranslation();

  return (
    <ul className="space-y-4 text-sm text-gray-800">
      <li>
        <Link
          to="/about"
          className="hover:underline"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("footer.about")}
        </Link>
      </li>
      <li>
        <Link
          to="/calendar"
          className="hover:underline"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("footer.calendar")}
        </Link>
      </li>
      <li>
        <Link
          to="/resources"
          className="hover:underline"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("footer.resources")}
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="hover:underline"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("footer.contact")}
        </Link>
      </li>
    </ul>
  );
};

export default FooterSiteLinks;
