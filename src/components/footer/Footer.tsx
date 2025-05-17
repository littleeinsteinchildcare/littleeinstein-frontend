import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FooterAccordion from "./footerDropdown";
import FooterSiteLinks from "./footerSiteLinks";
import FooterConnectLinks from "./footerConnectLinks";
import FooterContactLinks from "./footerContactLinks";
import AnimatedTurle from "./animations/AnimatedTurtle";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Turtle SVG Animation */}
      <AnimatedTurle />
      <footer className="bg-[#94EE8F] border-t-2 mt-20 border-green-200 md:pt-12 pb-4">
        {/* Desktop / non-mobile */}
        <div className="hidden mx-auto px-6 md:grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl">
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {t("footer.thissite")}
            </h4>
            <FooterSiteLinks />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {t("footer.connect")}
            </h4>
            <FooterConnectLinks />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {t("footer.contact")}
            </h4>
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
        <div className="md:border-t md:border-gray-700 pt-4 text-sm text-center text-gray-600">
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
    </div>
  );
};

export default Footer;
