<template>
  <header class="header-container" ref="headerRef">
    <div class="header-content" style="display: grid; grid-template-columns: minmax(100px, auto) minmax(500px, 1fr) minmax(100px, auto); gap: 20px;">
      <!-- LEFT SECTION -->
      <div class="left-section" style="width: auto; min-width: 100px;">
        <!-- Hamburger Menu Icon -->
        <div class="hamburger-container" @click.stop="toggleMenu">
          <button class="hamburger-menu" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Mega Menu Dropdown -->
        <div v-if="menuVisible" class="dropdown-mega-menu" @click.stop>
          <div class="menu-container">
            <!-- Main Categories Column -->
            <div class="menu-categories">
              <!-- Solar System Category -->
              <div class="menu-category" 
                  :class="{ 'active': activeCategory === 'solar' }"
                  @mouseenter="activeCategory = 'solar'">
                <div class="category-header">
                  <div class="category-icon-placeholder solar-color"></div>
                  <h3>Сонячна система</h3>
                </div>
              </div>

              <!-- EV Chargers Category -->
              <div class="menu-category" 
                  :class="{ 'active': activeCategory === 'ev' }"
                  @mouseenter="activeCategory = 'ev'">
                <div class="category-header">
                  <div class="category-icon-placeholder ev-color"></div>
                  <h3>Зарядні пристрої для електромобілів</h3>
                </div>
              </div>

              <!-- Portable Power Category -->
              <div class="menu-category" 
                  :class="{ 'active': activeCategory === 'portable' }"
                  @mouseenter="activeCategory = 'portable'">
                <div class="category-header">
                  <div class="category-icon-placeholder portable-color"></div>
                  <h3>Портативна енергія</h3>
                </div>
              </div>

              <!-- Generators Category -->
              <div class="menu-category" 
                  :class="{ 'active': activeCategory === 'generators' }"
                  @mouseenter="activeCategory = 'generators'">
                <div class="category-header">
                  <div class="category-icon-placeholder generator-color"></div>
                  <h3>Генератори</h3>
                </div>
              </div>

              <!-- Electrical Components Category -->
              <div class="menu-category" 
                  :class="{ 'active': activeCategory === 'electrical' }"
                  @mouseenter="activeCategory = 'electrical'">
                <div class="category-header">
                  <div class="category-icon-placeholder electrical-color"></div>
                  <h3>Електричні компоненти</h3>
                </div>
              </div>
            </div>

            <!-- Subcategories Panel -->
            <div class="menu-subcategories">
              <!-- Solar System Subcategories -->
              <div class="subcategory-panel" v-if="activeCategory === 'solar'">
                <div class="subcategory-list">
                  <router-link 
                    v-for="item in solarSystemItems" 
                    :key="item.id" 
                    :to="getCategoryRoute(item.slug)" 
                    class="subcategory-item" 
                    @click.stop="handleMenuItemClick">
                    <img :src="item.image" :alt="item.name" class="subcategory-image" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
                <div class="featured-category">
                  <div class="featured-header">
                    <h4>Популярні сонячні рішення</h4>
                  </div>
                  <div class="featured-image">
                    <img src="/images/HomeView/solar-farm.png" alt="Solar Solutions" />
                  </div>
                </div>
              </div>

              <!-- EV Chargers Subcategories -->
              <div class="subcategory-panel" v-if="activeCategory === 'ev'">
                <div class="subcategory-list">
                  <router-link 
                    v-for="item in evChargerItems" 
                    :key="item.id" 
                    :to="getCategoryRoute(item.slug)" 
                    class="subcategory-item" 
                    @click.stop="handleMenuItemClick">
                    <img :src="item.image" :alt="item.name" class="subcategory-image" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
                <div class="featured-category">
                  <div class="featured-header">
                    <h4>Топові зарядні станції</h4>
                  </div>
                  <div class="featured-image">
                    <img src="/images/HomeView/ev-charger-city.png" alt="EV Charging Stations" />
                  </div>
                </div>
              </div>

              <!-- Portable Power Subcategories -->
              <div class="subcategory-panel" v-if="activeCategory === 'portable'">
                <div class="subcategory-list">
                  <router-link 
                    v-for="item in portablePowerItems" 
                    :key="item.id" 
                    :to="getCategoryRoute(item.slug)" 
                    class="subcategory-item" 
                    @click.stop="handleMenuItemClick">
                    <img :src="item.image" :alt="item.name" class="subcategory-image" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
                <div class="featured-category">
                  <div class="featured-header">
                    <h4>Портативні рішення для енергії</h4>
                  </div>
                  <div class="featured-image">
                    <img src="/images/HomeView/solar-panel.png" alt="Portable Power Solutions" />
                  </div>
                </div>
              </div>

              <!-- Generators Subcategories -->
              <div class="subcategory-panel" v-if="activeCategory === 'generators'">
                <div class="subcategory-list">
                  <router-link 
                    v-for="item in generatorItems" 
                    :key="item.id" 
                    :to="getCategoryRoute(item.slug)" 
                    class="subcategory-item" 
                    @click.stop="handleMenuItemClick">
                    <img :src="item.image" :alt="item.name" class="subcategory-image" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
                <div class="featured-category">
                  <div class="featured-header">
                    <h4>Генератори для будь-яких потреб</h4>
                  </div>
                  <div class="featured-image">
                    <img src="/images/HomeView/генератори.png" alt="Generators" />
                  </div>
                </div>
              </div>

              <!-- Electrical Components Subcategories -->
              <div class="subcategory-panel" v-if="activeCategory === 'electrical'">
                <div class="subcategory-list">
                  <router-link 
                    v-for="item in electricalItems" 
                    :key="item.id" 
                    :to="getCategoryRoute(item.slug)" 
                    class="subcategory-item" 
                    @click.stop="handleMenuItemClick">
                    <img :src="item.image" :alt="item.name" class="subcategory-image" />
                    <span>{{ item.name }}</span>
                  </router-link>
                </div>
                <div class="featured-category">
                  <div class="featured-header">
                    <h4>Електричні компоненти та кабелі</h4>
                  </div>
                  <div class="featured-image">
                    <img src="/images/HomeView/Electrical-cables-and-wires.jpg" alt="Electrical Components" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logo in the center -->
        <div class="logo-container">
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
      <div class="search-bar-wrapper" style="width: 100%; min-width: 500px;">
        <!-- Use the enhanced SearchBar component -->
        <SearchBar
          class="my-search-bar full-width-search"
          :all-products="searchProducts" 
          @search-selected="handleSearchSelected"
          style="width: 100%;"
        />
      </div>

      <!-- RIGHT SECTION: Icon Links, Region Selector, etc. -->
      <div class="right-section" style="width: auto; min-width: 100px;">
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
          <div class="region-selector" @click.stop="toggleRegionMenu">
            <span class="lang-code">{{ currentLocale }}</span>
            <div class="region-icon-container">
              <img src="/images/header/globe-icon.svg" alt="Region Icon" class="region-icon" />
            </div>
          </div>

          <!-- Region Dropdown Menu -->
          <div v-if="regionMenuVisible" class="region-dropdown" @click.stop>
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
  computed,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import productService from '@/services/productService'

