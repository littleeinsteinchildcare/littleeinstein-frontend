import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to sign in with email and password.");
  }
};
