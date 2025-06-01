import AuthProviders from "./authProvider";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { signUpWithEmail } from "@/auth/signUpWithEmail";
import { showErrorToast } from "@/utils/toast";
import { updateProfile, signOut, getAuth } from "firebase/auth";
type Props = {
  mode: "signin" | "signup";
};
const SignUp: React.FC<Props> = ({ mode }) => {
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const handleEmailPasswordSignUp = async () => {
    try {
      const user = await signUpWithEmail(signUpEmail, signUpPassword);

      if (user && signUpName) {
        await updateProfile(user, {
          displayName: signUpName,
        });
      }
      console.log("user: ", user);

      if (user) {
        await signOut(getAuth());
        localStorage.setItem("toastMessage", "verifyEmail");
        window.location.href = "/signin";
      }
    } catch (error: unknown) {
      let errorMessage = "Sign-up failed";

      if (error instanceof Error) {
        errorMessage = "Sign-up failed: " + error.message;
      }

      showErrorToast(errorMessage);
    }
  };
  return (
    <div
      className={`w-1/2 flex flex-col justify-center items-center p-8 ${
        mode === "signup" ? "z-20" : "z-10"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">{t("signin.signUp")}</h3>
      <label htmlFor="signUpEmail" className="sr-only">
        {t("signin.email")}
      </label>
      <input
        id="signUpEmail"
        type="text"
        placeholder={t("signin.fullName") || "Full Name"}
        value={signUpName}
        onChange={(e) => setSignUpName(e.target.value)}
        className="w-full mb-3 p-2 rounded-xl bg-white text-black border border-gray-300"
      />
      <input
        type="email"
        placeholder={t("signin.email")}
        value={signUpEmail}
        onChange={(e) => setSignUpEmail(e.target.value)}
        className="w-full mb-3 p-2 rounded-xl bg-white text-black border border-gray-300"
      />
      <label htmlFor="signUpPassword" className="sr-only">
        {t("signin.password")}
      </label>
      <input
        id="signUpPassword"
        type={showPassword ? "text" : "password"}
        placeholder={t("signin.password")}
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
        className="w-full mb-4 p-2 rounded-xl bg-white text-black border border-gray-300"
      />
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
        onClick={handleEmailPasswordSignUp}
      >
        {t("signin.createAccount")}
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
export default SignUp;