export default {
  name: 'Header',
  components: { SearchBar },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const menuVisible = ref(false)
    const regionMenuVisible = ref(false)
    const selectedRegion = ref('United States')
    const searchProducts = ref([])
    const headerRef = ref(null)
    const searchQuery = ref('')
    const activeCategory = ref('solar') // Default active category
    
    // Initialize stores and i18n
    const cartStore = useCartStore()
    const userStore = useUserStore()
    const { locale } = useI18n()
    
    // Computed properties
    const user = computed(() => userStore.user)
    const cartCount = computed(() => cartStore.totalQuantity)
    const isHomePage = computed(() => route.path === '/')
    const currentLocale = computed(() => locale.value)

    // Solar System Categories
    const solarSystemItems = [
      {
        id: 1,
        name: 'Сонячні Панелі',
        slug: 'solar-panels',
        image: '/images/HomeView/solar-farm.png',
      },
      {
        id: 2,
        name: 'Батареї',
        slug: 'batteries',
        image: '/images/HomeView/solar-battery.png',
      },
      {
        id: 3,
        name: 'Інвертори',
        slug: 'inverters',
        image: '/images/HomeView/інвертер.png',
      },
      {
        id: 4,
        name: 'Комплекти сонячних електростанцій',
        slug: 'Sets-of-solar-power-plants',
        image: '/images/HomeView/комплект-сонячних.png',
      },
      {
        id: 6,
        name: 'Система монтажу сонячних панелей',
        slug: 'mounting-systems',
        image: '/images/HomeView/solar-mount-system.png',
      },
    ]

    // EV Charger Categories
    const evChargerItems = [
      {
        id: 1,
        name: 'Зарядні пристрої для електромобілів',
        slug: 'ev-chargers',
        image: '/images/HomeView/otcta-стійка-02.png',
      },
      {
        id: 2,
        name: 'Кабелі та адаптери',
        slug: 'cables-adapters',
        image: '/images/HomeView/electric-charging-adapters.png',
      },
      {
        id: 3,
        name: 'Зарядні станції',
        slug: 'charging-stations',
        image: '/images/HomeView/ev-charger-city.png',
      },
    ]

    // Portable Power Categories
    const portablePowerItems = [
      {
        id: 1,
        name: 'Портативна електростанції',
        slug: 'portable-power-stations',
        image: '/images/HomeView/solar-panel.png',
      },
      {
        id: 2,
        name: 'Cонячні генератори',
        slug: 'solar-generators',
        image: '/images/HomeView/Charging-station-ND-EVC-UR40.jpg',
      },
      {
        id: 3,
        name: 'Портативні сонячні панелі',
        slug: 'portable-solar-panels',
        image: '/images/Categories/portable.solar.panels/Портативні-Сонячні-панелі-Jackery-SolarSaga-100W.png',
      },
    ]

    // Generator Categories
    const generatorItems = [
      {
        id: 1,
        name: 'Генератори',
        slug: 'generators',
        image: '/images/HomeView/генератори.png',
      },
      {
        id: 2,
        name: 'Промислові генератори для важких навантажень (100 кВт+)',
        slug: 'industrial-generators',
        image: '/images/HomeView/Промислові-генератори-для-важких-навантажень.png',     
      },
      {
        id: 3,
        name: 'Освітлювальні вежі на сонячних батареях',
        slug: 'solar-lighting-towers',
        image: '/images/HomeView/Освітлювальні-вежі-на-сонячних-батареях.png',     
      },
    ]

    // Electrical Component Categories
    const electricalItems = [
      {
        id: 1,
        name: 'Автоматичні вимикачі',
        slug: 'automatic-switches',
        image: '/images/HomeView/інвертер.png',
      },
      {
        id: 2,
        name: 'Кабелі електричні та дроти',
        slug: 'cables-wires',
        image: '/images/HomeView/Electrical-cables-and-wires.jpg',
      },
    ]

    // Example products for search
    const allProducts = ref([
      { id: 1, name: 'Сонячна Панель A' },
      { id: 2, name: 'Зарядка X' },
      { id: 3, name: 'Автоматичний вимикач Y' },
    ])

    // Helper for category routing
    const getCategoryRoute = (slug) => {
      return `/${slug.toLowerCase().replace(/ /g, '-')}`;
    }

    // Toggle functions
    const toggleMenu = (event) => {
      if (event) event.stopPropagation()
      menuVisible.value = !menuVisible.value
      // Close region menu if open
      if (regionMenuVisible.value) regionMenuVisible.value = false
    }

    const toggleRegionMenu = (event) => {
      if (event) event.stopPropagation()
      regionMenuVisible.value = !regionMenuVisible.value
      // Close hamburger menu if open
      if (menuVisible.value) menuVisible.value = false
    }

    // Handler functions
    const handleMenuItemClick = () => {
      // Close the menu when an item is clicked
      menuVisible.value = false
    }

    const closeMenusOnOutsideClick = (event) => {
      // Only close menus if click is outside the header element
      if (headerRef.value && !headerRef.value.contains(event.target)) {
        menuVisible.value = false
        regionMenuVisible.value = false
      }
    }

    const selectRegion = (region) => {
      locale.value = region // Use the locale code directly
      regionMenuVisible.value = false
    }

    const performSearch = () => {
      if (!searchQuery.value.trim()) return
      
      console.log(`Performing search for: ${searchQuery.value}`)
      
      // Simple filtering of products
      const query = searchQuery.value.toLowerCase()
      const results = (searchProducts.value.length > 0 ? searchProducts.value : allProducts.value)
        .filter(p => p.name.toLowerCase().includes(query))
      
      console.log(`Found ${results.length} results`)
      
      if (results.length > 0) {
        handleSearchSelected(results[0])
      }
    }

    const handleSearchSelected = (product) => {
      router.push(`/products/${product.id}`)
    }

    // Lifecycle hooks
    onMounted(async () => {
      document.addEventListener('click', closeMenusOnOutsideClick)
      
      // Fetch products for search
      try {
        searchProducts.value = await productService.getAllProductsForSearch()
        console.log(`Loaded ${searchProducts.value.length} products for search`)
      } catch (error) {
        console.error('Error loading products for search:', error)
        searchProducts.value = allProducts.value
        console.log('Using fallback products for search')
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenusOnOutsideClick)
    })

    return {
      // Refs
      menuVisible,
      regionMenuVisible,
      selectedRegion,
      searchProducts,
      allProducts,
      searchQuery,
      headerRef,
      activeCategory,
      
      // Computed properties
      cartCount,
      isHomePage,
      user,
      currentLocale,
      
      // Data
      solarSystemItems,
      evChargerItems,
      portablePowerItems,
      generatorItems,
      electricalItems,
      
      // Functions
      toggleMenu,
      toggleRegionMenu,
      selectRegion,
      handleSearchSelected,
      performSearch,
      handleMenuItemClick,
      getCategoryRoute,
    }
  }
}
</script>

