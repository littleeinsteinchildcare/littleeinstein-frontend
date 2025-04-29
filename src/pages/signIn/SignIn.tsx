import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "@/auth/authConfig";

const SignInPage = () => {
  const { t } = useTranslation();
  const { instance } = useMsal();

  // const handleSignIn = () => {
  //   instance
  //     .loginPopup({
  //       ...loginRequest,
  //       prompt: "login",
  //     })
  //     .catch((error) => {
  //       console.error("Login failed: ", error);
  //     });
  // };
  const handleSignIn = async () => {
    try {
      await instance.logoutPopup(); // <-- clears old account from wrong authority
      await instance.loginPopup(); // <-- clears old account from wrong authority

      // await instance.loginPopup({
      //   ...loginRequest,
      //   prompt: "login",
      // });
      // await instance.login()
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
