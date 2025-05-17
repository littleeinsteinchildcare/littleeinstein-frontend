import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error signing out");
  }
};
