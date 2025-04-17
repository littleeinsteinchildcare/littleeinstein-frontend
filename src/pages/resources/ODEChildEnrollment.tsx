import ChildEnrollmentAuthorization from "@/assets/ChildEnrollmentAuthorization.pdf";

const ODEChildEnrollmentForm = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        Oregon Department of Education Child Enrollment Authorization Form
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
