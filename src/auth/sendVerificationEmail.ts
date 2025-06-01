import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  if (user.emailVerified) {
    throw new Error("Email is already verified.");
  }

  try {
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email.");
  }
};
