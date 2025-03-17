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
import CategoryView from '@/views/CategoryView.vue';
import ProductPage from '@/views/ProductPage.vue';
import PortableSolarPanelsView from '@/views/PortableSolarPanelsView.vue';
import SolarMountSystemView from '@/views/SolarMountSystemView.vue';
import PortablePowerStationView from '@/views/PortablePowerStationView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
// Import the layout component - you need to create this or use your existing layout
import Layout from '@/components/Layout.vue';

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
    path: 'charging-stations', 
    name: 'ChargingStations',
    component: ChargingStationsView 
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
  { path: 'login', name: 'Login', component: LoginView },
  { path: 'cart', name: 'Cart', component: CartView },
  { path: 'signup', name: 'SignUp', component: SignUpView },
  { path: 'checkout', name: 'Checkout', component: CheckoutView },
  { path: 'checkout-success', name: 'CheckoutSuccess', component: CheckoutSuccess },
  { path: 'checkout-cancel', name: 'CheckoutCancel', component: CheckoutCancel },
  { path: 'category/:id', name: 'Category', component: CategoryView, props: true },
  { path: 'product/:id', name: 'Product', component: ProductPage, props: true },
  {
    path: 'customer-cases',
    name: 'CustomerCases',
    component: () => import('@/views/CustomerCases.vue')
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
    redirect: '/'
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

export default router;