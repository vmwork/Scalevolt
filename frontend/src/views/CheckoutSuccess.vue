<!-- src/views/CheckoutSuccess.vue -->
<template>
    <div class="checkout-success">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been successfully processed.</p>
      <router-link to="/">Continue Shopping</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutSuccess',
  };
  </script>
  
  <style scoped>
  .checkout-success {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  