import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase";
import { checkIfInvited } from "./checkIfInvited";
import { showInfoToast } from "@/utils/toast";
// import { db } from "@/firebase";
// import { doc, getDoc } from "firebase/firestore";

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const normalizedEmail = email.toLowerCase();
    console.log("Email:", normalizedEmail);
    console.log("Password:", password);

    const isInvited = await checkIfInvited(normalizedEmail);
    if (!isInvited) {
      throw new Error("You are not invited to use this application.");
    } else {
      console.log("User is invited.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendEmailVerification(userCredential.user);
    showInfoToast("Verification email sent. Please check your inbox.");
    await auth.signOut();

    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to sign up");
  }
};
