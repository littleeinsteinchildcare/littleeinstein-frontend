import { FaFacebookF, FaInstagram, FaGoogle, FaYelp } from "react-icons/fa";

const FooterConnectLinks = () => {
  return (
    <ul className="space-y-4 text-sm text-gray-800 mb-4">
      <li className="flex items-center space-x-2 hover:underline">
        <FaFacebookF />
        <a href="https://facebook.com">Facebook</a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaInstagram />
        <a href="https://instagram.com">Instagram</a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaGoogle />
        <a href="https://linkedin.com">Google</a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaYelp />
        <a href="https://youtube.com">Yelp</a>
      </li>
    </ul>
  );
};

export default FooterConnectLinks;
