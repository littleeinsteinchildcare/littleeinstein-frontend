import { useRef } from "react";
import NavItemSet from "./navItemSet";
import LanguageSelector from "./languageSelector";

type Props = {
  menuOpen: boolean;
};

const MobileMenu = ({ menuOpen }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={contentRef}
      className={`md:hidden transition-[max-height] duration-500 ease-in-out z-50 relative ${
        menuOpen ? "overflow-visible" : "overflow-hidden"
      }`}
      style={{
        maxHeight: menuOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
      }}
    >
      <div
        className={`transition-all duration-600 ease-in-out transform ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        } flex flex-col items-center bg-[#94EE8F] py-2`}
      >
        <NavItemSet />
        <LanguageSelector />
      </div>
    </div>
  );
};

export default MobileMenu;
