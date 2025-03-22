import outputonlinepngtools from "@/assets/outputonlinepngtools.png";

const Homepage = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen max-w-screen p-8 grid grid-flow-col gap-8 overflow-x-hidden">
      {/*Location picture component*/}
      <div className="bg-[#94EE8F] max-h-[452px] w-[756px] p-6 rounded-4xl flex items-center max-w-[756px] col-start-1 col-end-3">
        <div className="p-4">
          <img
            src={outputonlinepngtools}
            alt="Building"
            className="w-[676px] h-[405px] bg-white rounded-4xl"
          />
        </div>
      </div>
      {/*Side text */}
      <div className="pt-37 pb-35">
        <p className="text-black text-3xl font-semibold pb-5">
          1789 SE River RD Hillsboro OR 97123
        </p>
        <p className="text-black text-lg mt-2 pb-5">
          <strong>Hours:</strong> 7am - 5:30 pm
        </p>
        <p className="text-black text-lg mt-1 pb-5">
          <strong>Ages:</strong> 2 months to 4 years
        </p>
      </div>
      {/*slideshow*/}
      <div className="bg-[#94EE8F] min-h-[200px] p-6 rounded-lg col-start-1 col-end-7 items-center justify-center mx-50"></div>
    </div>
  );
};

export default Homepage;
