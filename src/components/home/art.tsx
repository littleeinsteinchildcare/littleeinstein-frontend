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
      <div className="text-center mb-6 mt-20">
        <h2 className="text-2xl font-semibold inline-block relative">
          {t("homepage.art")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

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
