<template>
    <div class="region-switcher">
      <select v-model="selectedLocale" @change="changeLocale" class="region-select">
        <option value="uk">🇺🇦 Українська</option>
        <option value="pl">🇵🇱 Polski</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'RegionSwitcher',
    setup() {
      const { locale } = useI18n();
      const router = useRouter();
      const selectedLocale = ref(locale.value);
  
      const changeLocale = () => {
  // Store user preference
  localStorage.setItem('userLocale', selectedLocale.value);
        
   // Set the locale
   locale.value = selectedLocale.value;
        // Store user preference
        localStorage.setItem('userLocale', selectedLocale.value);
        
        // Update currency and other regional settings
        document.documentElement.setAttribute('lang', selectedLocale.value);
        
  const currentRoute = router.currentRoute.value;
  const pathWithoutRegion = currentRoute.path.replace(/^\/[^\/]+/, '');
  const newPath = `/${selectedLocale.value}${pathWithoutRegion || ''}`;
   
  // Navigate to the new URL with the updated region
  router.push(newPath);
};
      // Initialize locale from stored preference
      onMounted(() => {
        const storedLocale = localStorage.getItem('userLocale');
        if (storedLocale) {
          selectedLocale.value = storedLocale;
          locale.value = storedLocale;
        }
      });
  
      return {
        selectedLocale,
        changeLocale
      };
    }
  };
  </script>
  
  <style scoped>
  .region-switcher {
    display: inline-block;
    margin-left: 10px;
  }
  
  .region-select {
    padding: 5px 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    font-size: 14px;
  }
  
  :root.dark-mode .region-select {
    background-color: #333;
    color: #f0f0f0;
    border-color: #555;
  }
  </style>