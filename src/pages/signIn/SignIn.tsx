import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // just prep for auth
  const handleSignIn = () => {
    console.log("Sign-in button clicked");
    navigate("/"); // redirect to home for now
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
