import { useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { API_BASE_URL } from "@/utils/api";

const EmailInvitation = () => {
  const { t } = useTranslation();
  const [emailInput, setEmailInput] = useState<string>("");
  const handleSendInvite = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("User not authenticated");
      const token = await currentUser.getIdToken();

      const response = await fetch(`${API_BASE_URL}/api/send-invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: emailInput }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      setEmailInput("");
      showSuccessToast("Invitation email sent!");
    } catch (err) {
      showErrorToast("Error Sending email: " + err);
    }
  };
  return (
    <section className="bg-[#94EE8F] rounded-lg shadow p-6">
      <h2 className="text-lg md:text-2xl font-semibold mb-4 text-black">
        {t("admin.inviteUser")}
      </h2>
      <div className="relative">
        <input
          type="text"
          className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-0"
          placeholder={t("admin.email")}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] mt-3 px-4 py-2 rounded"
        onClick={handleSendInvite}
      >
        {t("admin.send")}
      </button>
    </section>
  );
};

export default EmailInvitation;
