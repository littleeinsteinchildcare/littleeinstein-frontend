import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AbcIcon from "@/assets/icons/abc-alphabet-basic-svgrepo-com.svg";
import CrayonIcon from "@/assets/icons/crayon-svgrepo-com.svg";
import PlaygroundIcon from "@/assets/icons/playground-svgrepo-com.svg";
import BabyIcon from "@/assets/icons/baby-cartoon-child-svgrepo-com.svg";

const WelcomeSection = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full md:w-1/2">
      {/* Welcome Message */}
      <h1 className="text-2xl text-gray-800 font-semibold mb-2">
        {t("homepage.welcomeh1")}
      </h1>
      <h2 className="text-3xl text-[#003366] font-extrabold mb-4">
        {t("homepage.welcomeh2")}
      </h2>
      <p className="text-gray-700 mb-6">{t("homepage.welcomeMessage")}</p>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center space-x-3">
          <img src={BabyIcon} alt="Baby" className="w-10 h-10" />
          <span className="text-sm text-gray-700">{t("homepage.feat1")}</span>
        </div>
        <div className="flex items-center space-x-3">
          <img src={CrayonIcon} alt="Crayon" className="w-8 h-8" />
          <span className="text-sm text-gray-700">{t("homepage.feat2")}</span>
        </div>
        <div className="flex items-center space-x-3">
          <img src={AbcIcon} alt="ABC" className="w-10 h-10" />
          <span className="text-sm text-gray-700">{t("homepage.feat3")}</span>
        </div>
        <div className="flex items-center space-x-3">
          <img src={PlaygroundIcon} alt="Playground" className="w-8 h-8" />
          <span className="text-sm text-gray-700">{t("homepage.feat4")}</span>
        </div>
      </div>

      {/* CTA enroll button */}
      <Link
        to="/contact"
        className="relative inline-block text-base font-semibold text-[#003366] mt-6 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 210 60"
          className="w-[200px] h-[60px] mt-2 fill-white hover:fill-[#2A9D8F] stroke-[#003366] stroke-[3] transition-transform duration-300 transform group-hover:scale-110"
        >
          <path d="M40 10c-10 0-18 8-18 18 0 1 .1 2 .3 3C14.4 33.3 10 39.2 10 46c0 8 6.5 14 14.5 14h110c11 0 20-9 20-20S145 20 134 20c-1.5 0-2.9.2-4.3.5C126.2 11.2 117 5 106 5c-9.2 0-17.2 5.2-21.2 12.7C79.8 12.2 71.3 10 62 10H40z" />
        </svg>

        <span className="absolute top-[55%] left-[15%] transform pointer-events-none text-sm group-hover:text-white whitespace-nowrap">
          {t("homepage.enroll")}
        </span>
      </Link>
    </div>
  );
};

export default WelcomeSection;
