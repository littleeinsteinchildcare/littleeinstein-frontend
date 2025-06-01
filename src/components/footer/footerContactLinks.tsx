import { useTranslation } from "react-i18next";
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiClock } from "react-icons/fi";

const FooterContactLinks = () => {
  const { t } = useTranslation();

  return (
    <ul className="space-y-4 text-sm text-gray-800 mb-4">
      <li className="flex items-center gap-2">
        <FiMapPin />
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=1789+SE+River+RD,+Hillsboro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          1789 SE River RD, Hillsboro
        </a>
      </li>
      <li className="flex items-center gap-2">
        <FiPhone />
        <a href="tel:+19712752815">(971) 275-2815</a>
      </li>
      <li className="flex items-center gap-2">
        <FiMail />
        <a href="mailto:littleeinstein77@yahoo.com">
          littleeinstein77@yahoo.com
        </a>
      </li>
      <li className="flex items-center gap-2">
        <FiGlobe />
        <a
          href="https://littleeinsteinchildcare.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          littleeinsteinchildcare.org
        </a>
      </li>
      <li className="flex items-center gap-2">
        <FiClock />
        {t("contact.hoursValue")}
      </li>
    </ul>
  );
};

export default FooterContactLinks;
