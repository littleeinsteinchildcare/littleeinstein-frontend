import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleDelete(index: number) {
    URL.revokeObjectURL(photos[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
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
