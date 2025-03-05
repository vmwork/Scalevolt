import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SolarPanelsView from '@/views/SolarPanelsView.vue';
import BatteriesView from '@/views/BatteriesView.vue';
import InvertersView from '@/views/InvertersView.vue';
import SolarSetsView from '@/views/SolarSetsView.vue'; // Ensure correct import
import ChargingStationsView from '@/views/ChargingStationsView.vue';
import CablesWiresView from '@/views/CablesWiresView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import SignUpView from '@/views/SignUpView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CheckoutSuccess from '@/views/CheckoutSuccess.vue';
import CheckoutCancel from '@/views/CheckoutCancel.vue';
import CategoryView from '@/views/CategoryView.vue';
import ProductPage from '@/views/ProductPage.vue'; // Ensure this file exists!
import PortableSolarPanelsView from '@/views/PortableSolarPanelsView.vue'; // Add this line

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/solar-panels', name: 'SolarPanels', component: SolarPanelsView },
  { path: '/batteries', name: 'Batteries', component: BatteriesView },
  { path: '/inverters', name: 'Inverters', component: InvertersView },
  { path: '/charging-stations', name: 'ChargingStationsView', component: ChargingStationsView },
  { path: '/cables-wires', name: 'CablesWires', component: CablesWiresView },
  { 
    path: '/sets-of-solar-power-plants/:id?',
    name: 'SolarSets',
    component: SolarSetsView,
    props: true 
  }, // Renamed
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
  { path: '/portable-solar-panels', name: 'PortableSolarPanelsView', component: PortableSolarPanelsView }, // Updated route to match import
];

const router = createRouter({
  history: createWebHashHistory(), // Using hash-based routing
  routes,
});

export default router;