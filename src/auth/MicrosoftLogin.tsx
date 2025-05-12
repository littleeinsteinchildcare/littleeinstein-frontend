// src/MicrosoftLogin.tsx
import { auth } from "@/firebase";
import { OAuthProvider, signInWithPopup } from "firebase/auth";

export const MicrosoftLogin = () => {
  const signIn = async () => {
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in as:", user.email);
    } catch (error) {
      console.error("Microsoft sign-in failed:", error);
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={signIn}
        className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
};
