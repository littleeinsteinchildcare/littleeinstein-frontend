import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./en";
import { es } from "./es";

const options: InitOptions = {
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(options);

export default i18n;
