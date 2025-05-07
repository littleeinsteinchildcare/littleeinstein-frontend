import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import tour1 from "@/assets/tourPictures/tour1.png";
import tour2 from "@/assets/tourPictures/tour2.png";
import tour3 from "@/assets/tourPictures/tour3.png";
import tour4 from "@/assets/tourPictures/tour4.png";
import tour5 from "@/assets/tourPictures/tour5.png";
import tour6 from "@/assets/tourPictures/tour6.png";

const Tour = () => {
  const { t } = useTranslation();
  const tourImages = [tour1, tour2, tour3, tour4, tour4, tour5, tour6];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tourImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tourImages.length]);

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center text-black mb-2 mt-20">
        {t("homepage.ourSpace")}
      </h2>
      <div className="w-45 h-1 bg-green-800 mx-auto mb-6"></div>

      {/* Tour slideshow + Video */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-6xl mx-auto">
        {/* Tour Slideshow */}
        <div className="bg-[#94EE8F] p-4 w-full md:w-1/2 rounded-3xl relative border-b-3 border-green-200">
          <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden">
            <img
              src={tourImages[currentIndex]}
              alt={`Tour ${currentIndex + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            />
          </div>
          {/* Prev & Next Buttons */}
          <button
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + tourImages.length) % tourImages.length,
              )
            }
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white p-2 rounded-full shadow"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % tourImages.length)
            }
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white p-2 rounded-full shadow"
          >
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 px-3 py-1 rounded-full">
            {tourImages.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  idx === currentIndex
                    ? "bg-[#003366]"
                    : "bg-white hover:bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="bg-[#94EE8F] p-4 w-full md:w-1/2 rounded-3xl overflow-hidden border-b-3 border-green-200">
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/1ZtLIUO0zaRArw7R_hEOFGZnC1IMlEYBU/preview"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tour;
