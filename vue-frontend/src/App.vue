<!-- frontend/src/App.vue -->
<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <router-view></router-view>
    </div>
    <!-- Use Footer only once here -->
    <Footer />
    <ConsentBanner />
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { useI18n } from "vue-i18n";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ConsentBanner from "./components/ConsentBanner.vue";
import { useUserStore } from "./stores/user";
import { detectUserCountry, mapCountryToLocale } from "./services/geoService";
import { useProductsStore } from "./stores/products";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    ConsentBanner,
  },
  setup() {
    // const baseURL = import.meta.env.BASE_URL;
    // const baseURL = localhost;
    const baseURL = "http://localhost:3000";
    const { locale } = useI18n();
    const store = useProductsStore();
    const { autoLogin } = useUserStore();

    // Auto login from the store
    autoLogin();

    // Locale detection and product preloading on mount
    onBeforeMount(async () => {
      // Check if user has already set a preference
      const savedLocale = localStorage.getItem("userLocale");

      store.getAllProducts();
      if (!savedLocale) {
        // Show a consent dialog first
        const consentGranted = confirm(
          "Can we detect your location to provide content in your local language?"
        );

        if (consentGranted) {
          const country = await detectUserCountry();
          if (country) {
            const detectedLocale = mapCountryToLocale(country);
            locale.value = detectedLocale;
            localStorage.setItem("userLocale", detectedLocale);
            // Reload to apply language changes
            window.location.reload();
          }
        }
      }
    });

    return {
      baseURL,
    };
  },
};
</script>

<style>
.app-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  margin: 0;
  padding: 0;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  padding: 10px 0; /* Adjust padding if necessary */
}

@media (max-width: 1200px) {
  .products-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 992px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .products-container {
    grid-template-columns: 1fr;
  }
}

/* Add your header styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8; /* Light gray background for contrast */
}

header h2,
header b {
  color: #333; /* Dark text color for visibility */
  margin: 0;
}

header ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
}

header ul li {
  display: flex;
  align-items: center;
}

header ul li img {
  height: 24px;
  margin-right: 8px;
}

/* Logo Container */
.logo-container {
  display: flex;
  align-items: center;
}

/* Search Container */
.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-container .search-container input {
  width: 100%;
  max-width: 1920px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
/* Header Navigation */
header ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
}

.header-item {
  margin-left: 20px;
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-text img {
  height: 24px;
  margin-bottom: 4px;
}

.icon-text span {
  color: #333;
  font-weight: bold;
}

/* Logo Image */
.logo {
  height: 50px;
  margin-right: 10px;
}

/* Header Text */
header h2 {
  color: #333;
  margin: 0;
}
.logo {
  height: 50px;
  margin-right: 10px;
}

/* Global styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

/* Added styles to make room for the fixed header */
.main-container {
  /* padding-top: 120px; */
}
</style>
