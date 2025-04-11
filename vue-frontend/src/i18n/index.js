import { createI18n } from "vue-i18n";

// ✅ Configure the i18n (Multi-language)
const savedLocale = localStorage.getItem("userLocale") || "uk";
console.log("Initializing with locale:", savedLocale);

// Define Ukrainian translations
const ukTranslations = {
  hello: "Привіт",
  welcome: "Ласкаво просимо",
  login: {
    title: "Ласкаво просимо назад",
    subtitle: "Будь ласка, увійдіть, щоб продовжити.",
    tabLabel: "Вхід",
    googleBtn: "Продовжити з Google",
    appleBtn: "Продовжити з Apple",
    emailBtn: "Увійти за допомогою Email",
    emailPlaceholder: "Електронна пошта",
    passwordPlaceholder: "Пароль",
    forgotPassword: "Забули пароль?",
    enterEmailForReset: "Введіть вашу електронну пошту для скидання паролю",
    resetEmailSent: "Лист з інструкціями надіслано на вашу пошту",
    noAccount: "Не маєте облікового запису?",
    signUp: "Зареєструватися",
    terms: "Продовжуючи, ви погоджуєтеся з нашими",
    termsLink: "Умовами використання",
    privacyLink: "Політикою конфіденційності",
    and: "та",
  },
  register: {
    title: "Створити обліковий запис",
    subtitle: "Зареєструйтеся, щоб почати користуватися.",
    tabLabel: "Реєстрація",
    googleBtn: "Продовжити з Google",
    appleBtn: "Продовжити з Apple",
    nameLabel: "Ім'я",
    namePlaceholder: "Введіть ваше ім'я",
    confirmPasswordLabel: "Підтвердіть пароль",
    confirmPasswordPlaceholder: "Введіть пароль ще раз",
    submitBtn: "Зареєструватися",
    hasAccount: "Вже маєте обліковий запис?",
    signIn: "Увійти",
    passwordMismatch: "Паролі не співпадають",
  },
  common: {
    or: "або",
    emailLabel: "Електронна пошта",
    passwordLabel: "Пароль",
  },
  product: {
    brand: "Бренд",
    addToCart: "Додати в кошик",
    rent: "Орендувати",
    durations: {
      day: "День",
      week: "Тиждень",
      month: "Місяць",
    },
  },
};

// Define Polish translations
const plTranslations = {
  hello: "Cześć",
  welcome: "Witamy",
  login: {
    title: "Witamy ponownie",
    subtitle: "Zaloguj się, aby kontynuować.",
    tabLabel: "Logowanie",
    googleBtn: "Kontynuuj z Google",
    appleBtn: "Kontynuuj z Apple",
    emailBtn: "Zaloguj się za pomocą Email",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Hasło",
    forgotPassword: "Zapomniałeś hasła?",
    enterEmailForReset: "Wprowadź swój adres email, aby zresetować hasło",
    resetEmailSent: "Email z instrukcjami został wysłany",
    noAccount: "Nie masz konta?",
    signUp: "Zarejestruj się",
    terms: "Kontynuując, zgadzasz się na nasze",
    termsLink: "Warunki korzystania z usługi",
    privacyLink: "Politykę prywatności",
    and: "i",
  },
  register: {
    title: "Utwórz konto",
    subtitle: "Zarejestruj się, aby rozpocząć korzystanie.",
    tabLabel: "Rejestracja",
    googleBtn: "Kontynuuj z Google",
    appleBtn: "Kontynuuj z Apple",
    nameLabel: "Imię",
    namePlaceholder: "Wprowadź swoje imię",
    confirmPasswordLabel: "Potwierdź hasło",
    confirmPasswordPlaceholder: "Wprowadź hasło ponownie",
    submitBtn: "Zarejestruj się",
    hasAccount: "Masz już konto?",
    signIn: "Zaloguj się",
    passwordMismatch: "Hasła nie są zgodne",
  },
  common: {
    or: "lub",
    emailLabel: "Email",
    passwordLabel: "Hasło",
  },
  product: {
    brand: "Marka",
    addToCart: "Dodaj do koszyka",
    rent: "Wypożycz",
    durations: {
      day: "Dzień",
      week: "Tydzień",
      month: "Miesiąc",
    },
  },
};

// Combine translations
const messages = {
  uk: ukTranslations,
  pl: plTranslations,
};

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "uk",
  messages,
  warnHtmlMessage: false,
  numberFormats: {
    uk: {
      currency: {
        style: "currency",
        currency: "UAH",
        notation: "standard",
      },
    },
    pl: {
      currency: {
        style: "currency",
        currency: "PLN",
        notation: "standard",
      },
    },
    ua: {
      currency: {
        style: "currency",
        currency: "UAH",
        notation: "standard",
      },
    },
  },
});

// Set document language attribute based on saved locale
document.documentElement.setAttribute("lang", savedLocale);

// Helper function to debug i18n issues
const debugI18n = () => {
  console.log("Current locale:", i18n.global.locale.value);
  console.log("Available messages:", Object.keys(messages));
  console.log(
    "Sample UK translation:",
    i18n.global.t("login.title", [], { locale: "uk" })
  );
  console.log(
    "Sample PL translation:",
    i18n.global.t("login.title", [], { locale: "pl" })
  );
};

// Export i18n for use in main.js
export { i18n, debugI18n };
