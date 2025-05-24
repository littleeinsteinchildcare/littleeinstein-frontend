import { useState } from "react";
import { useTranslation } from "react-i18next";
import { VscChevronDown } from "react-icons/vsc";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs block p-2 md:py-2 mt-2 md:mt-0 bg-white text-[#003366] border border-[#003366] hover:bg-[#2A9D8F] hover:text-white shadow-sm  font-semibold whitespace-nowrap"
      >
        {t("navbar.selectLanguage")}{" "}
        <VscChevronDown
          className={`inline-block ml-1 transform transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute right-0 w-full border-x-1 border-b bg-white text-[#003366] shadow-sm z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-left px-4 py-1 hover:bg-green-100 ${
                i18n.language === lang.code ? "font-semibold" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
