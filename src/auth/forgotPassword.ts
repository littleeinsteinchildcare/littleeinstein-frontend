import { sendPasswordResetEmail } from "firebase/auth";
import { db, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const forgotPassword = async (email: string) => {
  if (!email) {
    throw new Error("Email is required to reset password.");
  }

  const normalizedEmail = email.toLowerCase();

  const inviteRef = doc(db, "invitedUsers", normalizedEmail);
  const inviteSnap = await getDoc(inviteRef);

  if (!inviteSnap.exists()) {
    throw new Error("No account under this email.");
  }
  try {
    await sendPasswordResetEmail(auth, email);
    return "Reset email sent.";
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to send reset email.");
  }
};
