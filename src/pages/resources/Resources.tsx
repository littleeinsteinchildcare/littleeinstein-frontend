import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8 text-3xl">
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("resources.title")}
      </h2>
      <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
      <strong> {t("resources.header")} </strong>
      <div className="flex flex-col pt-10">
        <Link
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          to="/resources/NWChildEnrollmentForm"
          target="_blank"
        >
          {t("resources.NWChildEnrollmentForm")}
        </Link>

        <Link
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          to="/resources/ODEChildEnrollmentForm"
          target="_blank"
        >
          {t("resources.ODEChildEnrollmentForm")}
        </Link>

        <a
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          href="https://www.fns.usda.gov/wic"
          target="_blank"
        >
          {t("resources.WicResources")}
        </a>
      </div>
    </div>
  );
};

export default ResourcesPage;
