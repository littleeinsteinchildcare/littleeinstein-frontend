import googleIcon from "@/assets/googleIcon.svg";
import microsoftIcon from "@/assets/microsoftIcon.svg";
import { signInWithProvider } from "@/auth/signInWithProvider";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "@/utils/toast";
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";
const AuthProviders = () => {
  const navigate = useNavigate();
  const handleOAuth = async (provider: "google" | "microsoft") => {
    const authProvider =
      provider === "google"
        ? new GoogleAuthProvider()
        : new OAuthProvider("microsoft.com");
    try {
      const result = await signInWithProvider(authProvider);
      console.log("OAuth success, redirecting...", result);
      navigate("/profile");
    } catch (error: unknown) {
      let errorMessage = "OAuth sign-in failed";

      if (error instanceof Error) {
        errorMessage = "OAuth sign-in failed: " + error.message;
      }
      showErrorToast(errorMessage);
    }
  };
  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => handleOAuth("google")}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100"
      >
        <img src={googleIcon} alt="Google" className="h-7 w-8" />
        Google
      </button>
      <button
        onClick={() => handleOAuth("microsoft")}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100"
      >
        <img src={microsoftIcon} alt="Microsoft" className="h-5 w-5" />
        Microsoft
      </button>
    </div>
  );
};

export default AuthProviders;
