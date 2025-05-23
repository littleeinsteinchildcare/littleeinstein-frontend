import { useTranslation } from "react-i18next";
import building from "@/assets/building.jpeg";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const LocationInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full md:w-1/2">
      {/* Left side - Building Image, Map Embed, and Address Info */}
      <div className="bg-[#94EE8F] w-full rounded-xl p-4 border-b-3 border-green-200">
        {/* Building Image */}
        <img
          src={building}
          alt="Building"
          className="rounded-lg w-full max-h-[200px] object-cover mb-4"
        />

        {/* Google Map Embed + Address & Hours*/}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[200px] rounded overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.2186473211314!2d-122.96421139999998!3d45.505677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495101173d997db%3A0x8e7eb10eeaa48cd1!2s1789%20SE%20River%20Rd%2C%20Hillsboro%2C%20OR%2097123!5e0!3m2!1sen!2sus!4v1745055129136!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
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
          <div className="text-sm flex flex-col justify-center space-y-8 mb-10">
            <ul className="space-y-4 text-sm text-gray-800">
              <li className="flex items-center gap-2 font-semibold">
                <FiMapPin />
                1789 SE River RD, Hillsboro
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <FiPhone />
                (971) 275-2815
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <FiMail />
                littleeinstein77@yahoo.com
              </li>
              <li className="flex items-center gap-2 font-semibold">
                <FiClock />
                {t("contact.hoursValue")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
