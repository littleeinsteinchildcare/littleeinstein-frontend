import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type BannerType = "weather" | "closure" | "custom";

interface BannerProps {
  type: BannerType;
  message?: string;
  dismissible?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  type,
  message,
  dismissible = true,
}) => {
  const [visible, setVisible] = useState(true);
  const { t } = useTranslation();

  if (!visible || !type) return null;

  // Use message if provided, otherwise fallback to a translated default
  const content =
    message ||
    (type === "weather"
      ? t("banner.weather")
      : type === "closure"
        ? t("banner.closure")
        : t("banner.custom"));

  return (
    <div className="w-full bg-yellow-200 text-black py-6 px-4 text-center font-semibold shadow-md">
      <div className="text-lg sm:text-xl flex flex-col items-center space-y-2">
        <span>{content}</span>
        {dismissible && (
          <button
            onClick={() => setVisible(false)}
            className="text-sm hover:underline text-black hover:opacity-80"
            aria-label="Dismiss banner"
          >
            {t("banner.dismiss")} ✖
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
