import { Link } from "react-router-dom";

const NavLinkItem = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="relative font-semibold px-2 py-1 group whitespace-nowrap"
  >
    <span className="relative z-10">{label}</span>
    <span className="absolute left-1/2 bottom-0 w-0 h-1 bg-green-800 transition-all duration-300 group-hover:w-[60%] group-hover:left-[20%]"></span>
  </Link>
);

export default NavLinkItem;
