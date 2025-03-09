import Navbar from "../components/Navbar";
import temp1 from "../assets/temp1.png";

// Staff Data
const staffMembers = [
  { id: 1, name: "Staff 1", bio: "Staff bio", image: temp1 },
  { id: 2, name: "Staff 2", bio: "Staff bio", image: temp1 },
  { id: 3, name: "Staff 3", bio: "Staff bio", image: temp1 },
];

// Staff Component
const Staff = () => {
  return (
    <div className="bg-[#FFFBCF] min-h-screen pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="p-10 flex flex-col items-start">
        {/* using map to loop thru staff array to dynamically render */}
        {staffMembers.map((staff) => (
          <div
            key={staff.id}
            className="flex flex-col md:flex-row items-center gap-15 p-6 w-full max-w-4xl"
          >
            {/* Staff Image */}
            <img
              src={staff.image}
              alt={staff.name}
              className="w-40 h-40 md:w-70 md:h-70 rounded-full border border-black shadow-lg"
            />

            {/* Staff Info */}
            <div className="border md:ml-15 border-black p-6 w-full h-40 m:h-50 text-left">
              <h2 className="text-2xl md:text-4xl font-semibold text-black">
                {staff.name}
              </h2>
              <p className="text-lg md:text-2xl text-black">{staff.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export Staff component
export default Staff;
