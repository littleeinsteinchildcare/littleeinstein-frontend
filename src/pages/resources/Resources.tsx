import ChildEnrollmentForms from "@/assets/ChildEnrollmentForm.pdf";
import ChildEnrollmentAuthorization from "@/assets/ChildEnrollmentAuthorization.pdf";

const ResourcesPage = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen p-40 text-3xl">
      <strong> Forms Required by New Parents </strong>
      <div className="flex flex-col pt-10">
        <a
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          href={ChildEnrollmentForms}
          target="_blank"
        >
          Northwest Nutrition Service Child Enrollment Form
        </a>
        <a
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          href={ChildEnrollmentAuthorization}
          target="_blank"
        >
          ODE Child Enrollment Authorization Form
        </a>
        <a
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          href="https://www.fns.usda.gov/wic"
          target="_blank"
        >
          WiC Resources
        </a>
      </div>
    </div>
  );
};

export default ResourcesPage;
