// src/i18n/index.js
import { createI18n } from 'vue-i18n';
import { ukCheckoutTranslations, plCheckoutTranslations } from './checkout-translations';

// Define translations directly in JS instead of importing JSON files
const ukLocale = {
  common: {
    home: "Головна",
    products: "Товари",
    categories: "Категорії",
    cart: "Кошик",
    profile: "Профіль",
    login: "Увійти",
    logout: "Вийти",
    register: "Зареєструватися",
    search: "Пошук",
    translation_test: "Тест перекладів",
    current_locale: "Поточна мова",
    navigation: "Навігація",
    force_refresh: "Оновити сторінку",
    ukrainian: "Українська",
    polish: "Польська",
    loading: "Завантаження продуктів...",
    noProductsFound: "У цій категорії не знайдено товарів.",
    category: "Категорія",
    remove: "Видалити"
  },
  // Include other UK translations here
};

const plLocale = {
  common: {
    home: "Strona główna",
    products: "Produkty",
    categories: "Kategorie",
    cart: "Koszyk",
    profile: "Profil",
    login: "Zaloguj się",
    logout: "Wyloguj się",
    register: "Zarejestruj się",
    search: "Szukaj",
    translation_test: "Test tłumaczeń",
    current_locale: "Aktualny język",
    navigation: "Nawigacja",
    force_refresh: "Odśwież stronę",
    ukrainian: "Ukraiński",
    polish: "Polski",
    loading: "Ładowanie produktów...",
    noProductsFound: "Nie znaleziono produktów w tej kategorii.",
    category: "Kategoria",
    remove: "Usuń"
  },
  // Include other PL translations here
};

const enLocale = {
  common: {
    home: "Home",
    products: "Products",
    categories: "Categories",
    cart: "Cart",
    profile: "Profile",
    login: "Login",
    logout: "Logout",
    register: "Register",
    search: "Search",
    translation_test: "Translation Test",
    current_locale: "Current Language",
    navigation: "Navigation",
    force_refresh: "Refresh Page",
    ukrainian: "Ukrainian",
    polish: "Polish",
    loading: "Loading products...",
    noProductsFound: "No products found in this category.",
    category: "Category",
    remove: "Remove"
  },
  // Include other EN translations here
};

// Function to detect and set initial locale
const detectLocale = () => {
  // Check saved locale first
  const savedLocale = localStorage.getItem('userLocale');
  if (savedLocale && ['uk', 'pl', 'en'].includes(savedLocale)) {
    return savedLocale;
  }

  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'pl') return 'pl';
  if (browserLang === 'en') return 'en';
  return 'uk'; // Ukrainian as default
};

// Merge checkout translations with main locale data
const messages = {
  uk: { ...ukLocale, ...ukCheckoutTranslations },
  pl: { ...plLocale, ...plCheckoutTranslations },
  en: enLocale
};

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Composition API mode
  locale: detectLocale(),
  fallbackLocale: 'en', // Using English as fallback
  messages,
  warnHtmlMessage: false,
  numberFormats: {
    'uk': {
      currency: {
        style: 'currency',
        currency: 'UAH',
        notation: 'standard'
      }
    },
    'pl': {
      currency: {
        style: 'currency', 
        currency: 'PLN',
        notation: 'standard'
      }
    },
    'en': {
      currency: {
        style: 'currency', 
        currency: 'USD',
        notation: 'standard'
      }
    }
  }
});

// Set document language attribute
document.documentElement.setAttribute('lang', i18n.global.locale.value);

// Locale switching utility
const setLocale = (locale) => {
  if (!['uk', 'pl', 'en'].includes(locale)) {
    console.error('Invalid locale:', locale);
    return;
  }
  
  i18n.global.locale.value = locale;
  localStorage.setItem('userLocale', locale);
  document.documentElement.setAttribute('lang', locale);
  
  // Dispatch locale change event
  window.dispatchEvent(new CustomEvent('locale-changed', {
    detail: { locale }
  }));
};

// Debug function
const debugI18n = () => {
  console.log('Current locale:', i18n.global.locale.value);
  console.log('Available locales:', Object.keys(messages));
  
  // Use path that exists in all locales for testing
  console.log('Sample home (UK):', i18n.global.t('common.home', [], { locale: 'uk' }));
  console.log('Sample home (PL):', i18n.global.t('common.home', [], { locale: 'pl' }));
  console.log('Sample home (EN):', i18n.global.t('common.home', [], { locale: 'en' }));
};

export { i18n, setLocale, debugI18n };
export default i18n;