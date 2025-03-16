import { createRouter, createWebHashHistory } from 'vue-router';

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
import SolarMountSystemView from '@/views/SolarMountSystemView.vue'; // Updated import
import PortablePowerStationView from '@/views/PortablePowerStationView.vue';
import UserProfileView from '@/views/UserProfileView.vue'; // Update the path if needed


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/solar-panels', name: 'SolarPanels', component: SolarPanelsView },
  { path: '/batteries', name: 'Batteries', component: BatteriesView },
  { path: '/inverters', name: 'Inverters', component: InvertersView },
  {
    path: '/mounting-systems',
    name: 'SolarMountSystem',
    component: SolarMountSystemView // Updated component name
  },
  { 
    path: '/charging-stations', 
    name: 'ChargingStations',
    component: ChargingStationsView 
  },
  { path: '/cables-wires', name: 'CablesWires', component: CablesWiresView },
  {
    path: '/sets-of-solar-power-plants/:id?',
    name: 'SolarSets',
    component: SolarSetsView,
    props: true
  },
  {
    path: '/портативна-електростанція',
    name: 'portable-power-station',
    component: PortablePowerStationView
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/signup', name: 'SignUp', component: SignUpView },
  { path: '/checkout', name: 'Checkout', component: CheckoutView },
  { path: '/checkout-success', name: 'CheckoutSuccess', component: CheckoutSuccess },
  { path: '/checkout-cancel', name: 'CheckoutCancel', component: CheckoutCancel },
  { path: '/category/:id', name: 'Category', component: CategoryView, props: true },
  { path: '/product/:id', name: 'Product', component: ProductPage, props: true },
  {
    path: '/customer-cases',
    name: 'CustomerCases',
    component: () => import('@/views/CustomerCases.vue') // Lazy-loaded route
  },
  { 
    path: '/portable-solar-panels', 
    name: 'PortableSolarPanels', 
    component: PortableSolarPanelsView 
  },
  { 
    path: '/profile', 
    name: 'UserProfile', 
    component: UserProfileView  // Changed from UserProfilePageView to match the import
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Using hash-based routing
  routes,
});

export default router;