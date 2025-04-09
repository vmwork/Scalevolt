import { createApp, watch, ref } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { i18n, debugI18n } from '@/i18n'; // Import from separate i18n file
import { auth } from '@/firebase';
import './style.css';
import { getUserCurrencyPreference } from '@/services/currency';
import { useAuthStore } from './stores/auth';
import claudePlugin from './plugins/claude';

// ✅ Add favicon programmatically to prevent 404 errors
function addFavicon() {
  var link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = '/favicon.ico';
  document.head.appendChild(link);
}

// ✅ Configure the Toast Notifications
var toastOptions = {
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true
};

// ✅ Enhanced Error Handler (Professional Error Page)
function globalErrorHandler(err, instance, info) {
  console.error('🚨 Vue Error:', err, '\nComponent:', instance?.$options?.name, '\nInfo:', info);
  document.getElementById('app').innerHTML = `
    <div style="color: red; padding: 20px;">
      <h2>⚠️ Application Error</h2>
      <p>${err.toString()}</p>
      <p><strong>Component:</strong> ${instance?.$options?.name || 'Unknown'}</p>
    </div>
  `;
}

// ✅ Initialize the Vue App with Plugins
function startApp() {
  try {
    var app = createApp(App);
    var pinia = createPinia();
    
    app.use(pinia);
    
    // Initialize the auth store to connect with Firebase
    // This needs to happen AFTER pinia is installed but BEFORE app is mounted
    var authStore = useAuthStore();
    authStore.init();
    
    // Load saved locale from localStorage and ensure it's applied
    var savedLocale = localStorage.getItem('userLocale');
    if (savedLocale) {
      i18n.global.locale.value = savedLocale;
      console.log('Loaded saved locale:', savedLocale);
    }
    
    // Correctly watch for locale changes
    app.config.globalProperties.$locale = ref(i18n.global.locale.value);
    
    // Enhanced locale change handling
    watch(function() { return i18n.global.locale.value; }, function(newLocale) {
      console.log('🌍 Locale changed to:', newLocale);
      document.documentElement.setAttribute('lang', newLocale);
      localStorage.setItem('userLocale', newLocale);
      app.config.globalProperties.$locale.value = newLocale;
      
      // Debug - print a sample translation to verify it's working
      console.log('Sample translation:', i18n.global.t('login.title'));
      
      // Update currency based on locale if user hasn't explicitly set it
      if (!localStorage.getItem('userCurrency')) {
        var newCurrency = newLocale === 'pl' ? 'PLN' : 'UAH';
        app.config.globalProperties.$currencyStore.value.currentCurrency = newCurrency;
        localStorage.setItem('userCurrency', newCurrency);
      }
      
      // Trigger a custom event for components to detect
      window.dispatchEvent(new CustomEvent('locale-changed', { detail: newLocale }));
    });
    
    // Add currency store
    var currencyStore = ref({
      currentCurrency: getUserCurrencyPreference() || 
                      (i18n.global.locale.value === 'pl' ? 'PLN' : 'UAH'),
      setCurrency: function(currency) {
        this.currentCurrency = currency;
        localStorage.setItem('userCurrency', currency);
      }
    });
    
    // Add currency store to both global properties and as provide/inject
    app.config.globalProperties.$currencyStore = currencyStore;
    app.provide('currencyStore', currencyStore);
    
    // Enhanced language switching method
    app.config.globalProperties.$switchLocale = function(locale) {
      console.log('Switching locale to:', locale);
      
      // Change i18n locale
      i18n.global.locale.value = locale;
      
      // Save to localStorage
      localStorage.setItem('userLocale', locale);
      
      // Update document lang attribute
      document.documentElement.setAttribute('lang', locale);
      
      // Dispatch custom event for components
      window.dispatchEvent(new CustomEvent('locale-changed', { detail: locale }));
      
      // Force global update (optional, may be needed for some components)
      // app.config.globalProperties.$forceUpdate();
    };
    
    app.use(router);
    app.use(i18n);
    app.use(Toast, toastOptions);
    app.use(claudePlugin); // Add this line to register the plugin

    
    // ✅ Add a global error handler
    app.config.errorHandler = globalErrorHandler;
    
    // Debug i18n setup
    debugI18n();
    
    // Make i18n available globally for debugging
    window.i18n = i18n;
    
    // ✅ Handle Firebase Auth & Then Mount
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log('✅ User is logged in:', user);
      } else {
        console.log('🚨 User is signed out');
      }
      
      // ✅ Mount the app AFTER firebase confirms auth status
      app.mount('#app');
    });
  } catch (error) {
    console.error('🔥 Critical App Error:', error);
    document.getElementById('app').innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>💀 Application Crash</h2>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}

// Enhanced global methods for debugging i18n in the browser console
window.switchLanguage = function(locale) {
  console.log('Manually switching to', locale);
  i18n.global.locale.value = locale;
  localStorage.setItem('userLocale', locale);
  document.documentElement.setAttribute('lang', locale);
  
  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('locale-changed', { detail: locale }));
  
  console.log('After switch - Current locale:', i18n.global.locale.value);
  return 'Language switched to ' + locale;
};

window.checkTranslations = function() {
  const locale = i18n.global.locale.value;
  console.log('Current locale:', locale);
  console.log('Sample translation:', i18n.global.t('login.title'));
  console.log('Footer translations available?', 
    !!i18n.global.messages.value[locale]?.footer);
  return 'Checked translations for ' + locale;
};

window.reloadApp = function() {
  window.location.reload();
  return 'Reloading application...';
};

// ✅ 👇 Start everything in the correct order
addFavicon();
startApp();

// Export the startApp function for potential use in other modules
export { startApp };