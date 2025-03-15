const ResourcesPage = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen p-40 text-3xl">
      <strong> Forms Required by New Parents </strong>
      <div className="flex flex-col pt-10">
        <a className="mb-8 w-fit" href="/form1">
          Form 1
        </a>
        <a className="mb-8 w-fit" href="/form2">
          Form 2
        </a>
        <a className="mb-8 w-fit" href="/form3">
          Form 3
        </a>
        <a className="mb-8 w-fit" href="/helpful-resources">
          Helpful Resources
        </a>
        <a className="mb-8 w-fit" href="/wic-resources">
          WiC Resources
        </a>
      </div>
    </div>
  );
};

export default ResourcesPage;
