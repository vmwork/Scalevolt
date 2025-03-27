import { createApp, watch, ref } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createI18n } from 'vue-i18n';
import { auth } from '@/firebase';
import uk from '@/i18n/locales/uk.json';
import pl from '@/i18n/locales/pl.json';
import './style.css';
import { getUserCurrencyPreference } from '@/services/currency';

// ✅ Add favicon programmatically to prevent 404 errors
const addFavicon = () => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = '/favicon.ico';
  document.head.appendChild(link);
};

// ✅ Automatically re-authenticate users on refresh
const setupFirebaseAuth = (app) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('✅ User is logged in:', user);
    } else {
      console.log('🚨 User is signed out');
    }
    
    // ✅ Mount the app AFTER firebase confirms auth status
    app.mount('#app');
  });
};

// ✅ Configure the i18n (Multi-language)
const savedLocale = localStorage.getItem('userLocale') || 'uk';
console.log('Initializing with locale:', savedLocale);

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'uk',
  messages: { uk, pl }, // Include all your languages
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
    'ua': {
      currency: {
        style: 'currency',
        currency: 'UAH',
        notation: 'standard'
      }
    },
  }
});

// Set document language attribute based on saved locale
document.documentElement.setAttribute('lang', savedLocale);

// ✅ Configure the Toast Notifications
const toastOptions = {
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true
};

// ✅ Enhanced Error Handler (Professional Error Page)
const globalErrorHandler = (err, instance, info) => {
  console.error('🚨 Vue Error:', err, '\nComponent:', instance?.$options?.name, '\nInfo:', info);
  document.getElementById('app').innerHTML = `
    <div style="color: red; padding: 20px;">
      <h2>⚠️ Application Error</h2>
      <p>${err.toString()}</p>
      <p><strong>Component:</strong> ${instance?.$options?.name || 'Unknown'}</p>
    </div>
  `;
};

// ✅ Initialize the Vue App with Plugins
const initializeApp = () => {
  try {
    const app = createApp(App);
    const pinia = createPinia();
    
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('userLocale');
    if (savedLocale) {
      i18n.global.locale.value = savedLocale;
    }
    
    // Correctly watch for locale changes
    app.config.globalProperties.$locale = ref(i18n.global.locale.value);
    
    // Set up a watcher for locale changes
    watch(() => i18n.global.locale.value, (newLocale) => {
      document.documentElement.setAttribute('lang', newLocale);
      localStorage.setItem('userLocale', newLocale);
      app.config.globalProperties.$locale.value = newLocale;
      
      // Update currency based on locale if user hasn't explicitly set it
      if (!localStorage.getItem('userCurrency')) {
        const newCurrency = newLocale === 'pl' ? 'PLN' : 'UAH';
        app.config.globalProperties.$currencyStore.value.currentCurrency = newCurrency;
        localStorage.setItem('userCurrency', newCurrency);
      }
    });
    
    // Add currency store
    const currencyStore = ref({
      currentCurrency: getUserCurrencyPreference() || 
                      (i18n.global.locale.value === 'pl' ? 'PLN' : 'UAH'),
      setCurrency(currency) {
        this.currentCurrency = currency;
        localStorage.setItem('userCurrency', currency);
      }
    });
    
    // Add currency store to both global properties and as provide/inject
    app.config.globalProperties.$currencyStore = currencyStore;
    app.provide('currencyStore', currencyStore);
    
    app.use(pinia);
    app.use(router);
    app.use(i18n);
    app.use(Toast, toastOptions);
    
    // ✅ Add a global error handler
    app.config.errorHandler = globalErrorHandler;
    
    // ✅ Handle Firebase Auth & Then Mount
    setupFirebaseAuth(app);
  } catch (error) {
    console.error('🔥 Critical App Error:', error);
    document.getElementById('app').innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>💀 Application Crash</h2>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
};

// ✅ 👇 Start everything in the correct order
addFavicon();
initializeApp();