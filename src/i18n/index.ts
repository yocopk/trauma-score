import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import itTranslations from "../locales/it.json";
import enTranslations from "../locales/en.json";

const resources = {
  it: {
    translation: itTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "it", // Default language
  fallbackLng: "it",

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  // Enable debug mode during development
  debug: import.meta.env.DEV,
});

export default i18n;
