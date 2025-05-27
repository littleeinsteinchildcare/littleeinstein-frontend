import { useTranslation } from "react-i18next";
import soniaPic from "@/assets/temp1.png";

const AboutUsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      {/* Sonia picture + bio*/}
      <div className="text-center mt-6 mb-12">
        <h2 className="text-3xl font-bold text-black inline-block relative">
          {t("aboutus.bioTitle")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-22 max-w-5xl mx-auto p-6">
        <img
          src={soniaPic}
          alt="Owner"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full"
        />

        <p className="text-sm md:text-lg text-black font-semibold max-w-5xl md:ml-10 bg-[#94EE8F] rounded-3xl p-8 border-b-3 border-green-200">
          {t("aboutus.bio")
            .split("\n")
            .map((line, id) => (
              <p key={id} className="mb-4">
                {line}
              </p>
            ))}
        </p>
      </div>

      {/* Philosophy */}
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("aboutus.philosophyTitle")}
      </h2>
      <div className="w-48 h-1 bg-green-800 mx-auto mb-6"></div>

      <div className="text-sm md:text-lg mt-8 mx-auto text-left font-semibold text-black max-w-5xl bg-[#94EE8F] rounded-3xl p-8 border-b-3 border-green-200">
        {t("aboutus.philosophy")
          .split("\n")
          .map((line, id) => (
            <p key={id} className="mb-4">
              {line}
            </p>
          ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
