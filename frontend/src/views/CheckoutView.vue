<!-- src/views/CheckoutView.vue -->
<template>
    <div class="checkout-container">
      <h1>Checkout</h1>
      <!-- Display cart items and total -->
      <button @click="handleCheckout">Proceed to Payment</button>
    </div>
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    name: 'CheckoutView',
    methods: {
  async handleCheckout() {
    const stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');
    
    // Get cart items from your cart store or state
    const cartStore = useCartStore();
    const cartItems = cartStore.cartItems.map((item) => ({
      name: item.name,
      price: item.price, // Ensure this is the price per item
      quantity: item.quantity,
    }));

    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const { id } = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      // Handle error
      alert(result.error.message);
    }
  },
}

  };
  </script>
  