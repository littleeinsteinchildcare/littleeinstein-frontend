import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // null = still checking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Force token refresh to make sure we get the latest claims
          await user.getIdToken(true);
          const idTokenResult = await user.getIdTokenResult();
          setIsAdmin(idTokenResult.claims.admin === true);
        } catch (error) {
          console.error("Failed to fetch admin claims:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, loading };
};
