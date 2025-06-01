import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import temp from "@/assets/temp1.png";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6 mt-20">
        <h2 className="text-2xl font-semibold inline-block relative">
          {t("homepage.aboutUs")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      {/* Image + Message */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto bg-[#94EE8F] p-6 rounded-4xl border-b-3 border-green-200">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={temp}
            alt="Our Team"
            className="rounded-3xl w-full object-cover max-h-[350px]"
          />
        </div>

        {/* CTA about us button */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h3 className="text-xl font-bold mb-2 text-[#003366]">
            {t("homepage.aboutHead")}
          </h3>
          <p className="text-md mb-4 leading-relaxed">
            {t("homepage.aboutMessage")}
          </p>
          <Link
            to="/about"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block px-6 py-2 text-sm md:text-base font-semibold whitespace-nowrap rounded-2xl shadow-sm bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white hover:shadow-md hover:scale-105 transform transition duration-300"
          >
            {t("homepage.aboutButton")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
