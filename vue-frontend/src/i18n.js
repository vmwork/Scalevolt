// src/i18n.js
import { createI18n } from 'vue-i18n';

// Define checkout translations
export const ukCheckoutTranslations = {
  checkout: {
    checkout: "Оформлення замовлення",
    steps: {
      shipping: "Доставка",
      payment: "Оплата",
      review: "Перевірка"
    }
  }
};

export const plCheckoutTranslations = {
  checkout: {
    checkout: "Finalizacja zamówienia",
    steps: {
      shipping: "Dostawa",
      payment: "Płatność",
      review: "Przegląd"
    }
  }
};

// Define UK locale content
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
    remove: "Видалити",
    or: "або",
    emailLabel: "Електронна пошта",
    passwordLabel: "Пароль"
  },
  homeView: {
    residentialCommercialSolar: "Житлова та комерційна сонячна система",
    evChargersComponents: "Зарядні пристрої та компоненти для електромобілів",
    exploreNewCategories: "Досліджуйте нові категорії",
    solarPanels: "Сонячні Панелі",
    batteries: "Батареї",
    inverters: "Інвертори",
    solarSets: "Комплекти сонячних електростанцій",
    mountingSystems: "Система монтажу сонячних панелей",
    dcChargingStations: "Швидкі Зарядні Станції (DC)",
    acChargingStations: "Зарядні Станції Рівня 2 (AC)",
    portableChargingDevices: "Портативні/Мобільні Зарядні Пристрої",
    portablePowerStation: "Портативна електростанції",
    solarGenerators: "Cонячні генератори",
    portableSolarPanels: "Портативні сонячні панелі",
    cablesAndWires: "Кабелі електричні та дроти",
    generators: "Генератори",
    industrialGenerators: "Промислові генератори для важких навантажень (100 кВт+)",
    solarLightingTowers: "Освітлювальні вежі на сонячних батареях",
    liftsAndCranes: "Підйомники та Крани",
    rental: "Оренда",
    seeAll: "Переглянути всі"
  },
  login: {
    title: "Ласкаво просимо назад",
    subtitle: "Будь ласка, увійдіть, щоб продовжити."
  },
  footer: {
    company: "Компанія",
    about: "Про нас",
    contact: "Контакти",
    terms: "Умови використання",
    privacy: "Політика конфіденційності",
    copyright: "© {year} ScaleVolt. Всі права захищені.",
    products: "Продукти"
  },
  header: {
    menu: {
      solarSystem: "Сонячна система"
    }
  },
  delivery: {
    pageTitle: "Доставка, Гарантія та Повернення",
    deliveryTitle: "Доставка",
    standardDelivery: "Стандартна доставка"
  }
};

// Define PL locale content
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
    remove: "Usuń",
    or: "lub",
    emailLabel: "Email",
    passwordLabel: "Hasło"
  },
  homeView: {
    residentialCommercialSolar: "Domowe i komercyjne systemy słoneczne",
    evChargersComponents: "Ładowarki i komponenty do pojazdów elektrycznych",
    exploreNewCategories: "Odkryj nowe kategorie"
  },
  login: {
    title: "Witamy ponownie",
    subtitle: "Zaloguj się, aby kontynuować."
  },
  footer: {
    company: "Firma",
    about: "O nas",
    contact: "Kontakt",
    terms: "Warunki korzystania",
    privacy: "Polityka prywatności",
    copyright: "© {year} ScaleVolt. Wszelkie prawa zastrzeżone.",
    products: "Produkty"
  },
  header: {
    menu: {
      solarSystem: "System solarny"
    }
  },
  delivery: {
    pageTitle: "Dostawa, Gwarancja i Zwroty",
    deliveryTitle: "Dostawa",
    standardDelivery: "Standardowa dostawa"
  }
};

// Define EN locale for fallback
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
    search: "Search"
  },
  login: {
    title: "Welcome Back",
    subtitle: "Please login to continue."
  },
  footer: {
    company: "Company",
    about: "About",
    contact: "Contact",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    copyright: "© {year} ScaleVolt. All rights reserved.",
    products: "Products"
  }
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
const ukMessages = { ...ukLocale, ...ukCheckoutTranslations };
const plMessages = { ...plLocale, ...plCheckoutTranslations };

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Composition API mode
  locale: detectLocale(),
  fallbackLocale: 'en', // Using English as fallback
  messages: {
    uk: ukMessages,
    pl: plMessages,
    en: enLocale
  },
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
  console.log('Available locales:', Object.keys(i18n.global.messages.value));
  
  try {
    // Use path that exists in all locales for testing
    console.log('Sample home (UK):', i18n.global.t('common.home', [], { locale: 'uk' }));
    console.log('Sample home (PL):', i18n.global.t('common.home', [], { locale: 'pl' }));
    console.log('Sample home (EN):', i18n.global.t('common.home', [], { locale: 'en' }));
    console.log('Login title:', i18n.global.t('login.title'));
  } catch (error) {
    console.error('Error in i18n debug:', error);
  }
};

export { i18n, setLocale, debugI18n };
export default i18n;