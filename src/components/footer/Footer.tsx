import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FooterAccordion from "./footerDropdown";
import FooterSiteLinks from "./footerSiteLinks";
import FooterConnectLinks from "./footerConnectLinks";
import FooterContactLinks from "./footerContactLinks";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#94EE8F] md:pt-12 md:mt-20 pb-4">
      {/* Desktop / non-mobile */}
      <div className="hidden mx-auto px-6 md:grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl">
        {/* This Site */}
        <div>
          <h4 className="text-xl font-semibold mb-4">{t("footer.thissite")}</h4>
          <FooterSiteLinks />
        </div>

        {/* Connect With Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">{t("footer.connect")}</h4>
          <FooterConnectLinks />
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-semibold mb-4">{t("footer.contact")}</h4>
          <FooterContactLinks />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <FooterAccordion title={t("footer.thissite")}>
          <FooterSiteLinks />
        </FooterAccordion>

        <FooterAccordion title={t("footer.connect")}>
          <FooterConnectLinks />
        </FooterAccordion>

        <FooterAccordion title={t("footer.contact")}>
          <FooterContactLinks />
        </FooterAccordion>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-4 text-sm text-center text-gray-600">
        <p>
          © {new Date().getFullYear()} Little Einstein Childcare. All rights
          reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link to="/terms" className="hover:underline">
            {t("footer.terms")}
          </Link>
          <span>|</span>
          <Link to="/privacy" className="hover:underline">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
