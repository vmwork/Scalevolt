<template>
  <header class="header-container">
    <div class="header-content">
      <!-- LEFT SECTION -->
      <div class="left-section">
        <!-- Hamburger Menu Icon -->
        <div class="hamburger-container" @click="toggleMenu">
          <button class="hamburger-menu" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      <!-- Dropdown Menu -->
      <div v-if="menuVisible" class="dropdown-menu">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="dropdown-item"
        >
          <router-link :to="item.link" class="menu-item">
            <img :src="item.img" :alt="item.label" class="menu-item-icon" />
            <span>{{ item.label }}</span>
          </router-link>
        </div>
      </div>

      <!-- Logo in the center -->
      <div class="/images/header/logo-container">
        <router-link to="/">
          <img
            src="/images/header/scalevolt-logo.png"
            alt="Scalevolt Logo"
            class="logo"
          />
        </router-link>
      </div>
    </div>


      <!-- CENTER: The search bar -->
      <div class="search-bar-wrapper">
        <SearchBar
          class="my-search-bar"
          :allProducts="allProducts"
          @search-selected="handleSearchSelected"
        />
      </div>

       <!-- RIGHT SECTION: Icon Links, Region Selector, etc. -->
       <div class="right-section">
        <ul class="icon-links">
          <li class="header-item">
            <div class="icon-text">
              <router-link v-if="!user" to="/login" class="icon-text">
                <img src="/images/header/profile-logo.svg" alt="Account" />
              </router-link>
              <router-link v-else to="#" class="icon-text">
                <img src="/images/header/profile-logo.svg" alt="Account" />
                <!-- <span>{{ user.displayName }}</span> -->
              </router-link>
            </div>
          </li>
          <li class="header-item">
            <div class="icon-text">
              <router-link to="/cart" class="icon-text">
                <img src="/images/header/cart.svg" alt="Cart" />
              </router-link>
              <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
            </div>
          </li>

          <!-- Region Selector -->
          <div class="region-selector" @click="toggleRegionMenu">
            <span class="lang-code">{{ currentLocale }}</span>
            <div class="region-icon-container">
              <img src="/images/header/globe-icon.svg" alt="Region Icon" class="region-icon" />
            </div>
          </div>

          <!-- Region Dropdown Menu -->
          <div v-if="regionMenuVisible" class="region-dropdown">
            <div class="region-option" @click="selectRegion('en')">
              <span class="language">English</span>
            </div>
            <div class="region-option" @click="selectRegion('ua')">
              <span class="language">Українська</span>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
} from 'vue'
import { useRoute, useRouter } from 'vue-router' // Import useRouter
import SearchBar from '@/components/SearchBar.vue' // Adjust the path as necessary
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
// 1) Import useI18n from vue-i18n
import { useI18n } from 'vue-i18n'
import axios from 'axios' // Import Axios

export default {
  name: 'Header',
  components: { SearchBar },
  setup() {
    const route = useRoute()
    const router = useRouter() // Initialize router
    const menuVisible = ref(false)
    const regionMenuVisible = ref(false)
    const selectedRegion = ref('United States') // Default region

    // Initialize cartStore
    const cartStore = useCartStore()

    // Initialize userStore
    const userStore = useUserStore()
    const user = computed(() => userStore.user)

    // 2) Destructure { locale } from useI18n()
    const { locale } = useI18n()

    // Cart count computed property
    const cartCount = computed(() => cartStore.totalQuantity)

    // Determine if current route is home page
    const isHomePage = computed(() => route.path === '/')

    // Example array of menu items, each with label, link, and image
    // Adjust the paths (e.g. '@/assets/icons/solar-panels.svg') as needed for your project
    const menuItems = [
      {
        label: 'Сонячні Панелі',
        link: '/solar-panels',
        img: new URL('/solar-panels.png', import.meta.url).href,
      },
      {
        label: 'Зарядки',
        link: '/charging',
        img: new URL('/ev-charger-city.webp', import.meta.url).href,
      },
      {
        label: 'Автоматичні вимикачі',
        link: '/automatic-switches',
        img: new URL('/images/1.jpg', import.meta.url).href,
      },
      {
        label: 'Кабелі електричні та дроти',
        link: '/cables-wires',
        img: new URL('/images/2.jpg', import.meta.url).href, // Fixed URL string
      },
    ]

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value
      // Close region menu if open
      if (regionMenuVisible.value) regionMenuVisible.value = false
    }

    const toggleRegionMenu = () => {
      regionMenuVisible.value = !regionMenuVisible.value
      // Close hamburger menu if open
      if (menuVisible.value) menuVisible.value = false
    }

    // 3) Correctly handle locale switching inside selectRegion
    const selectRegion = region => {
      selectedRegion.value = region
      regionMenuVisible.value = false

      // Switch locale based on the region you pick
      // (Assuming "Ukraine" maps to "ua" and everything else is "en")
      if (region === 'Ukraine') {
        locale.value = 'ua' // use your i18n locale code
      } else {
        locale.value = 'en'
      }
    }

    const closeMenusOnOutsideClick = event => {
      const instance = getCurrentInstance()
      if (instance && !instance.proxy.$el.contains(event.target)) {
        menuVisible.value = false
        regionMenuVisible.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeMenusOnOutsideClick)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenusOnOutsideClick)
    })

    // 4) Define handleSearchSelected
    const handleSearchSelected = product => {
      // Navigate to the product detail page
      // Assuming you have a route like /products/:id
      router.push(`/products/${product.id}`)
    }

    // Example array of products for search (replace with your actual data or fetch from API)
    const allProducts = ref([
      { id: 1, name: 'Сонячна Панель A' },
      { id: 2, name: 'Зарядка X' },
      { id: 3, name: 'Автоматичний вимикач Y' },
      // ... more products ...
    ])

    return {
      menuVisible,
      regionMenuVisible,
      cartCount,
      selectedRegion,
      toggleMenu,
      toggleRegionMenu,
      selectRegion,
      isHomePage,
      user,
      menuItems, // Ensure menuItems is available in the template
      handleSearchSelected, // Now defined
      allProducts, // Pass allProducts to SearchBar
    }
  },
}
</script>

