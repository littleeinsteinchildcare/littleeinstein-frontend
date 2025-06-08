import { useTranslation } from "react-i18next";

const ODEChildEnrollmentForm = () => {
  const { t } = useTranslation();

  const pdfUrl =
    "https://firebasestorage.googleapis.com/v0/b/little-einstein-childcare.firebasestorage.app/o/ChildEnrollmentAuthorizationFillable.pdf?alt=media&token=b41da4b3-b2ae-48e1-8778-09dc372ec12c";
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        {t("resources.ODEChildEnrollmentForm")}
      </h1>
      <iframe
        src={pdfUrl}
        width="80%"
        height="600px"
        title="ODE Child Enrollment Authorization Form"
        className="border rounded shadow"
      />
    </div>
  );
};

export default ODEChildEnrollmentForm;
