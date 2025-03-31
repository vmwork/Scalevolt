<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Products Section -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('products') }}</h3>
        <ul>
          <li><a href="#">{{ getLocalizedText('sale') }}</a></li>
          <li>
            <router-link to="/Sets-of-solar-power-plants">
              {{ getLocalizedText('solarSets') }}
            </router-link>
          </li>
          <li><a href="#">{{ getLocalizedText('batteries') }}</a></li>
          <li><a href="#">{{ getLocalizedText('inverters') }}</a></li>
          <li><a href="#">{{ getLocalizedText('customerSupport') }}</a></li>
        </ul>
      </div>

      <!-- About Us Section -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('aboutUs') }}</h3>
        <ul>
          <li>
            <router-link to="/company">{{ getLocalizedText('about') }}</router-link>
          </li>
          <li><a href="#">{{ getLocalizedText('ourTeam') }}</a></li>
          <li>
            <router-link to="/customer-cases">{{ getLocalizedText('cases') }}</router-link>
          </li>
          <li><a href="#">{{ getLocalizedText('contactUs') }}</a></li>
          <a href="mailto:scalevolt.info@gmail.com">scalevolt.info@gmail.com</a>
        </ul>
      </div>

      <!-- Support Section -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('support') }}</h3>
        <ul>
          <li><a href="#">{{ getLocalizedText('faq') }}</a></li>
          <li>
            <router-link to="/delivery-warranty-returns">
              {{ getLocalizedText('deliveryTitle') }}
            </router-link>
          </li>
          <li>
            <router-link to="/privacy-policy">
              {{ getLocalizedText('privacyTitle') }}
            </router-link>
          </li>
          <li><a href="#">{{ getLocalizedText('customerSupport') }}</a></li>
        </ul>
      </div>

      <!-- Legal Section -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('legalInfo') }}</h3>
        <ul>
          <li>
            <router-link to="/legal-terms">{{ getLocalizedText('terms') }}</router-link>
          </li>
          <li>
            <router-link to="/privacy-policy">{{ getLocalizedText('privacy') }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Career Section -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('career') }}</h3>
        <ul class="promises-list">
          <li>{{ getLocalizedText('jobs') }}</li>
        </ul>
      </div>

      <!-- Social Media & Apps -->
      <div class="footer-section">
        <h3>{{ getLocalizedText('followUs') }}</h3>
        <div class="social-icons">
          <a href="#" aria-label="Telegram">
            <img src="/images/Footer/telegram-icon.svg" alt="Telegram">
          </a>
          <a href="#" aria-label="Instagram">
            <img src="/images/Footer/instagram-icon.svg" alt="Instagram">
          </a>
          <a href="#" aria-label="Youtube">
            <img src="/images/Footer/youtube-icon.svg" alt="Youtube">
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>{{ getLocalizedText('copyright', { year: new Date().getFullYear() }) }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentLocale: localStorage.getItem('userLocale') || 'uk'
    };
  },
  created() {
    // Check locale on component creation
    this.updateLocale();
  },
  mounted() {
    console.log('Footer mounted with locale:', this.currentLocale);
    
    // Add multiple event listeners to catch all possible locale change events
    window.addEventListener('locale-changed', this.handleLocaleChange);
    window.addEventListener('storage', this.handleStorageChange);
    
    // Debug - check available translations
    console.log('Available translations for Polish (sample):', 
      this.getLocalizedText('products', null, 'pl'));
  },
  beforeUnmount() {
    window.removeEventListener('locale-changed', this.handleLocaleChange);
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    updateLocale() {
      // Get locale from localStorage and update component
      const storedLocale = localStorage.getItem('userLocale');
      if (storedLocale && (storedLocale === 'uk' || storedLocale === 'pl')) {
        console.log('Footer updating locale to:', storedLocale);
        this.currentLocale = storedLocale;
      } else {
        console.log('No valid locale found, defaulting to uk');
        this.currentLocale = 'uk';
      }
    },
    handleLocaleChange(event) {
      console.log('Footer detected locale-changed event:', event.detail);
      this.updateLocale();
      this.$forceUpdate();
    },
    handleStorageChange(event) {
      // Listen for changes to localStorage across tabs
      if (event.key === 'userLocale') {
        console.log('Footer detected localStorage change:', event.newValue);
        this.updateLocale();
        this.$forceUpdate();
      }
    },
    getLocalizedText(key, params, forcedLocale) {
      // Standalone translation system with more debug info
      const translations = {
        uk: {
          // Ukrainian translations
          products: "Продукти",
          sale: "Розпродаж",
          solarSets: "Сонячні набори",
          batteries: "Акумулятори",
          inverters: "Інвертори",
          customerSupport: "Підтримка клієнтів",
          aboutUs: "Про Нас",
          about: "Про нас",
          ourTeam: "Наша Команда",
          cases: "Кейси клієнтів",
          contactUs: "Зв'яжіться з нами",
          support: "Підтримка",
          faq: "Запитання й відповіді",
          legalInfo: "Юридична інформація",
          terms: "Умови використання",
          privacy: "Політика конфіденційності",
          career: "Кар'єра",
          jobs: "Вакансії",
          followUs: "Слідкуйте за нами",
          deliveryTitle: "Доставка, Гарантія та Повернення",
          privacyTitle: "Політика конфіденційності",
          copyright: "© {year} ScaleVolt. Всі права захищені."
        },
        pl: {
          // Polish translations
          products: "Produkty",
          sale: "Wyprzedaż",
          solarSets: "Zestawy słoneczne",
          batteries: "Akumulatory",
          inverters: "Falowniki",
          customerSupport: "Obsługa klienta",
          aboutUs: "O Nas",
          about: "O nas",
          ourTeam: "Nasz Zespół",
          cases: "Przypadki klientów",
          contactUs: "Skontaktuj się z nami",
          support: "Wsparcie",
          faq: "Pytania i odpowiedzi",
          legalInfo: "Informacje prawne",
          terms: "Warunki korzystania",
          privacy: "Polityka prywatności",
          career: "Kariera",
          jobs: "Oferty pracy",
          followUs: "Obserwuj nas",
          deliveryTitle: "Dostawa, Gwarancja i Zwroty",
          privacyTitle: "Polityka prywatności",
          copyright: "© {year} ScaleVolt. Wszelkie prawa zastrzeżone."
        }
      };

      // Get translation based on current locale or forced locale
      const localeToUse = forcedLocale || this.currentLocale;
      const translation = translations[localeToUse];
      
      if (!translation) {
        console.error(`No translations available for locale: ${localeToUse}`);
        return key;
      }
      
      let text = translation[key];
      
      if (!text) {
        console.warn(`Translation missing for key: ${key} in locale: ${localeToUse}`);
        return key;
      }

      // Replace parameters
      if (params) {
        for (const param in params) {
          text = text.replace(`{${param}}`, params[param]);
        }
      }

      return text;
    }
  },
  // Watch for props or data changes that should trigger updates
  watch: {
    '$route'() {
      // Update locale when route changes
      this.updateLocale();
    }
  }
};
</script>

<style scoped>
.site-footer {
  background-color: #333;
  color: #ffffff;
  font-size: 14px;
  padding: 20px;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
}

@media (max-width: 800px) {
  .footer-section {
    flex: 1 1 100%;
  }

  .footer-container {
    justify-content: flex-start;
  }
}

.footer-section {
  flex: 1 1 180px;
  margin: 10px;
}

.footer-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #ffffff;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ffffff;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.footer-section ul li a:hover {
  opacity: 1;
  text-decoration: underline;
}

/* Promises List styling */
.promises-list li {
  margin-bottom: 8px;
}

/* Social Icons */
.social-icons a {
  display: inline-block;
  margin-right: 10px;
}

.social-icons img {
  width: 24px;
  height: 24px;
}

/* Footer bottom */
.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 10px;
  text-align: center;
  font-size: 13px;
  opacity: 0.8;
}

/* Responsive Adjustments */
@media (max-width: 800px) {
  .footer-section {
    flex: 1 1 100%;
  }
  .footer-container {
    justify-content: flex-start;
  }
}
</style>