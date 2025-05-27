import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import reviews from "@/assets/temp1.png";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Kevin P.",
      quote: t("homepage.test1"),
    },
    {
      name: "Kevin P.",
      quote: t("homepage.test2"),
    },
    {
      name: "Kevin P.",
      quote: t("homepage.test3"),
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <>
      {/* Header */}
      <div className="text-center mb-6 mt-20">
        <h2 className="text-2xl font-semibold inline-block relative">
          {t("homepage.sayings")}
          <span className="block h-1 bg-green-800 mt-2 mx-auto w-[70%]"></span>
        </h2>
      </div>

      {/* Testimonials + Google Reviews */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-10">
        {/* Testimonial Card */}
        <div className="bg-[#94EE8F] rounded-3xl p-6 w-full md:w-1/2 flex flex-col justify-between relative border-b-3 border-green-200">
          <p className="text-lg italic text-gray-700">
            “{testimonials[testimonialIndex].quote}”
          </p>
          <p className="text-right text-sm font-semibold text-[#003366] mt-4">
            — {testimonials[testimonialIndex].name}
          </p>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === testimonialIndex
                    ? "bg-[#003366]"
                    : "bg-white hover:bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Google Reviews */}
        <div className="w-full md:w-1/2 bg-[#94EE8F] rounded-3xl p-6 flex flex-col items-center justify-center text-center border-b-3 border-green-200">
          <img src={reviews} alt="Google Reviews" className="w-[120px] mb-4" />
          <p className="text-gray-700 mb-4">{t("homepage.reviewMessage")}</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 text-sm font-semibold bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-xl transition"
          >
            {t("homepage.reviewButton")}
          </a>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
