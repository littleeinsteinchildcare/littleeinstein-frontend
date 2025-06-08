import { useTranslation } from "react-i18next";

const NWChildEnrollmentForm = () => {
  const { t } = useTranslation();
  const pdfUrl =
    "https://firebasestorage.googleapis.com/v0/b/little-einstein-childcare.firebasestorage.app/o/NWOnlineChildEnrollmentFillable.pdf?alt=media&token=acdd0845-c862-4f03-b6da-5cdee58b8032";

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        {t("resources.NWChildEnrollmentForm")}
      </h1>
      <iframe
        src={pdfUrl}
        width="80%"
        height="600px"
        title="NW Child Enrollment Form"
        className="border rounded shadow"
      />
    </div>
  );
};

export default NWChildEnrollmentForm;
