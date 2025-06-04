import { FaFacebookF, FaInstagram, FaGoogle, FaYelp } from "react-icons/fa";

const FooterConnectLinks = () => {
  return (
    <ul className="space-y-4 text-sm text-gray-800 mb-4">
      <li className="flex items-center space-x-2 hover:underline">
        <FaFacebookF />
        <a
          href="https://www.facebook.com/Littleeinsteinchildcare"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaInstagram />
        <a
          href="https://www.instagram.com/littleeinsteinchildcare/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaGoogle />
        <a href="" target="_blank" rel="noopener noreferrer">
          Google
        </a>
      </li>
      <li className="flex items-center space-x-2 hover:underline">
        <FaYelp />
        <a
          href="https://www.yelp.com/biz/little-einstein-childcare-hillsboro?osq=Little+Einstein+childcare&override_cta=Get+pricing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yelp
        </a>
      </li>
    </ul>
  );
};

export default FooterConnectLinks;
