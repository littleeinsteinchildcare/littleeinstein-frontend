import { createContext, useState, useEffect, ReactNode, useRef } from "react";
import { auth } from "@/firebase";
import { useAuthListener } from "@/auth/useAuthListener";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { API_BASE_URL } from "@/utils/api";

type BannerData = {
  type: "weather" | "closure" | "custom";
  message?: string;
  expiresAt: string;
};

type BannerContextType = {
  banner: BannerData | null;
  setBanner: (banner: BannerData) => void;
  clearBanner: () => void;
};

export const BannerContext = createContext<BannerContextType>({
  banner: null,
  setBanner: () => {},
  clearBanner: () => {},
});

const ENDPOINT = "/api/banner";

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banner, setBannerState] = useState<BannerData | null>(null);
  const user = useAuthListener();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadBanner = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data: BannerData = await res.json();
          setBannerState(data);
        } else {
          setBannerState(null);
        }
      } catch (err) {
        console.error("Failed to load banner:", err);
        setBannerState(null);
      }
    };

    loadBanner();
  }, [user]);

  useEffect(() => {
    // listen for changes in signals/bannerUpdate doc
    const unsub = onSnapshot(doc(db, "signals", "bannerUpdate"), (snapshot) => {
      const data = snapshot.data();

      // if 'updatedAt' changes - get banner from backend
      if (data?.updatedAt && auth.currentUser) {
        auth.currentUser.getIdToken().then((token) => {
          fetch(`${API_BASE_URL}${ENDPOINT}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.ok && res.json())
            .then((data: BannerData) => {
              setBannerState(data);
            })
            .catch((err) => {
              console.error("Failed to sync banner from backend:", err);
              setBannerState(null);
            });
        });
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    // Clear any timeout already set
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!banner) return;

    const expiryTime = new Date(banner.expiresAt).getTime();
    const now = Date.now();
    const msUntilExpire = expiryTime - now;

    if (msUntilExpire <= 0) {
      setBannerState(null);
      return;
    }

    // Set timeout to clear the banner when it expires
    timeoutRef.current = setTimeout(() => {
      setBannerState(null);
    }, msUntilExpire);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [banner]);

  const setBanner = async (newBanner: BannerData) => {
    console.log("Sending POST to /api/banner", newBanner);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      const token = await user.getIdToken();

      const res = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBanner),
      });

      if (res.ok) {
        setBannerState(newBanner);
      } else {
        console.error("Failed to save banner");
      }
    } catch (err) {
      console.error("Banner set failed:", err);
    }
  };

  const clearBanner = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      const token = await user.getIdToken();

      const res = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBannerState(null);

        await setDoc(doc(db, "signals", "bannerUpdate"), {
          updatedAt: new Date().toISOString(),
        });
      } else {
        console.error("Failed to clear banner");
      }
    } catch (err) {
      console.error("Banner clear failed:", err);
    }
  };

  return (
    <BannerContext.Provider value={{ banner, setBanner, clearBanner }}>
      {children}
    </BannerContext.Provider>
  );
};
