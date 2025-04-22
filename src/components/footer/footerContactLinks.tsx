import { FiPhone, FiMail, FiGlobe, FiMapPin, FiClock } from "react-icons/fi";

const FooterContactLinks = () => {
  return (
    <ul className="space-y-4 text-sm text-gray-800 mb-4">
      <li className="flex items-center gap-2">
        <FiMapPin />
        1789 SE River RD, Hillsboro
      </li>
      <li className="flex items-center gap-2">
        <FiPhone />
        (123) 345-7890
      </li>
      <li className="flex items-center gap-2">
        <FiMail />
        temp_email_@gmail.com
      </li>
      <li className="flex items-center gap-2">
        <FiGlobe />
        <a href="http://localhost:5173">http://localhost:5173</a>
      </li>
      <li className="flex items-center gap-2">
        <FiClock />
        Mon–Fri: 7:00 am – 5:30 pm
      </li>
    </ul>
  );
};

export default FooterContactLinks;
