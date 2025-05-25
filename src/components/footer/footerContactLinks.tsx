import { useTranslation } from "react-i18next";
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiClock } from "react-icons/fi";

const FooterContactLinks = () => {
  const { t } = useTranslation();

  return (
    <ul className="space-y-4 text-sm text-gray-800 mb-4">
      <li className="flex items-center gap-2">
        <FiMapPin />
        1789 SE River RD, Hillsboro
      </li>
      <li className="flex items-center gap-2">
        <FiPhone />
        (971) 275-2815
      </li>
      <li className="flex items-center gap-2">
        <FiMail />
        littleeinstein77@yahoo.com
      </li>
      <li className="flex items-center gap-2">
        <FiGlobe />
        <a href="littleeinsteinchildcare.org">littleeinsteinchildcare.org</a>
      </li>
      <li className="flex items-center gap-2">
        <FiClock />
        {t("contact.hoursValue")}
      </li>
    </ul>
  );
};

export default FooterContactLinks;
