import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { forgotPassword } from "@/auth/forgotPassword";
import { signInWithEmail } from "@/auth/signInWithEmail";
import { showErrorToast } from "@/utils/toast";
import AuthProviders from "@/components/auth-ui/authProvider";
type Props = {
  mode: "signin" | "signup";
};
const SignIn: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleEmailPasswordSignIn = async () => {
    try {
      await signInWithEmail(signInEmail, signInPassword);
      navigate("/profile");
    } catch (error: unknown) {
      let errorMessage = "Sign-in failed";

      if (error instanceof Error) {
        errorMessage = "Sign-in failed: " + error.message;
      }

      showErrorToast(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    if (!signInEmail) {
      alert("Please enter your email above first.");
      return;
    }
    try {
      await forgotPassword(signInEmail);
      alert("Password reset email sent.");
    } catch (error: unknown) {
      let errorMessage = "Password reset failed";
      if (error instanceof Error) {
        errorMessage = "Password Reset failed: " + error.message;
      }
      showErrorToast(errorMessage);
    }
  };
  return (
    <div
      className={`w-1/2 flex flex-col justify-center items-center p-8 ${
        mode === "signin" ? "z-20" : "z-10"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">{t("signin.signin")}</h3>
      <label htmlFor="signInEmail" className="sr-only">
        {t("signin.email")}
      </label>
      <input
        id="signInEmail"
        type="email"
        placeholder={t("signin.email")}
        className="w-full mb-3 p-2 rounded-xl bg-white text-black border border-gray-300"
        value={signInEmail}
        onChange={(e) => setSignInEmail(e.target.value)}
      />
      <label htmlFor="signInPassword" className="sr-only">
        {t("signin.password")}
      </label>
      <input
        id="signInPassword"
        type={showPassword ? "text" : "password"}
        placeholder={t("signin.password")}
        className="w-full mb-4 p-2 rounded-xl bg-white text-black border border-gray-300"
        value={signInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
      />

      <p
        className="text-sm text-blue-700 hover:underline cursor-pointer text-right w-full mb-3"
        onClick={handleForgotPassword}
      >
        {t("signin.forgotPassword")}{" "}
      </p>
      <label className="text-sm text-black flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          className="form-checkbox text-green-500"
        />
        <span>{t("signin.showPassword")}</span>
      </label>
      <button
        className="w-full py-2 font-semibold whitespace-nowrap bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] rounded-2xl hover:shadow-md hover:scale-101 transition"
        onClick={handleEmailPasswordSignIn}
      >
        {t("signin.logIn")}
      </button>
      <div className="mt-6 w-full">
        <p className="text-sm text-center text-black mb-2">
          {t("signin.orContinue")}
        </p>
        <AuthProviders />
      </div>
    </div>
  );
};
export default SignIn;
