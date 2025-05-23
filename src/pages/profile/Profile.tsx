import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMsal } from "@azure/msal-react";
import { apiScopes } from "@/auth/authConfig";

const Profile = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  const { instance } = useMsal();

  async function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files);

    if (photos.length + files.length > 2) {
      alert("You can only upload up to 2 photos!");
      return;
    }
    const uploadedUrls: string[] = [];

    const account = instance.getActiveAccount();
    if (!account) {
      alert("User is not logged in");
      return;
    }
    console.log("account", account);
    let accessToken: string;
    try {
      const response = await instance.acquireTokenSilent({
        scopes: apiScopes.scopes,
        account: account,
      });
      accessToken = response.accessToken;
    } catch (error) {
      console.error("Error acquiring token silently:", error);
      return;
    }

    //const userId = account.homeAccountId;
    console.log("accesstoken", accessToken);
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      console.log("Form data:", formData);

      try {
        const res = await fetch("http://localhost:8080/api/image", {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const text = await res.text(); // Read the raw text

        if (!res.ok) {
          console.error(
            "Upload failed. Status:",
            res.status,
            "Response:",
            text,
          );
          alert("Upload failed. Check console for details.");
          continue;
        }

        const data = JSON.parse(text);

        if (data.success && data.image?.url) {
          uploadedUrls.push(data.image.url);
        } else {
          console.error("Unexpected structure:", data);
        }
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
    setPhotos((prev) => [...prev, ...uploadedUrls]);
  }

  async function handleDelete(index: number) {
    const account = instance.getActiveAccount();
    if (!account) {
      alert("User is not logged in");
      return;
    }

    let accessToken: string;
    try {
      const response = await instance.acquireTokenSilent({
        scopes: apiScopes.scopes,
        account: account,
      });
      accessToken = response.accessToken;
    } catch (error) {
      console.error("Error acquiring token silently:", error);
      return;
    }

    const imageUrl = photos[index];
    const fileName = imageUrl.split("/").pop();

    try {
      const res = await fetch(`http://localhost:8080/api/image/${fileName}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Delete failed:", res.status, text);
        alert("Failed to delete image.");
        return;
      }

      // On success, update state
      setPhotos((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Error deleting image.");
    }
  }

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("profile.title")}
      </h2>
      <div className="w-20 h-1 bg-green-800 mx-auto mb-6" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Photo Uploads */}
        <div className="shadow-md rounded flex-col p-5">
          <h2 className="text-2xl text-black font-bold mx-auto mb-5">
            {t("profile.upload")}
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleAdd}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-[#94EE8F] text-black px-4 py-2 rounded hover:bg-green-200 transition-colors text-center w-max m-5"
          >
            {t("profile.browse")}
          </label>
          {photos.map((src, index) => (
            <div key={index} className="relative">
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-2/3 h-48 object-cover m-5"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-20 right-10 bg-[#94EE8F] text-black text-xs px-2 py-1 rounded hover:bg-green-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        {/*Events Section */}
        <div className="shadow-md rounded flex-col p-5">
          <h2 className="text-2xl text-black font-bold mx-auto mb-5">
            {t("profile.events")}
          </h2>
          {/*To be mapped later */}
          <div className="shadow_md rounded bg-[#94EE8F] p-5 mb-5 relative">
            <h3 className="text-md font-bold wrap-break-word">Event 1</h3>
            <div className="absolute right-5 top-4 font-normal">By Creator</div>
            <hr className="h-px mt-3 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="font-light text-gray-600">
              <p> Feb 30 2025</p>
              <p> 12:00pm - 3:00pm</p>
            </div>
          </div>

          <div className="shadow_md rounded bg-[#94EE8F] p-5 mb-5 relative">
            <h3 className="text-md font-bold wrap-break-word">Event 2</h3>
            <div className="absolute right-5 top-4 font-normal">By Creator</div>
            <hr className="h-px mt-3 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="font-light text-gray-600">
              <p> Feb 30 2025</p>
              <p> 12:00pm - 3:00pm</p>
            </div>
          </div>

          <div className="shadow_md rounded bg-[#94EE8F] p-5 mb-5 relative">
            <h3 className="text-md font-bold wrap-break-word">Event 3</h3>
            <div className="absolute right-5 top-4 font-normal">By Creator</div>
            <hr className="h-px mt-3 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="font-light text-gray-600">
              <p> Feb 30 2025</p>
              <p> 12:00pm - 3:00pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
