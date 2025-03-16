import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createI18n } from 'vue-i18n';
import { auth } from '@/firebase';
import en from '@/locales/en.json';
import ua from '@/locales/ua.json';
import './style.css';

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
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ua },
  warnHtmlMessage: false
});

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
