import { createRouter, createWebHashHistory } from 'vue-router';
import { i18n } from '@/i18n/index.js';

// View Imports
import HomeView from '@/views/HomeView.vue';
import SolarPanelsView from '@/views/SolarPanelsView.vue';
import BatteriesView from '@/views/BatteriesView.vue';
import InvertersView from '@/views/InvertersView.vue';
import SolarSetsView from '@/views/SolarSetsView.vue';
import ChargingStationsView from '@/views/ChargingStationsView.vue';
import CablesWiresView from '@/views/CablesWiresView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import SignUpView from '@/views/SignUpView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CheckoutSuccess from '@/views/CheckoutSuccess.vue';
import CheckoutCancel from '@/views/CheckoutCancel.vue';
import CheckoutAuthView from '@/views/CheckoutAuthView.vue'; // Added checkout auth view
import CategoryView from '@/views/CategoryView.vue';
import ProductPage from '@/views/ProductPage.vue';
import PortableSolarPanelsView from '@/views/PortableSolarPanelsView.vue';
import SolarMountSystemView from '@/views/SolarMountSystemView.vue';
import PortablePowerStationView from '@/views/PortablePowerStationView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
// Import the layout component
import Layout from '@/components/Layout.vue';
import DeliveryWarrantyReturnsView from '@/views/DeliveryWarrantyReturnsView.vue';
import CompanyView from '@/views/CompanyView.vue';
import LiftsAndCranesCategory from '@/views/LiftsAndCranesCategory.vue';
import PrivacyView from '@/views/PrivacyView.vue';
import ErrorView from '@/views/ErrorView.vue';
import LegalTermsView from '@/views/LegalTermsView.vue';
import { translateText, translateProduct } from '../utils/translationService.js';
import { checkoutGuard } from './guards/checkoutGuard'; // Import the checkout guard
import AuthView from '@/views/AuthView.vue';


// Define your routes for use within the region layout
const productRoutes = [
  { path: '', name: 'Home', component: HomeView },
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
  // Updated auth routes to use the new AuthView component
  { path: 'auth', name: 'Auth', component: AuthView },
  { path: 'login', redirect: 'auth' },
  { path: 'signup', redirect: 'auth' },
  
  { path: 'cart', name: 'Cart', component: CartView },
  
  // Updated Checkout routes with checkout guard
  { 
    path: 'checkout', 
    name: 'Checkout', 
    component: CheckoutView, 
    beforeEnter: checkoutGuard 
  },
  { 
    path: 'checkout/success', 
    name: 'CheckoutSuccess', 
    component: CheckoutSuccess, 
    beforeEnter: checkoutGuard 
  },
  { 
    path: 'checkout/cancel', 
    name: 'CheckoutCancel', 
    component: CheckoutCancel 
  },
  // New checkout authentication route
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
    component: CategoryView  // Use a generic CategoryView or create specific views
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
  // Removed duplicate LiftsAndCranes route
  // Removed duplicate ScissorLifts route
  // Removed duplicate BoomLifts route
  // Removed duplicate TranslationManager route
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
    // Catch-all 404 route
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

// Main routes array
const routes = [
  // Region-specific routing
  {
    path: '/:region?',
    component: Layout,
    beforeEnter: (to, from, next) => {
      const validRegions = ['uk', 'pl'];
      
      // If valid region is specified
      if (to.params.region && validRegions.includes(to.params.region)) {
        // Set the locale based on URL region
        i18n.global.locale.value = to.params.region;
        localStorage.setItem('userLocale', to.params.region);
        document.documentElement.setAttribute('lang', to.params.region);
        next();
      } 
      // If no region specified (root path)
      else if (!to.params.region || to.path === '/') {
        // No region specified, redirect to default or stored region
        const savedRegion = localStorage.getItem('userLocale') || 'uk';
        // Avoid redirect loop on root path
        if (to.path === '/') {
          next({ path: `/${savedRegion}` });
        } else {
          next({ path: `/${savedRegion}${to.path}` });
        }
      } 
      // If invalid region
      else {
        // Invalid region, redirect to default
        next({ path: '/uk' });
      }
    },
    children: productRoutes
  },
  
  // Fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const locale = localStorage.getItem('userLocale') || i18n.global.locale.value || 'uk';
      return `/${locale}`;
    }
  }
];

const router = createRouter({
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

// Navigation guard to set page title
router.beforeEach((to, from, next) => {
  // Set page title if available
  const title = to.meta.title;
  if (title) {
    document.title = title;
  } else {
    document.title = 'SCALEVOLT';
  }
  
  next();
});

export default router;