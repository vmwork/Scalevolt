import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './style.css'; // Your global styles

import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ua from './locales/ua.json';

// Create Vue app instance
const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Set up Vue I18n (turn off legacy mode to remove deprecation warnings)
const i18n = createI18n({
  legacy: false, // <--- IMPORTANT: disable legacy API
  locale: 'en',  // Default locale
  fallbackLocale: 'en',
  messages: { en, ua },
});

// Register plugins with the app
app.use(pinia);
app.use(router); // Ensure the router is used
app.use(Toast);
app.use(i18n);

// Mount the app
app.mount('#app');
