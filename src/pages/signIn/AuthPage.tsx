import { useState } from "react";
import { motion } from "framer-motion";
import {
  updateProfile,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";
import { signInWithProvider } from "@/auth/signInWithProvider";
import { useNavigate } from "react-router-dom";
import { signInWithEmail } from "@/auth/signInWithEmail";
import { signUpWithEmail } from "@/auth/signUpWithEmail";
import { forgotPassword } from "@/auth/forgotPassword";
import googleIcon from "@/assets/googleIcon.svg";
import microsoftIcon from "@/assets/microsoftIcon.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const [signUpName, setSignUpName] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const navigate = useNavigate();

  const { t } = useTranslation();

  const toggleMode = () => {
    setMode(mode === "signup" ? "signin" : "signup");
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
      toast.error(errorMessage);
    }
  };
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
        const token = await user.getIdToken();

        const response = await fetch("http://localhost:8080/api/user", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to create user in backend:", errorText);
        }
        const data = await response.json();
        if (data.role == "admin") {
          await signOut(getAuth());
          toast.info(
            "You're signed up as admin. Please sign in again to activate admin access.",
          );
          navigate("/signin");
        } else {
          navigate("/profile");
        }
      }
    } catch (error: unknown) {
      let errorMessage = "Sign-up failed";

      if (error instanceof Error) {
        errorMessage = "Sign-up failed: " + error.message;
      }

      toast.error(errorMessage);
    }
  };

  const handleEmailPasswordSignIn = async () => {
    try {
      const user = await signInWithEmail(signInEmail, signInPassword);
      if (user) {
        const token = await user.getIdToken();

        const response = await fetch("http://localhost:8080/test", {
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
      }
      navigate("/profile");
    } catch (error: unknown) {
      let errorMessage = "Sign-in failed";

      if (error instanceof Error) {
        errorMessage = "Sign-in failed: " + error.message;
      }

      toast.error(errorMessage);
    }
  };
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
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#FFFBCF] flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl h-[600px] bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="relative w-full h-full flex">
          {/* Sliding Welcome Panel */}
          <motion.div
            animate={{ x: mode === "signup" ? "0%" : "100%" }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 bottom-0 w-1/2 bg-[#94EE8F] flex flex-col justify-center items-center p-8 text-center shadow-xl z-30"
            style={{ left: 0 }}
          >
            <h2 className="text-3xl font-bold text-black mb-4">
              {mode === "signup"
                ? t("signin.welcomeBack")
                : t("signin.welcome")}
            </h2>
            <p className="text-sm text-black mb-6">
              {mode === "signup"
                ? t("signin.dontHaveAccount")
                : t("signin.haveAccount")}
            </p>
            <button
              onClick={toggleMode}
              className="px-5 py-1 font-semibold whitespace-nowrap bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition"
            >
              {mode === "signup" ? t("signin.signUp") : t("signin.signin")}
            </button>
          </motion.div>

          {/* Signup Form */}
          <div
            className={`w-1/2 flex flex-col justify-center items-center p-8 ${
              mode === "signup" ? "z-20" : "z-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">{t("signin.signUp")}</h3>
            <input
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
            <input
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
                  <img
                    src={microsoftIcon}
                    alt="Microsoft"
                    className="h-5 w-5"
                  />
                  Microsoft
                </button>
              </div>
            </div>
          </div>

          {/* Signin Form */}
          <div
            className={`w-1/2 flex flex-col justify-center items-center p-8 ${
              mode === "signin" ? "z-20" : "z-10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">{t("signin.signin")}</h3>
            <input
              type="email"
              placeholder={t("signin.email")}
              className="w-full mb-3 p-2 rounded-xl bg-white text-black border border-gray-300"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />
            <input
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
                  <img
                    src={microsoftIcon}
                    alt="Microsoft"
                    className="h-5 w-5"
                  />
                  Microsoft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
