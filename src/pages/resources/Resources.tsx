import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FileText, ExternalLink } from "lucide-react";

const Badge = ({ type }: { type: "form" | "link" }) => {
  const label = type === "form" ? "Form" : "Link";
  const color =
    type === "form"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${color} uppercase tracking-wide`}
    >
      {label}
    </span>
  );
};

const ResourcesPage = () => {
  const { t } = useTranslation();

  const internalResources = [
    {
      label: t("resources.NWChildEnrollmentForm"),
      to: "/resources/NWChildEnrollmentForm",
    },
    {
      label: t("resources.ODEChildEnrollmentForm"),
      to: "/resources/ODEChildEnrollmentForm",
    },
  ];

  const externalResources = [
    {
      label: t("resources.WicResources"),
      href: "https://www.fns.usda.gov/wic",
    },
    {
      label: t("resources.familySupport"),
      href: "https://www.oregon.gov/odhs/children-youth/pages/family-support.aspx",
    },
    {
      label: t("resources.nationalPartnership"),
      href: "https://nationalpartnership.org/",
    },
    {
      label: t("resources.parentTraining"),
      href: "https://www.oregon.gov/odhs/providers-partners/foster-care/pages/default.aspx",
    },
  ];

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-6 md:p-10">
      <div className="text-center mt-6 mb-12">
        <h2 className="text-3xl font-bold text-black inline-block relative">
          {t("resources.title")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
        <p className="text-lg mt-4 text-gray-700">{t("resources.header")}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {internalResources.map(({ label, to }, idx) => (
          <Link
            key={idx}
            to={to}
            target="_blank"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="flex-shrink-0">
              <FileText className="text-green-700 w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xl text-black font-medium block">
                {label}
              </span>
              <Badge type="form" />
            </div>
          </Link>
        ))}

        {externalResources.map(({ label, href }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className="flex-shrink-0">
              <ExternalLink className="text-green-700 w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xl text-black font-medium block">
                {label}
              </span>
              <Badge type="link" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
