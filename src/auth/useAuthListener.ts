import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { syncFirebaseUser } from "@/api/client";

export const useAuthListener = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      // Sync Firebase user with backend when user signs in
      if (firebaseUser && user?.emailVerified) {
        try {
          await syncFirebaseUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "",
            displayName: firebaseUser.displayName || "",
          });
          console.log("User synced with backend successfully");
        } catch (error) {
          console.error("Failed to sync user with backend:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return user;
};
