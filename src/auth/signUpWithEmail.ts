import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const normalizedEmail = email.toLowerCase();
    console.log("Email:", normalizedEmail);
    console.log("Password:", password);

    const inviteRef = doc(db, "invitedUsers", normalizedEmail);
    const inviteSnap = await getDoc(inviteRef);

    if (!inviteSnap.exists()) {
      throw new Error("This email is not invited to sign up.");
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("user credential", userCredential);
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to sign up");
  }
};
