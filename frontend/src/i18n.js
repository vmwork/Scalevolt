// src/i18n.js
import { createI18n } from 'vue-i18n';

// Import your locale messages
import en from './locales/en.json';
import ua from './locales/ua.json'; // Assuming 'ua' is Ukrainian

const i18n = createI18n({
  legacy: false, // Enable Composition API mode
  locale: 'en', // Set the default locale
  fallbackLocale: 'en', // Set the fallback locale
  messages: {
    en,
    ua,
  },
  globalInjection: true, // Optional: allows using $t in templates without importing
});

export default i18n;