<style scoped>
.header-container {
  width: 100%;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0;          /* Remove default margins */
  /* Optional global padding
     padding: 20px; 
  */
}

/* 
  KEY CHANGE: 
  - Added max-width: 1280px
  - margin: 0 auto to center .header-content
*/
.header-content {
  display: grid;
  grid-template-columns: auto 2fr auto; 
  align-items: center;
  width: 100%;         /* Let it span the full screen width */
  padding: 10px 20px;  /* Some horizontal padding */
  box-sizing: border-box;
  gap: 20px;           /* Space between columns */
}

/* Left section: we want them hugging the left side (within this grid column) */
.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* The search bar in the middle column */
.search-bar-wrapper {
  width: 100%;        /* Fill the middle column */
  max-width: 800px;   /* Optional cap on how wide it can grow */
  margin: 0 auto;     /* Center it within the middle column if needed */
}

/* Right section: icons, region selector, etc. hugging the right side */
.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* optional if you want them truly at the far right */
}


/* Hamburger Menu Styles */
.hamburger-menu {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  padding: 0;
}

.hamburger-menu span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333333; /* Changed from white to dark for visibility */
  transition: 0.2s;
}

/* Hamburger Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 60px; /* Adjust based on header height */
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999; /* Ensure it appears above other elements */
  width: 100%;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border-radius: 0; /* Remove border radius to match header's width */
}

.dropdown-item {
  margin-bottom: 10px; /* Slight spacing between items */
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px; /* space between the icon and label */
  padding: 10px 20px;
  color: #333333;
  text-decoration: none;
  border-radius: 5px;
}

.menu-item:hover {
  background-color: #f0f0f0;
  color: #007bff;
}

.menu-item-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* Logo Styles */
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 90px;
  margin-right: 5px;
  display: inline-block; /* Ensure the logo is visible */
}

/* Search Bar Styles */
.search-container {
  flex: 1; /* Allow the search bar to take up remaining space */
  margin: 0 10px;
}

.search-container input {
  width: 100%;
  max-width: 100%; /* Remove max-width to allow full expansion */
  padding: 15px 20px;
  border-radius: 15px;
  border: none;
  outline: none;
  font-size: 18px;
  background-color: #f0f0f0; /* Slightly greyed for better contrast */
  color: #333333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* (search-bar-wrapper is already above) */

/* Icon Links Styles */
.icon-links {
  display: flex;
  gap: 20px;
  position: relative; /* To position cart count badge correctly */
}

.header-item {
  display: flex;
  align-items: center;
  position: relative; /* For cart count badge positioning */
}

.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center icon and text vertically */
  text-decoration: none;
  color: #333333;
}

.icon-link img {
  width: 24px;
  height: 24px;
}

.icon-link span {
  font-size: 12px;
  margin-top: 2px;
}

/* Cart count badge */
.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 10px;
  position: absolute;
  top: -5px;
  right: -10px;
  z-index: 1002; /* Ensures it appears above dropdown menus */
}

.region-selector {
  display: flex;
  align-items: center;
  gap: 8px; /* space between EN and the icon */
  cursor: pointer;
}

.lang-code {
  font-size: 12px;
  color: #333333;
}

.region-icon-container {
  width: 24px;
  height: 24px;
  border: 1px solid #333333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.region-icon {
  width: 16px;
  height: 16px;
}

/* Region Dropdown Menu Styles */
.region-dropdown {
  position: absolute;
  top: 60px; /* Adjust based on header height */
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.region-option {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  color: #333333;
  cursor: pointer;
  border-bottom: 1px solid #eaeaea;
}

.region-option:last-child {
  border-bottom: none;
}

.region-option:hover {
  background-color: #f0f0f0;
  color: #007bff;
}

.language {
  font-size: 12px;
  color: #666666;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .dropdown-menu,
  .region-dropdown {
    padding: 15px;
    width: 100%;
    top: 50px; /* Adjusted position for smaller screens */
  }

  .menu-item,
  .region-option {
    padding: 8px 15px; /* Reduced padding for smaller screens */
  }

  .search-container {
    display: none; /* Hide search bar on smaller screens */
  }

  .icon-links {
    gap: 10px;
  }

  .logo-container h2 {
    display: none; /* Hide "Delivery" text on smaller screens */
  }
}
</style>
