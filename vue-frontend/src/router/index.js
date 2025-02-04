import { createRouter, createWebHashHistory } from 'vue-router'; // Switched to Hash History
import HomeView from '@/views/HomeView.vue';
import SolarPanelsView from '@/views/SolarPanelsView.vue';
import ChargingView from '@/views/ChargingView.vue';
import AutomaticSwitchesView from '@/views/AutomaticSwitchesView.vue';
import SolarSetsView from '@/views/SolarSetsView.vue'; // <- IMPORT HERE
import CablesWiresView from '@/views/CablesWiresView.vue';
import LoginView from '@/views/LoginView.vue';
import ProductPage from '@/views/ProductPage.vue'; // Import the new ProductPage component
import CartView from '@/views/CartView.vue';
import SignUpView from '@/views/SignUpView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import CheckoutSuccess from '@/views/CheckoutSuccess.vue';
import CheckoutCancel from '@/views/CheckoutCancel.vue';
import CategoryView from '@/views/CategoryView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/solar-panels', name: 'SolarPanels', component: SolarPanelsView },
  { path: '/charging', name: 'Charging', component: ChargingView },
  { path: '/automatic-switches', name: 'AutomaticSwitches', component: AutomaticSwitchesView },
  { path: '/cables-wires', name: 'CablesWires', component: CablesWiresView },
  { path: '/Sets-of-solar-power-plants', name: 'SolarSets', component: SolarSetsView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/product/:id', name: 'ProductPage', component: ProductPage, props: true },
    { path: '/cart', name: 'Cart', component: CartView },
  { path: '/signup', name: 'SignUp', component: SignUpView },
  { path: '/checkout', name: 'Checkout', component: CheckoutView },
  { path: '/checkout-success', name: 'CheckoutSuccess', component: CheckoutSuccess },
  { path: '/checkout-cancel', name: 'CheckoutCancel', component: CheckoutCancel },
  { path: '/category/:id', name: 'Category', component: CategoryView, props: true },
];

const router = createRouter({
  history: createWebHashHistory(), // Changed to Hash Mode for SPA routing
  routes,
});

export default router;
