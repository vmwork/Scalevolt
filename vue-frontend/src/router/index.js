import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { i18n } from '@/i18n';
import { createI18n } from 'vue-i18n';
import { createPinia, defineStore } from 'pinia';
import App from '@/App.vue';
import { createApp } from 'vue';


// Import all your view components
import HomeView from '@/views/HomeView.vue';
import SolarPanelsView from '@/views/SolarPanelsView.vue';
import BatteriesView from '@/views/BatteriesView.vue';
import InvertersView from '@/views/InvertersView.vue';
import SolarSetsView from '@/views/SolarSetsView.vue';
import CablesWiresView from '@/views/CablesWiresView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import SignUpView from '@/views/SignUpView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CheckoutSuccess from '@/views/CheckoutSuccess.vue';
import CheckoutCancel from '@/views/CheckoutCancel.vue';
import CheckoutAuthView from '@/views/CheckoutAuthView.vue';
import CategoryView from '@/views/CategoryView.vue';
import ProductPage from '@/views/ProductPage.vue';
import PortableSolarPanelsView from '@/views/PortableSolarPanelsView.vue';
import SolarMountSystemView from '@/views/SolarMountSystemView.vue';
import PortablePowerStationView from '@/views/PortablePowerStationView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import DeliveryWarrantyReturnsView from '@/views/DeliveryWarrantyReturnsView.vue';
import CompanyView from '@/views/CompanyView.vue';
import LiftsAndCranesCategory from '@/views/LiftsAndCranesCategory.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import ErrorView from '@/views/ErrorView.vue';
import LegalTermsView from '@/views/LegalTermsView.vue';
import AuthView from '@/views/AuthView.vue';
// Add these imports at the top of your router file with the other imports
import RentalCategoryPage from '@/views/RentalCategoryPage.vue';
import RentalProductPage from '@/views/RentalProductPage.vue';
import Layout from '@/components/Layout.vue';


// Import route guards and utilities if needed
import { checkoutGuard } from './guards/checkoutGuard';

// Define routes for product-related pages
const productRoutes = [
  { 
    path: '/', 
    component: () => import('@/views/HomeView.vue')
  },
  { path: 'solar-panels', name: 'SolarPanels', component: SolarPanelsView },
  { path: 'batteries', name: 'Batteries', component: BatteriesView },
  { path: 'inverters', name: 'Inverters', component: InvertersView },
  {
    path: 'mounting-systems',
    name: 'SolarMountSystem',
    component: SolarMountSystemView
  },
  {
    path: 'dc-charging-stations',
    name: 'DCChargingStations',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: 'ac-charging-stations',
    name: 'ACChargingStations',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: 'portable-charging-devices',
    name: 'PortableChargingDevices',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: 'lifts-and-cranes',
    name: 'LiftsAndCranes',
    component: LiftsAndCranesCategory
  },
  {
    path: 'lifts-and-cranes/scissor-lifts',
    name: 'ScissorLifts',
    component: LiftsAndCranesCategory
  },
  {
    path: 'lifts-and-cranes/boom-lifts',
    name: 'BoomLifts',
    component: LiftsAndCranesCategory
  },
  {
    path: 'admin/translations',
    name: 'TranslationManager',
    component: () => import('../views/admin/TranslationManager.vue'),
    meta: { requiresAuth: true }
  },
  { path: 'cables-wires', name: 'CablesWires', component: CablesWiresView },
  {
    path: 'sets-of-solar-power-plants/:id?',
    name: 'SolarSets',
    component: SolarSetsView,
    props: true
  },
  {
    path: 'портативна-електростанція',
    name: 'portable-power-station',
    component: PortablePowerStationView
  },
  { path: 'auth', name: 'Auth', component: AuthView },
  { path: 'login', redirect: 'auth' },
  { path: 'signup', redirect: 'auth' },
  
  { path: 'cart', name: 'Cart', component: CartView },
  
  { 
    path: 'checkout', 
    name: 'Checkout', 
    component: CheckoutView, 
    beforeEnter: checkoutGuard 
  },
  { 
    path: '/checkout/success',
    name: 'CheckoutSuccess',
    component: () => import('@/views/CheckoutSuccess.vue')
  },
  {
    path: '/checkout/cancel',
    name: 'CheckoutCancel',
    component: () => import('@/views/CheckoutCancel.vue')
  },
  { 
    path: 'checkout/auth', 
    name: 'CheckoutAuth', 
    component: CheckoutAuthView 
  },
  
  { path: 'category/:id', name: 'Category', component: CategoryView, props: true },
  { path: 'product/:id', name: 'Product', component: ProductPage, props: true },
  {
    path: 'customer-cases',
    name: 'CustomerCases',
    component: () => import('@/views/CustomerCases.vue')
  },
  {
    path: 'delivery-warranty-returns',
    name: 'DeliveryWarrantyReturns',
    component: DeliveryWarrantyReturnsView
  },
  { 
    path: 'portable-solar-panels', 
    name: 'PortableSolarPanels', 
    component: PortableSolarPanelsView 
  },
  { 
    path: 'profile', 
    name: 'UserProfile', 
    component: UserProfileView
  },
  {
    path: 'generators',
    name: 'Generators',
    component: CategoryView
  },
  {
    path: 'industrial-generators',
    name: 'IndustrialGenerators',
    component: CategoryView
  },
  {
    path: 'solar-lighting-towers',
    name: 'SolarLightingTowers',
    component: CategoryView
  },
  {
    path: 'company',
    name: 'Company',
    component: CompanyView,
    meta: {
      title: 'Компанія | SCALEVOLT'
    }
  },
  {
    path: 'privacy-policy',
    name: 'Privacy',
    component: PrivacyView
  },
  {
    path: 'error/:errorCode?',
    name: 'Error',
    component: ErrorView,
    props: true
  },
  {
    path: ':pathMatch(.*)*',
    name: 'NotFound',
    component: ErrorView,
    props: { errorCode: '404' }
  },
  {
    path: 'legal-terms',
    name: 'LegalTerms',
    component: LegalTermsView
  }
];

