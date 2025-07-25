import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BannerContext } from "@/context/BannerContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import UserManagement from "./UserManagement";
import EmailInvitation from "./EmailInvitation";

const Admin = () => {
  const { t } = useTranslation();
  const { setBanner, clearBanner } = useContext(BannerContext);

  const [bannerType, setBannerType] = useState("none");
  const [customMessage, setCustomMessage] = useState("");
  const [duration, setDuration] = useState(24);

  const handleSetBanner = async () => {
    const expiresAt = new Date(
      Date.now() + duration * 3600 * 1000,
    ).toISOString();

    setBanner({
      type: bannerType as "weather" | "closure" | "custom",
      message: bannerType === "custom" ? customMessage : "",
      expiresAt,
    });

    try {
      await setDoc(doc(db, "signals", "bannerUpdate"), {
        updatedAt: new Date().toISOString(), // send time banner was set
      });
    } catch (error) {
      console.error("Failed to signal banner to Firestore:", error);
    }
  };

  /*function handleEliminate(user: string): void {
    throw new Error("Function not implemented.");
  }*/

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      {/* Header */}
      <div className="text-center mt-6 mb-12">
        <h2 className="text-3xl font-bold text-black inline-block relative">
          {t("admin.adminHeader")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
        {/* Banner Controls */}
        <section className="bg-[#94EE8F] rounded-xl shadow p-6">
          <h2 className="text-lg md:text-2xl font-semibold mb-6">
            {t("admin.bannerControls")}
          </h2>

          <div className="space-y-4 text-sm">
            {/* Select Banner Type */}
            <div className="flex items-center space-x-4">
              <label className="w-40 font-medium">
                {t("admin.selectBanner")}
              </label>
              <select
                value={bannerType}
                onChange={(e) => setBannerType(e.target.value)}
                className="flex-1 bg-white border rounded px-2 py-1"
              >
                <option value="none">{t("admin.noneOption")}</option>
                <option value="weather">{t("admin.weatherOption")}</option>
                <option value="closure">{t("admin.closeOption")}</option>
                <option value="custom">{t("admin.customOption")}</option>
              </select>
            </div>

            {/* Custom Message */}
            {bannerType === "custom" && (
              <div className="flex items-center space-x-4">
                <label className="w-40 font-medium">{t("admin.message")}</label>
                <input
                  type="text"
                  value={customMessage}
                  placeholder={t("admin.place")}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="flex-1 bg-white border rounded px-2 py-1"
                />
              </div>
            )}

            {/* Duration */}
            <div className="flex items-center space-x-4">
              <label className="w-40 font-medium">{t("admin.duration")}</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="flex-1 bg-white border rounded px-2 py-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-2">
              <button
                onClick={handleSetBanner}
                className="bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] px-4 py-2 rounded"
              >
                {t("admin.set")}
              </button>
              <button
                onClick={clearBanner}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 border border-[#003366]"
              >
                {t("admin.clear")}
              </button>
            </div>
          </div>
        </section>

        {/* User Management */}
        <UserManagement onRemove={(email) => alert(`Eliminate ${email}?`)} />

        {/* Image Management */}
        <section className="bg-[#94EE8F] rounded-lg shadow p-6">
          <h2 className="text-lg md:text-2xl font-semibold mb-2 text-black">
            {t("admin.imageManage")}
          </h2>
          <p className="text-sm text-gray-500">For later</p>
        </section>

        {/* Email Invitation */}
        <EmailInvitation />
      </div>
    </div>
  );
};

export default Admin;
