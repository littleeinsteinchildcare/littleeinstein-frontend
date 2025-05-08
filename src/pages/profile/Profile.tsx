import { t } from "i18next";
import React, { useState } from "react";

const Profile = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      if (photos.length + files.length <= 5) {
        const newPhotos = files.map((file) =>
          URL.createObjectURL(file as Blob),
        );
        setPhotos((prev) => [...prev, ...newPhotos]);
      } else {
        alert("You can only upload up to 5 photos!");
      }
    }
  }

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("profile.title")}
      </h2>
      <div className="w-20 h-1 bg-green-800 mx-auto mb-6" />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div className="shadow-md rounded flex-col p-5">
          <h2 className="text-2xl text-black font-bold mx-auto mb-5">
            {t("profile.upload")}
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
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
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-2/3 h-48 object-cover m-5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