// Rental routes
const rentalRoutes = [
  { path: '/', component: HomeView },
  {
    path: '/:categorySlug',
    component: RentalCategoryPage, 
    props: true
  },
  {
    path: '/product/:productId',
    component: RentalProductPage,
    props: true
  }
];

// Main routes array for region-specific routing
const routes = [
  {
    path: '/:region?',
    component: Layout,
    beforeEnter: (to, from, next) => {
      const validRegions = ['uk', 'pl'];
      
      if (to.params.region && validRegions.includes(to.params.region)) {
        i18n.global.locale.value = to.params.region;
        localStorage.setItem('userLocale', to.params.region);
        document.documentElement.setAttribute('lang', to.params.region);
        next();
      } 
      else if (!to.params.region || to.path === '/') {
        const savedRegion = localStorage.getItem('userLocale') || 'uk';
        if (to.path === '/') {
          next({ path: `/${savedRegion}` });
        } else {
          next({ path: `/${savedRegion}${to.path}` });
        }
      } 
      else {
        next({ path: '/uk' });
      }
    },
    children: productRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const locale = localStorage.getItem('userLocale') || i18n.global.locale.value || 'uk';
      return `/${locale}`;
    }
  }
];

// Internationalization messages
const messages = {
  en: {
    common: {
      loading: 'Loading',
      previous: 'Previous',
      next: 'Next'
    },
    product: {
      addToCart: 'Add to Cart',
      rentNow: 'Rent Now',
      rent: 'Rent',
      wishlist: 'Wishlist',
      share: 'Share',
      selectDate: 'Select Date',
      applyDates: 'Apply Dates',
      rentalDuration: 'Rental Duration',
      rentalPeriod: 'Rental Period',
      selectColor: 'Select Equipment Color',
      specifications: 'Specifications',
      youMayLike: 'You May Also Like',
      durations: {
        day: 'Day',
        week: 'Week',
        month: 'Month',
        dayShort: 'day',
        weekShort: 'week',
        monthShort: 'month'
      },
      specs: {
        nominalPower: 'Nominal Power (kW)',
        maxPower: 'Maximum Power (kW)',
        weight: 'Weight (kg)',
        workTime: 'Work Time (hours)',
        noiseLevel: 'Noise Level (dB)'
      },
      brand: 'Brand'
    },
    category: {
      subcategories: 'Subcategories',
      filterBy: 'Filter By',
      sortBy: 'Sort By',
      all: 'All',
      brand: 'Brand',
      price: 'Price',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      nameAToZ: 'Name: A to Z',
      nameZToA: 'Name: Z to A',
      noProductsFound: 'No products found'
    },
    homeView: {
      rental: 'Equipment Rental',
      generators: 'Generators',
      industrialGenerators: 'Industrial Generators',
      solarLightingTowers: 'Solar Lighting Towers',
      liftsAndCranes: 'Lifts & Cranes',
      seeAll: 'See All'
    }
  },
  uk: {
    // Ukrainian translations would be added here
    common: {
      loading: 'Завантаження',
      previous: 'Попередній',
      next: 'Наступний'
    }
    // Add other Ukrainian translations as needed
  }
};

// Create i18n instance
const i18nInstance = createI18n({
  legacy: false,
  locale: 'uk', // Default locale
  messages
});

// Create cart store
const createCartStore = () => {
  return {
    state: () => ({
      cartItems: []
    }),
    getters: {
      totalItems: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0),
      totalPrice: (state) => state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      getItemQuantity: (state) => (id) => {
        const item = state.cartItems.find(item => item.id === id);
        return item ? item.quantity : 0;
      }
    },
    actions: {
      addToCart(item) {
        const existingItem = this.cartItems.find(i => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity || 1;
        } else {
          this.cartItems.push({...item, quantity: item.quantity || 1});
        }
      },
      removeFromCart(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      },
      increaseQuantity(id) {
        const item = this.cartItems.find(item => item.id === id);
        if (item) {
          item.quantity++;
        }
      },
      decreaseQuantity(id) {
        const item = this.cartItems.find(item => item.id === id);
        if (item && item.quantity > 1) {
          item.quantity--;
        } else if (item) {
          this.removeFromCart(id);
        }
      },
      clearCart() {
        this.cartItems = [];
      }
    }
  };
};

// Create router instances
const mainRouter = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

const rentalRouter = createRouter({
  history: createWebHistory(),
  routes: rentalRoutes
});

// Navigation guard to set page title
mainRouter.beforeEach((to, from, next) => {
  const title = to.meta.title;
  if (title) {
    document.title = title;
  } else {
    document.title = 'SCALEVOLT';
  }
  
  next();
});

// Create Pinia store
const pinia = createPinia();

// Define cart store
pinia.use(({ store }) => {
  if (store.$id === 'cart') {
    // Add any cart-specific plugins or functionality
  }
});

// Create and define cart store
const useCartStore = defineStore('cart', createCartStore());

// Initialization function for the app
function initializeApp() {
  const app = createApp(App);

  // Register plugins
  app.use(mainRouter);
  app.use(pinia);
  app.use(i18nInstance); // Use i18nInstance instead of i18n

  // Mount app
  app.mount('#app');
}

// Export router and other necessary exports
export default mainRouter;

// Export router and other necessary exports
export { 
  mainRouter, 
  rentalRouter, 
  useCartStore, 
  i18nInstance 
};