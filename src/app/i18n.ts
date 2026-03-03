import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common.json";
import esCommon from "../locales/es/common.json";

export const defaultLang = "en" as const;
export const supportedLangs = ["en", "es"] as const;
export type Lang = (typeof supportedLangs)[number];

const STORAGE_KEY = "clozr_lang";

function getInitialLanguage(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "es") return saved;
  const nav = navigator.language.toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}

export function setLanguage(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  void i18n.changeLanguage(lang);
}

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      es: { common: esCommon },
    },
    lng: getInitialLanguage(),
    fallbackLng: defaultLang,
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

export default i18n;