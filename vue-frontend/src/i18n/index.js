// src/i18n/index.js
import { createI18n } from 'vue-i18n';

// Import locale files
// Update these paths if your JSON files are stored elsewhere
const ukLocale = {
  "common": {
    "home": "Головна",
    "products": "Товари",
    "categories": "Категорії",
    "cart": "Кошик",
    "profile": "Профіль",
    "login": "Увійти",
    "logout": "Вийти",
    "register": "Зареєструватися",
    "search": "Пошук"
  },
  "product": {
    "price": "Ціна",
    "quantity": "Кількість",
    "available": "В наявності",
    "outOfStock": "Немає в наявності",
    "addToCart": "Додати в кошик",
    "specifications": "Характеристики",
    "description": "Опис",
    "relatedProducts": "Схожі товари"
  },
  "cart": {
    "yourCart": "Ваш кошик",
    "empty": "Ваш кошик порожній",
    "continueShopping": "Продовжити покупки",
    "subtotal": "Проміжний підсумок",
    "shipping": "Доставка",
    "total": "Разом",
    "checkout": "Оформити замовлення"
  },
  "checkout": {
    "shippingAddress": "Адреса доставки",
    "billingAddress": "Платіжна адреса",
    "paymentMethod": "Спосіб оплати",
    "orderSummary": "Підсумок замовлення",
    "placeOrder": "Замовити"
  },
  "profile": {
    "account_details": "Інформація про акаунт",
    "account_settings": "Налаштування акаунту",
    "email": "Електронна пошта",
    "joined_date": "Дата реєстрації",
    "email_notifications": "Сповіщення на пошту",
    "dark_mode": "Темна тема",
    "update_profile": "Оновити профіль",
    "logout": "Вийти",
    "order_history": "Історія замовлень",
    "no_orders_yet": "У вас ще немає замовлень",
    "start_shopping": "Почати покупки",
    "order_number": "Номер замовлення",
    "order_status_pending": "Очікує обробки",
    "order_status_processing": "Обробляється",
    "order_status_shipped": "Відправлено",
    "order_status_delivered": "Доставлено",
    "order_status_cancelled": "Скасовано",
    "quantity": "Кількість",
    "subtotal": "Проміжний підсумок",
    "shipping": "Доставка",
    "total": "Разом",
    "view_details": "Деталі",
    "reorder": "Замовити знову",
    "load_more_orders": "Завантажити більше замовлень"
  },
  "solar_components": {
    "solar_panels": "Сонячні панелі",
    "batteries": "Акумулятори",
    "inverters": "Інвертори",
    "mounting_systems": "Системи кріплення",
    "charging_stations": "Зарядні станції",
    "cables_wires": "Кабелі та дроти",
    "power_plants": "Комплекти сонячних електростанцій",
    "portable_stations": "Портативні електростанції",
    "portable_panels": "Портативні сонячні панелі"
  },
  "footer": {
    "company": "Компанія",
    "about": "Про нас",
    "contact": "Контакти",
    "terms": "Умови використання",
    "privacy": "Політика конфіденційності",
    "copyright": "© 2025 ScaleVolt. Всі права захищені."
  }
};

const plLocale = {
  "common": {
    "home": "Strona główna",
    "products": "Produkty",
    "categories": "Kategorie",
    "cart": "Koszyk",
    "profile": "Profil",
    "login": "Zaloguj się",
    "logout": "Wyloguj się",
    "register": "Zarejestruj się",
    "search": "Szukaj"
  },
  "product": {
    "price": "Cena",
    "quantity": "Ilość",
    "available": "Dostępny",
    "outOfStock": "Niedostępny",
    "addToCart": "Dodaj do koszyka",
    "specifications": "Specyfikacje",
    "description": "Opis",
    "relatedProducts": "Podobne produkty"
  },
  "cart": {
    "yourCart": "Twój koszyk",
    "empty": "Twój koszyk jest pusty",
    "continueShopping": "Kontynuuj zakupy",
    "subtotal": "Suma częściowa",
    "shipping": "Dostawa",
    "total": "Razem",
    "checkout": "Do kasy"
  },
  "checkout": {
    "shippingAddress": "Adres dostawy",
    "billingAddress": "Adres rozliczeniowy",
    "paymentMethod": "Metoda płatności",
    "orderSummary": "Podsumowanie zamówienia",
    "placeOrder": "Złóż zamówienie"
  },
  "profile": {
    "account_details": "Szczegóły konta",
    "account_settings": "Ustawienia konta",
    "email": "Email",
    "joined_date": "Data dołączenia",
    "email_notifications": "Powiadomienia email",
    "dark_mode": "Tryb ciemny",
    "update_profile": "Aktualizuj profil",
    "logout": "Wyloguj się",
    "order_history": "Historia zamówień",
    "no_orders_yet": "Nie masz jeszcze żadnych zamówień",
    "start_shopping": "Rozpocznij zakupy",
    "order_number": "Numer zamówienia",
    "order_status_pending": "Oczekujące",
    "order_status_processing": "W trakcie realizacji",
    "order_status_shipped": "Wysłane",
    "order_status_delivered": "Dostarczone",
    "order_status_cancelled": "Anulowane",
    "quantity": "Ilość",
    "subtotal": "Suma częściowa",
    "shipping": "Dostawa",
    "total": "Suma",
    "view_details": "Szczegóły",
    "reorder": "Zamów ponownie",
    "load_more_orders": "Załaduj więcej zamówień"
  },
  "solar_components": {
    "solar_panels": "Panele słoneczne",
    "batteries": "Akumulatory",
    "inverters": "Falowniki",
    "mounting_systems": "Systemy montażowe",
    "charging_stations": "Stacje ładowania",
    "cables_wires": "Kable i przewody",
    "power_plants": "Zestawy elektrowni słonecznych",
    "portable_stations": "Przenośne elektrownie",
    "portable_panels": "Przenośne panele słoneczne"
  },
  "footer": {
    "company": "Firma",
    "about": "O nas",
    "contact": "Kontakt",
    "terms": "Warunki korzystania",
    "privacy": "Polityka prywatności",
    "copyright": "© 2025 ScaleVolt. Wszelkie prawa zastrzeżone."
  }
};

// Get user's saved locale or use browser language as fallback
const savedLocale = localStorage.getItem('userLocale');
const browserLang = navigator.language.split('-')[0];
const defaultLocale = savedLocale || (browserLang === 'pl' ? 'pl' : 'uk');

export const i18n = createI18n({
  legacy: false, // You must set `false`, to use Composition API
  locale: defaultLocale,
  fallbackLocale: 'uk',
  messages: {
    uk: ukLocale,
    pl: plLocale
  },
  numberFormats: {
    'uk': {
      currency: {
        style: 'currency',
        currency: 'UAH',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    },
    'pl': {
      currency: {
        style: 'currency', 
        currency: 'PLN',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      percent: {
        style: 'percent',
        useGrouping: false
      }
    }
  },
  datetimeFormats: {
    'uk': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'pl': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
});

// Set document language attribute
document.documentElement.setAttribute('lang', defaultLocale);

export default i18n;