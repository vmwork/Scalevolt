// services/paymentService.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

export default {
  async createCheckoutSession(items, customerEmail) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail,
          locale: 'pl', // Polish locale
          currency: 'PLN',
        }),
      });
      
      const session = await response.json();
      
      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Payment service error:', error);
    }
  }
};