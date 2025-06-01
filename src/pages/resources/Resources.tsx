import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8 text-3xl">
      <div className="text-center mt-6 mb-14">
        <h2 className="text-3xl font-bold text-black inline-block relative">
          {t("resources.title")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>
      <div className="max-w-5xl mx-auto">
        <strong> {t("resources.header")} </strong>
        <div className="flex flex-col pt-10">
          <Link
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            to="/resources/NWChildEnrollmentForm"
            target="_blank"
          >
            {t("resources.NWChildEnrollmentForm")}
          </Link>

          <Link
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            to="/resources/ODEChildEnrollmentForm"
            target="_blank"
          >
            {t("resources.ODEChildEnrollmentForm")}
          </Link>

          <a
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            href="https://www.fns.usda.gov/wic"
            target="_blank"
          >
            {t("resources.WicResources")}
          </a>

          <a
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            href="https://www.oregon.gov/odhs/children-youth/pages/family-support.aspx"
            target="_blank"
          >
            {t("resources.familySupport")}
          </a>

          <a
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            href="https://nationalpartnership.org/"
            target="_blank"
          >
            {t("resources.nationalPartnership")}
          </a>

          <a
            className="mb-8 hover:text-blue-900 border-b-2 border-black py-4"
            href="https://www.oregon.gov/odhs/providers-partners/foster-care/pages/default.aspx"
            target="_blank"
          >
            {t("resources.parentTraining")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
