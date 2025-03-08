import outputonlinepngtools from "../assets/outputonlinepngtools.png";

const Homepage = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8 flex flex-col gap-8">
      <div className="bg-[#94EE8F] max-h-[452px] w-[756px] p-6 rounded-4xl flex items-center max-w-[756px]">
        <div className="p-4">
          <img
            src={outputonlinepngtools}
            alt="Building"
            className="w-[676px] h-[405px] bg-white rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
