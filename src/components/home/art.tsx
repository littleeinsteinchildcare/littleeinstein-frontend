import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase";
import { useAuthListener } from "@/auth/useAuthListener";

import draw1 from "@/assets/childDrawings/drawing1.png";
import draw2 from "@/assets/childDrawings/drawing2.png";
import draw3 from "@/assets/childDrawings/drawing3.png";

const Art = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<string[]>([]);
  const user = useAuthListener();

  async function getToken() {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");
    return await user.getIdToken();
  }

  const fetchGalleryImages = async () => {
    try {
      const token = await getToken();

      const res = await fetch("http://localhost:8080/api/images", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setImages([]);
        return;
      }

      const blobUrls = await Promise.all(
        data.map(async (path: string) => {
          const imgRes = await fetch(
            `http://localhost:8080/api/image/${path}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const blob = await imgRes.blob();
          return URL.createObjectURL(blob);
        }),
      );

      setImages(blobUrls);
    } catch (err) {
      console.error("Gallery fetch failed, falling back to default art:", err);
      setImages([]); // fallback images
    }
  };

  useEffect(() => {
    if (user) {
      fetchGalleryImages();
    }
  }, [user]);

  const fallbackImages = [draw1, draw2, draw3];
  const gallery = images.length > 0 ? images : fallbackImages;

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6 mt-20">
        <h2 className="text-2xl font-semibold inline-block relative">
          {t("homepage.art")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      {/* Art Slideshow */}
      <div className="overflow-hidden bg-[#94EE8F] min-h-[200px] border-b-3 border-green-200 items-center justify-center mt-10 p-6 rounded-4xl mx-auto md:max-w-6xl">
        <div className="flex animate-scroll gap-8 w-max">
          {[...gallery, ...gallery].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Child drawing ${index + 1}`}
              className="h-[300px] w-auto rounded-2xl object-contain"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Art;
