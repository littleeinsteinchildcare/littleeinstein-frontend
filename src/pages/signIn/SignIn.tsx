import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginRequest } from "@/auth/authConfig";

const SignInPage = () => {
  const { t } = useTranslation();
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (accounts.length > 0) {
      // User is already authenticated, redirect to home page
      navigate("/");
    }
  }, [accounts, navigate]);

  const handleSignIn = async () => {
    try {
      // Simple login with popup - no need to logout first
      await instance.loginPopup({
        scopes: loginRequest.scopes,
        prompt: "select_account", // Ensures user can choose an account
      });

      // After successful login, redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-start pt-20 bg-[#FFFBCF]">
      <div className="bg-[#94EE8F] shadow-lg rounded-lg p-8 w-80 text-center">
        <h1 className="text-2xl font-bold mb-8">{t("signin.signin")}</h1>

        <button
          onClick={handleSignIn}
          className="bg-[#FFFBCF] py-2 px-6 rounded-md shadow-md hover:bg-green-200"
        >
          {t("signin.signin")}
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
