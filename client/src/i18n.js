import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ko from './locales/ko.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';

const STORAGE_KEY = 'olle-spa-lang';
const savedLang = localStorage.getItem(STORAGE_KEY);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ko: { translation: ko },
    zh: { translation: zh },
    ja: { translation: ja },
  },
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lang) => {
  localStorage.setItem(STORAGE_KEY, lang);
});

export default i18n;
