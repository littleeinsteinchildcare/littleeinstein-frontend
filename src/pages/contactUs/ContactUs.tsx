import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiPhone, FiMail, FiGlobe, FiMapPin, FiClock } from "react-icons/fi";

const ContactUsPage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    //public key - fine to show - this key is to my school email
    //we can change it to litteleinstein email when it registers on web3forms
    //https://web3forms.com/
    formData.append("access_key", "92ff9739-f5eb-4206-91a2-8c41cf2e55d0");
    formData.append("subject", "New Message from Little Einstein Childcare");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      setStatus(t("contact.success"));
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setStatus(""), 6000);
    } else {
      setStatus(t("contact.error"));
    }
  };

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("contact.title")}
      </h2>
      <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 text-gray-700">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#94EE8F] shadow-md rounded-xl p-4"
        >
          <h2 className="text-xl font-semibold text-black">
            {t("contact.heading")}
          </h2>
          <p className="text-sm font-semibold">{t("contact.sub")}</p>
          <input
            name="name"
            type="text"
            placeholder={t("contact.name")}
            className="w-full p-3 border border-gray-400 bg-gray-100 rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder={t("contact.email")}
            className="w-full p-3 border border-gray-400 bg-gray-100 rounded"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder={t("contact.phone")}
            className="w-full p-3 border border-gray-400 bg-gray-100 rounded"
            required
          />
          <textarea
            name="message"
            placeholder={t("contact.message")}
            className="w-full p-3 border border-gray-400 bg-gray-100 rounded min-h-[150px]"
            required
          />
          <button
            type="submit"
            className="block px-5 md:py-1 font-semibold whitespace-nowrap shadow-md bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white rounded-xl hover:shadow-md transform transition duration-300"
          >
            {t("contact.send")}
          </button>

          <div className="min-h-[1.5rem]">
            <p
              className={`transition-all duration-600 overflow-hidden text-sm font-semibold ${
                status ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
              }`}
            >
              {status}
            </p>
          </div>
        </form>

        {/* Info Section */}
        <div className="space-y-2 bg-[#94EE8F] p-4 shadow-md rounded-xl text-gray-700">
          <h2 className="text-2xl font-bold text-black">
            Little Einstein Childcare
          </h2>
          <p className="flex items-center gap-2">
            <FiMapPin /> 1789 SE River RD, Hillsboro, OR 97123
          </p>

          <div className="relative rounded overflow-hidden shadow-md mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.2186473211314!2d-122.96421139999998!3d45.505677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495101173d997db%3A0x8e7eb10eeaa48cd1!2s1789%20SE%20River%20Rd%2C%20Hillsboro%2C%20OR%2097123!5e0!3m2!1sen!2sus!4v1745055129136!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1789+SE+River+RD,+Hillsboro"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] px-1 py-1 text-xs rounded shadow transition"
            >
              {t("homepage.getDirections")}
            </a>
          </div>

          <p className="flex items-center gap-2 mt-10">
            <FiPhone /> (123) 345-7890
          </p>
          <p className="flex items-center gap-2">
            <FiMail /> temp_email_@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FiGlobe />
            <a
              href="http://localhost:5173/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:5173/
            </a>
          </p>

          <div className="pt-4">
            <h3 className="text-xl font-bold mb-2">
              {t("contact.hoursLabel")}
            </h3>
            <p className="flex items-center gap-2">
              <FiClock />
              {t("contact.hoursValue")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