<style scoped>
/* Header Styles */
.header-container {
  width: 100%;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0;  
  height: 180px; /* Match logo height + padding */
}

.header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 100%; 
  height: 110px;
  padding: 10px 20px;
  box-sizing: border-box;
  gap: 20px;
}

/* Left Section */
.left-section {
  display: flex;
  align-items: center;
  gap: 10px;
  width: auto;
}

/* Search Bar */
.search-bar-wrapper {
  width: 100% !important;
  max-width: none !important;
  min-width: 500px !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
}

.full-width-search,
.full-width-search .search-container,
.full-width-search .search-input-wrapper,
.full-width-search .search-input {
  width: 100% !important;
  max-width: 100% !important;
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
}

/* Hamburger Menu Styles */
.hamburger-container {
  cursor: pointer;
}

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
  background-color: #333333;
  transition: 0.2s;
  margin: 3px 0;
}

/* Logo Styles */
.logo-container {
  height: 90px;
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 5px;
  display: inline-block;
}

/* Search Bar Styles */
.search-container {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 400px !important;
}

.search-input-wrapper {
  width: 100% !important;
}

.search-input {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 400px !important;
}

.search-container input {
  width: 100%;
  max-width: 100%;
  padding: 15px 20px;
  border-radius: 15px;
  border: none;
  outline: none;
  font-size: 18px;
  background-color: #f0f0f0;
  color: #333333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Icon Links Styles */
.icon-links {
  display: flex;
  gap: 20px;
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
}

.header-item {
  display: flex;
  align-items: center;
  position: relative;
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333333;
}

.icon-text img {
  width: 24px;
  height: 24px;
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
  z-index: 1002;
}

/* Region Selector */
.region-selector {
  display: flex;
  align-items: center;
  gap: 8px;
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

/* Region Dropdown Menu */
.region-dropdown {
  position: absolute;
  top: 110px;
  right: 0;
  width: 200px;
  background-color: white;
  z-index: 99;
  padding: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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

/* Mega Menu Styles */
.dropdown-mega-menu {
  position: absolute;
  top: 110px;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 99;
  width: 100%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #e0e0e0;
}

.menu-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  min-height: 400px;
}

/* Categories Column */
.menu-categories {
  width: 300px;
  background-color: #f8f8f8;
  border-right: 1px solid #e0e0e0;
  padding: 20px 0;
}

.menu-category {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.menu-category:hover, 
.menu-category.active {
  background-color: #f0f0f0;
  border-left-color: #0066cc;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Colored placeholders instead of icons */
.category-icon-placeholder {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  flex-shrink: 0;
}

.solar-color {
  background-color: #ffd700; /* Gold for solar */
}

.ev-color {
  background-color: #3498db; /* Blue for EV */
}

.portable-color {
  background-color: #e74c3c; /* Red for portable */
}

.generator-color {
  background-color: #27ae60; /* Green for generators */
}

.electrical-color {
  background-color: #9b59b6; /* Purple for electrical */
}

.category-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Subcategories Panel */
.menu-subcategories {
  flex: 1;
  padding: 20px;
  background-color: white;
}

.subcategory-panel {
  display: flex;
  height: 100%;
}

.subcategory-list {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding-right: 20px;
}

.subcategory-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease;
}

.subcategory-item:hover {
  background-color: #f0f8ff;
}

.subcategory-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

/* Featured Category */
.featured-category {
  flex: 1;
  border-left: 1px solid #e0e0e0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

.featured-header {
  margin-bottom: 15px;
}

.featured-header h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.featured-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

/* Make sure content below header is properly spaced */
main, .main-content {
  padding-top: 120px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .menu-container {
    flex-direction: column;
  }
  
  .menu-categories {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
  }
  
  .subcategory-panel {
    flex-direction: column;
  }
  
  .featured-category {
    border-left: none;
    border-top: 1px solid #e0e0e0;
    padding: 20px 0 0 0;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .header-content {
    grid-template-columns: auto 1fr auto;
    gap: 10px;
  }
  
  .search-bar-wrapper {
    min-width: 200px !important;
  }
  
  .dropdown-mega-menu,
  .region-dropdown {
    padding: 15px;
    width: 100%;
    top: 80px; /* Adjusted for smaller header on mobile */
  }
  
  .subcategory-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .menu-item,
  .region-option {
    padding: 8px 15px; /* Reduced padding for smaller screens */
  }
  
  .icon-links {
    gap: 10px;
  }
  
  .logo {
    height: 30px;
  }
  
  .hamburger-menu span {
    width: 20px;
    height: 2px;
  }
}

@media (max-width: 480px) {
  .header-content {
    grid-template-columns: auto 1fr auto;
    padding: 5px 10px;
    height: 80px;
  }
  
  .header-container {
    height: 80px;
  }
  
  .logo-container {
    height: 70px;
  }
  
  .logo {
    height: 25px;
  }
  
  .search-bar-wrapper {
    min-width: 150px !important;
  }
  
  .subcategory-list {
    grid-template-columns: 1fr;
  }
  
  .menu-category {
    padding: 12px 15px;
  }
  
  .category-header h3 {
    font-size: 14px;
  }
  
  .dropdown-mega-menu,
  .region-dropdown {
    top: 80px;
  }
  
  .featured-image img {
    max-height: 200px;
  }
}
</style>
