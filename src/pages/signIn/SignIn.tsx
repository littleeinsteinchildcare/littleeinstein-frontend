import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  onAuthStateChanged,
  AuthProvider,
} from "firebase/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return unsubscribe;
  }, [navigate]);

  // was any
  const handleSignInPopup = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const token = await user.getIdToken();

        const response = await fetch("http://localhost:8080/auth/session", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("this is the back end data");
        console.log(data);
        if (!response.ok) {
          console.error("Failed to register session with backend");
        }

        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleEmailLinkSignIn = async () => {
    if (!email) {
      alert("Please enter your email before continuing.");
      return;
    }

    const actionCodeSettings = {
      url: "http://localhost:5173/finishSignIn",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Email link sent! Please check your inbox.");
    } catch (error) {
      console.error("Failed to send email link:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start pt-20 bg-[#FFFBCF]">
      <div className="bg-[#94EE8F] shadow-lg rounded-lg p-8 w-80 text-center space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>

        <button
          onClick={() => handleSignInPopup(new OAuthProvider("microsoft.com"))}
          className="bg-white text-black w-full py-2 rounded shadow hover:bg-gray-100"
        >
          Sign in with Microsoft
        </button>

        <button
          onClick={() => handleSignInPopup(new GoogleAuthProvider())}
          className="bg-white text-black w-full py-2 rounded shadow hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <div className="pt-4 border-t border-green-200">
          <input
            type="email"
            placeholder="Your email"
            className="w-full mb-2 p-2 rounded border border-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleEmailLinkSignIn}
            className="bg-green-300 text-black w-full py-2 rounded hover:bg-green-200"
          >
            Sign in via Email Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
