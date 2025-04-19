import ChildEnrollmentForm from "@/assets/ChildEnrollmentForm.pdf";
import { useTranslation } from "react-i18next";

const NWChildEnrollmentForm = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        {t("resources.NWChildEnrollmentForm")}
      </h1>
      <iframe
        src={ChildEnrollmentForm}
        width="80%"
        height="600px"
        title="NW Child Enrollment Form"
        className="border rounded shadow"
      />
    </div>
  );
};

export default NWChildEnrollmentForm;
