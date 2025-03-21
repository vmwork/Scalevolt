<template>
  <div class="region-switcher">
    <div class="region-selector" @click.stop="toggleDropdown">
      <span class="lang-code">{{ currentLocaleDetails.emoji }} {{ currentLocale.toUpperCase() }}</span>
      <div class="region-icon-container">
        <img src="/images/header/globe-icon.svg" alt="Region Icon" class="region-icon" />
      </div>
    </div>

    <!-- Region Dropdown Menu -->
    <div v-if="dropdownVisible" class="region-dropdown" @click.stop>
      <div 
        v-for="locale in availableLocales" 
        :key="locale.code" 
        class="region-option" 
        :class="{ 'active': currentLocale === locale.code }"
        @click="selectLocale(locale.code)"
      >
        <span class="locale-emoji">{{ locale.emoji }}</span>
        <span class="language">{{ locale.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'RegionSwitcher',
  setup() {
    const { locale, availableLocales: i18nLocales } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const dropdownVisible = ref(false);
    
    // Available locales with display names and emojis
    const availableLocales = [
      { code: 'uk', name: 'Українська', emoji: '🇺🇦' },
      { code: 'pl', name: 'Polski', emoji: '🇵🇱' }
    ];
    
    // Computed property to get current locale
    const currentLocale = computed(() => locale.value);
    
    // Get details of current locale
    const currentLocaleDetails = computed(() => {
      return availableLocales.find(l => l.code === currentLocale.value) || availableLocales[0];
    });
    
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };
    
    // Close dropdown when clicking outside
    const closeDropdownOnOutsideClick = (event) => {
      if (dropdownVisible.value) {
        dropdownVisible.value = false;
      }
    };
    
    // Handle locale selection
    const selectLocale = (newLocale) => {
      if (newLocale === currentLocale.value) {
        dropdownVisible.value = false;
        return;
      }
      
      // Update locale
      locale.value = newLocale;
      
      // Store in localStorage
      localStorage.setItem('userLocale', newLocale);
      
      // Update document language
      document.documentElement.setAttribute('lang', newLocale);
      
      // Update route with new locale
      const currentPath = route.fullPath;
      const newPath = currentPath.replace(/^\/[^\/]+/, `/${newLocale}`);
      
      // Navigate to new path
      router.push(newPath);
      
      // Close dropdown
      dropdownVisible.value = false;
    };
    
    // Set up event listeners on mount
    onMounted(() => {
      document.addEventListener('click', closeDropdownOnOutsideClick);
    });
    
    // Clean up event listeners before unmount
    onBeforeUnmount(() => {
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    });
    
    return {
      currentLocale,
      currentLocaleDetails,
      availableLocales,
      dropdownVisible,
      toggleDropdown,
      selectLocale
    };
  }
};
</script>

<style scoped>
.region-switcher {
  position: relative;
  display: inline-block;
}

.region-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.region-selector:hover {
  background-color: #f5f5f5;
}

.lang-code {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.region-icon-container {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.region-icon {
  width: 16px;
  height: 16px;
}

/* Region Dropdown Menu */
.region-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  z-index: 100;
  margin-top: 5px;
  padding: 8px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.region-option {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333333;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.region-option:hover {
  background-color: #f5f5f5;
}

.region-option.active {
  background-color: #e6f0ff;
  font-weight: 500;
}

.locale-emoji {
  font-size: 16px;
}

.language {
  font-size: 14px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .region-selector {
    padding: 3px 6px;
  }
  
  .lang-code {
    font-size: 12px;
  }
  
  .region-dropdown {
    width: 180px;
  }
}
</style>