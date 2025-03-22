import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  // just prep for auth
  const handleSignIn = () => {
    console.log("Sign-in button clicked");
    navigate("/"); // redirect to home for now
  };

  return (
    <div className="h-screen flex justify-center items-start pt-20 bg-[#FFFBCF]">
      <div className="bg-[#94EE8F] shadow-lg rounded-lg p-8 w-80 text-center">
        <h1 className="text-2xl font-bold mb-8">Sign In</h1>

        <button
          onClick={handleSignIn}
          className="bg-[#FFFBCF] py-2 px-6 rounded-md shadow-md hover:bg-green-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
