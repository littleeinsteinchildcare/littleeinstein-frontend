import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { BannerContext } from "@/context/BannerContext";

const Admin = () => {
  const { t } = useTranslation();
  const { setBanner, clearBanner } = useContext(BannerContext);

  const [bannerType, setBannerType] = useState("none");
  const [customMessage, setCustomMessage] = useState("");
  const [duration, setDuration] = useState(24);

  const handleSetBanner = () => {
    const expiresAt = new Date(
      Date.now() + duration * 3600 * 1000,
    ).toISOString();
    setBanner({
      type: bannerType as "weather" | "closure" | "custom",
      message: bannerType === "custom" ? customMessage : "",
      expiresAt,
    });
  };

  /*function handleEliminate(user: string): void {
    throw new Error("Function not implemented.");
  }*/

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("admin.adminHeader")}
      </h2>
      <div className="w-30 h-1 bg-green-800 mx-auto mb-6"></div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
        {/* Banner Controls */}
        <section className="bg-[#94EE8F] rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">
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
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {t("admin.userManage")}
          </h2>
          <div className="text-sm text-gray-500">
            {[
              "User 1",
              "User 2",
              "User 3w745629837456928374569287569827346987324658972369582736495827897423",
              "User 1",
              "User 2",
              "User 3",
            ].map((user, idx) => (
              <div
                key={idx}
                className="group relative p-2 rounded hover:bg-gray-200 transition duration-200 flex items-center justify-between whitespace-nowrap min-w-0 flex-grow"
              >
                <p className="overflow-hidden text-ellipsis">{user}</p>
                <button
                  className="ml-2 text-red-500 opacity-0 hover:bg-gray-100 hover:cursor-pointer rounded pl-2 pr-2 opacity-0 group-hover:opacity-100 transition duration-200 text-sm"
                  onClick={() => alert(`Eliminate ${user}?`)}
                >
                  {t("admin.removeUser")}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Image Management */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {t("admin.imageManage")}
          </h2>
          <p className="text-sm text-gray-500">For later</p>
        </section>

        {/* Temp */}
        <section className="bg-white rounded-lg flex items-center justify-center">
          For later
        </section>
      </div>
    </div>
  );
};

export default Admin;
