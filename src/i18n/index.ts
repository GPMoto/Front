import translationPt from "@/i18n/locales/pt-BR/translation.json";
import translationEn from "@/i18n/locales/en/translation.json";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";

const resources = {
  "pt-BR": { translation: translationPt },
  en: { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageTag;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
