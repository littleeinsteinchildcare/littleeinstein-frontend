import { ReactNode, useRef, useState } from "react";
import { VscChevronDown } from "react-icons/vsc";

type FooterAccordionProps = {
  title: string;
  children: ReactNode;
};

const FooterAccordion = ({ title, children }: FooterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-700 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-lg"
      >
        {title}
        <VscChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
};

export default FooterAccordion;
