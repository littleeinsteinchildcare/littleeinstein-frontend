import { createContext, useState, useEffect, ReactNode } from "react";

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

export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [banner, setBannerState] = useState<BannerData | null>(null);

  useEffect(() => {
    // load banner from local
    const raw = localStorage.getItem("activeBanner");
    if (!raw) return;

    const data = JSON.parse(raw) as BannerData;
    // use if not expired
    if (new Date(data.expiresAt) > new Date()) {
      setBannerState(data);
    } else {
      localStorage.removeItem("activeBanner");
    }
  }, []);

  // save banner to local and state
  const setBanner = (newBanner: BannerData) => {
    localStorage.setItem("activeBanner", JSON.stringify(newBanner));
    setBannerState(newBanner);
  };

  // clear from local and state
  const clearBanner = () => {
    localStorage.removeItem("activeBanner");
    setBannerState(null);
  };

  return (
    <BannerContext.Provider value={{ banner, setBanner, clearBanner }}>
      {children}
    </BannerContext.Provider>
  );
};
