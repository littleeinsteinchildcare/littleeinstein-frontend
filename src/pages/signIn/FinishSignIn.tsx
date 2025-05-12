import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const FinishSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");

      if (storedEmail) {
        completeSignIn(storedEmail);
      } else {
        setShowInput(true);
      }
    }
  }); //[]
  // removed dependancy arra

  const completeSignIn = async (emailToUse: string) => {
    try {
      await signInWithEmailLink(auth, emailToUse, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      navigate("/");
    } catch (error) {
      console.error("Email link sign-in failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      completeSignIn(email);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#FFFBCF]">
      <div className="bg-[#94EE8F] rounded-lg shadow-lg p-8 text-center w-96">
        <h2 className="text-xl font-semibold mb-4">Completing Sign-In</h2>

        {showInput ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-2 text-sm text-gray-700">
              Please enter your email to complete sign-in:
            </p>
            <input
              type="email"
              className="w-full p-2 mb-4 rounded border border-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-300 px-4 py-2 rounded hover:bg-green-200"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>Please wait while we sign you in...</p>
        )}
      </div>
    </div>
  );
};

export default FinishSignIn;
