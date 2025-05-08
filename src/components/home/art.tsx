import { useTranslation } from "react-i18next";

import draw1 from "@/assets/childDrawings/drawing1.png";
import draw2 from "@/assets/childDrawings/drawing2.png";
import draw3 from "@/assets/childDrawings/drawing3.png";

const Art = () => {
  const { t } = useTranslation();
  const childImages = [draw1, draw2, draw3, draw1, draw2, draw3];

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center text-black mb-2 mt-20">
        {t("homepage.art")}
      </h2>
      <div className="w-60 h-1 bg-green-800 mx-auto mb-6"></div>

      {/* Art Slideshow */}
      <div className="overflow-hidden bg-[#94EE8F] min-h-[200px] border-b-3 border-green-200 items-center justify-center mt-10 p-6 rounded-4xl mx-auto md:max-w-6xl">
        <div className="flex animate-scroll gap-8 w-max">
          {/* First set */}
          {childImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Child drawing ${index + 1}`}
              className="h-[300px] w-auto rounded-2xl object-contain"
            />
          ))}

          {/* Need to duplicate set for seamless loop */}
          {childImages.map((img, index) => (
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
