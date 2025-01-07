import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Dynamic import of JSON files languages
import common_en from "./locales/en/common.json";
import freemium_en from "./locales/en/freemium.json";
import footer_en from "./locales/en/footer.json";
import videoPlayer_en from "./locales/en/videoPlayer.json";
import common_fr from "./locales/fr/common.json";
import freemium_fr from "./locales/fr/freemium.json";
import footer_fr from "./locales/fr/footer.json";
import videoPlayer_fr from "./locales/fr/videoPlayer.json";
import common_sp from "./locales/sp/common.json";
import freemium_sp from "./locales/sp/freemium.json";
import footer_sp from "./locales/sp/footer.json";
import videoPlayer_sp from "./locales/sp/videoPlayer.json";
// 📖...and so on for other components or pages wich we want translate

const resources = {
  en: {
    translation: {
      ...common_en,
      ...freemium_en,
      ...footer_en,
      ...videoPlayer_en,
      // INFO DEV 📖 ...spread the files to retrieve the keys easily, if the project was bigger we would make namespaces,
      // EXEMPLE: https://codesandbox.io/p/sandbox/react-i18next-http-example-forked-2ptmu?file=%2Fsrc%2Fi18n.js%3A4%2C42
    },
  },
  fr: {
    translation: {
      ...common_fr,
      ...freemium_fr,
      ...footer_fr,
      ...videoPlayer_fr,
    },
  },
  sp: {
    translation: {
      ...common_sp,
      ...freemium_sp,
      ...footer_sp,
      ...videoPlayer_sp,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
