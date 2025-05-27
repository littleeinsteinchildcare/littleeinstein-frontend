import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Expect = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6 mt-20">
        <h2 className="text-2xl font-semibold inline-block relative">
          {t("homepage.expect")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      {/* Enroll Steps + Daily Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
        {/* Enrollment Process */}
        <div className="bg-[#94EE8F] rounded-3xl p-6 h-full flex flex-col justify-between border-b-3 border-green-200">
          <div>
            <h3 className="text-xl font-bold text-[#003366] mb-4">
              {t("homepage.enrollHead")}
            </h3>
            <ul className="list-disc list-inside text-xs md:text-sm space-y-2 text-gray-700">
              <li>{t("homepage.step1")}</li>
              <li>{t("homepage.step2")}</li>
              <li>{t("homepage.step3")}</li>
              <li>{t("homepage.step4")}</li>
            </ul>
          </div>

          {/* Button at bottom */}
          <div className="mt-auto pt-6">
            <Link
              to="/contact"
              className="inline-block px-4 py-2 text-sm font-semibold bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md transition"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("homepage.startButton")}
            </Link>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="bg-[#94EE8F] rounded-3xl p-6 h-full flex flex-col justify-between border-b-3 border-green-200">
          <h3 className="text-xl font-bold text-[#003366] mb-4">
            {t("homepage.day2day")}
          </h3>
          <ul className="list-disc list-inside text-xs md:text-sm space-y-2 text-gray-700">
            <li>{t("homepage.hour1")}</li>
            <li>{t("homepage.hour2")}</li>
            <li>{t("homepage.hour3")}</li>
            <li>{t("homepage.hour4")}</li>
            <li>{t("homepage.hour5")}</li>
            <li>{t("homepage.hour6")}</li>
          </ul>
          {/*
          <Link
            to="/schedule"
            className="inline-block mt-6 px-4 py-2 text-sm font-semibold bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md transition self-start"
          >
            {t("homepage.scheduleButton")}
          </Link>
          */}
        </div>
      </div>
    </>
  );
};

export default Expect;
