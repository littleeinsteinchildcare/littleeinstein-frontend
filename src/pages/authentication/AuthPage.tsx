import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SignIn from "@/components/auth-ui/signIn";
import SignUp from "@/components/auth-ui/signUp";

type AuthPageProps = {
  initialMode?: "signup" | "signin";
};
const AuthPage = ({ initialMode = "signup" }: AuthPageProps) => {
  const [mode, setMode] = useState<"signup" | "signin">(initialMode);

  const { t } = useTranslation();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
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

          {/* SignUp or SignIn Form */}
          <SignUp mode={mode} />

          {/* Signin Form */}
          <SignIn mode={mode} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
