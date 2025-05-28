import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase";

type Photo = {
  id: string;
  name: string;
  url: string;
};

const UserProfileSection = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  let accessToken: string;

  async function getToken() {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not logged in");
    return await user.getIdToken();
  }

  const fetchImages = async () => {
    let token: string;
    try {
      token = await getToken();
    } catch {
      alert("User not logged in");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/images", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("User ID not available");
        return;
      }

      if (Array.isArray(data)) {
        const userImages = data
          .filter((path: string) => path.startsWith(`${userId}/`))
          .map((path: string) => {
            const name = path.split("/").pop() || path;
            const id = path;
            const url = `http://localhost:8080/api/image/${path}`;
            return { id, name, url };
          });

        setPhotos(userImages);
        setImagesLoaded(true);
      } else if (data === null) {
        console.log("No images found.");
        setPhotos([]);
        setImagesLoaded(true);
      } else {
        console.error("Unexpected structure:", data);
      }
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  async function handleAdd(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files);

    if (photos.length + files.length > 2) {
      alert("You can only upload up to 2 photos!");
      return;
    }

    try {
      accessToken = await getToken();
    } catch {
      alert("User is not logged in");
      return;
    }

    const newPhotos: Photo[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:8080/api/image", {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const text = await res.text();

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

        if (data.success) {
          const userId = auth.currentUser?.uid;
          if (!userId) throw new Error("No user ID found");

          const fullPath = `${userId}/${data.image.name}`;

          const uploadedPhoto = {
            id: fullPath,
            name: data.image.name,
            url: data.image
              .url /*.replace("host.docker.internal:10000", "localhost:10000")*/,
          };
          newPhotos.push(uploadedPhoto);
        }
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }

    setPhotos((prev) => [...prev, ...newPhotos]);
    console.log("Image uploaded successfully:", newPhotos);
  }

  async function handleDelete(index: number) {
    let accessToken: string;
    try {
      accessToken = await getToken();
    } catch {
      alert("User is not logged in");
      return;
    }

    const photoId = photos[index].id;

    try {
      const res = await fetch(`http://localhost:8080/api/image/${photoId}`, {
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
          {!imagesLoaded ? (
            <label
              onClick={fetchImages}
              className="cursor-pointer bg-[#94EE8F] text-black px-4 py-2 rounded hover:bg-green-200 transition-colors text-center w-max m-5"
            >
              {t("profile.load")}
            </label>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleAdd}
                className="hidden"
                id="fileUpload"
                multiple={false}
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
                    src={src.url}
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
            </>
          )}
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
export default UserProfileSection;
