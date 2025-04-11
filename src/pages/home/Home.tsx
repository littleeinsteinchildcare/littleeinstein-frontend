import outputonlinepngtools from "@/assets/outputonlinepngtools.png";
import { useTranslation } from "react-i18next";

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] min-h-screen max-w-screen p-8 grid grid-flow-col gap-8 overflow-x-hidden">
      {/*Location picture component*/}
      <div className="bg-[#94EE8F] max-h-[452px] w-[756px] p-6 rounded-4xl flex items-center max-w-[756px] col-start-1 col-end-3">
        <div className="p-4">
          <img
            src={outputonlinepngtools}
            alt="Building"
            className="w-[676px] h-[405px] bg-white rounded-4xl"
          />
        </div>
      </div>
      {/*Side text */}
      <div className="pt-37 pb-35">
        <p className="text-black text-3xl font-semibold pb-5">
          {t("homepage.address")}
        </p>
        <p className="text-black text-lg mt-2 pb-5">
          <strong>{t("homepage.hoursLabel")}:</strong>{" "}
          {t("homepage.hoursValue")}
        </p>
        <p className="text-black text-lg mt-1 pb-5">
          <strong>{t("homepage.agesLabel")}:</strong> {t("homepage.agesValue")}
        </p>
      </div>
      {/*slideshow*/}
      <div className="bg-[#94EE8F] min-h-[200px] p-6 rounded-lg col-start-1 col-end-7 items-center justify-center mx-50"></div>
    </div>
  );
};

export default Homepage;
