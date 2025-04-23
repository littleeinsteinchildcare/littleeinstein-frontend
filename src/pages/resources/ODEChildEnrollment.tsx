import ChildEnrollmentAuthorization from "@/assets/ChildEnrollmentAuthorization.pdf";
import { useTranslation } from "react-i18next";

const ODEChildEnrollmentForm = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        {t("resources.ODEChildEnrollmentForm")}
      </h1>
      <iframe
        src={ChildEnrollmentAuthorization}
        width="80%"
        height="600px"
        title="ODE Child Enrollment Authorization Form"
        className="border rounded shadow"
      />
    </div>
  );
};

export default ODEChildEnrollmentForm;
