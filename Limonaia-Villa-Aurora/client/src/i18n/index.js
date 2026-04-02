import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import it from './it.json';

const savedLang = localStorage.getItem('villa_aurora_lang');
const browserLang = navigator.language?.startsWith('it') ? 'it' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    lng: savedLang || browserLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
