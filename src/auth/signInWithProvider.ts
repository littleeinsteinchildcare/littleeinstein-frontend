// import { auth } from "@/firebase";
// import { AuthProvider, signInWithPopup } from "firebase/auth";

// export const signInWithProvider = async (provider: AuthProvider) => {
//   const result = await signInWithPopup(auth, provider);
// //   const user = result.user;

// //   if (!user) throw new Error("No user found from signInWithPopup");

// //   const token = await user.getIdToken();

// //   const response = await fetch("http://localhost:8080/auth/session", {
// //     method: "GET",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });

// //   if (!response.ok) {
// //     throw new Error("Failed to register session with backend");
// //   }

// //   const data = await response.json();
//   return result;
// };

import { auth, db } from "@/firebase";
import { AuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const signInWithProvider = async (provider: AuthProvider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user?.email) {
      throw new Error("No email found in user object.");
    }

    const email = user.email.toLowerCase();
    const inviteRef = doc(db, "invitedUsers", email);
    const inviteSnap = await getDoc(inviteRef);

    if (!inviteSnap.exists()) {
      await signOut(auth); // Sign user out immediately
      throw new Error("You are not invited to use this application.");
    }
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Sign-in with provider failed.");
  }
};
