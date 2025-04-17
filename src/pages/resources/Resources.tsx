import { Link } from "react-router-dom";

const ResourcesPage = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen p-40 text-3xl">
      <strong> Forms Required by New Parents </strong>
      <div className="flex flex-col pt-10">
        {/*<a
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          href="/resources/NWChildEnrollementForm"
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
        </a>*/}
        <Link
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          to="/resources/NWChildEnrollmentForm"
          target="_blank"
        >
          Northwest Nutrition Service Child Enrollment Form
        </Link>

        <Link
          className="mb-8 w-fit hover:underline hover:text-blue-900"
          to="/resources/ODEChildEnrollmentForm"
          target="_blank"
        >
          ODE Child Enrollment Authorization Form
        </Link>

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
