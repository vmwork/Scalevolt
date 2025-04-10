// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    // Calculate total price
    totalPrice: (state) =>
      state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),

    // Calculate total quantity
    totalQuantity: (state) =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),
      
    // Total items (alias for totalQuantity for compatibility)
    totalItems: (state) =>
      state.cartItems.reduce((total, item) => total + item.quantity, 0),
      
    // Get quantity of specific item by ID or uniqueKey
    getItemQuantity: (state) => (id) => {
      const item = state.cartItems.find(item => 
        // Support both id and uniqueKey for backward compatibility
        item.id === id || item.uniqueKey === id
      );
      return item ? item.quantity : 0;
    }
  },
  actions: {
    // Add item to cart
    addToCart(product) {
      console.log('Adding to cart:', product);
      
      // Generate uniqueKey if not provided
      if (!product.uniqueKey) {
        product.uniqueKey = product.id ? `product-${product.id}` : `product-${Date.now()}`;
      }
      
      const existingItem = this.cartItems.find(
        (item) => (item.uniqueKey === product.uniqueKey) || (item.id === product.id && !item.uniqueKey)
      );
      
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
        console.log(
          `Increased quantity for ${product.uniqueKey} to ${existingItem.quantity}`
        );
      } else {
        this.cartItems.push({ 
          ...product,
          quantity: product.quantity || 1
        });
        console.log(`Added new product to cart: ${product.uniqueKey}`);
      }
      this.saveCart();
    },

    // Remove item from cart - support both id and uniqueKey
    removeFromCart(idOrUniqueKey) {
      console.log(`Removing product from cart: ${idOrUniqueKey}`);
      this.cartItems = this.cartItems.filter(
        (item) => item.uniqueKey !== idOrUniqueKey && item.id !== idOrUniqueKey
      );
      this.saveCart();
    },

    // Update item quantity directly
    updateQuantity(idOrUniqueKey, quantity) {
      const item = this.cartItems.find(
        (item) => item.uniqueKey === idOrUniqueKey || item.id === idOrUniqueKey
      );
      
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(idOrUniqueKey);
        } else {
          this.saveCart();
          console.log(
            `Updated quantity for ${idOrUniqueKey} to ${item.quantity}`
          );
        }
      }
    },

    // Increase quantity by 1
    increaseQuantity(idOrUniqueKey) {
      const item = this.cartItems.find(
        (item) => item.uniqueKey === idOrUniqueKey || item.id === idOrUniqueKey
      );
      
      if (item) {
        item.quantity += 1;
        console.log(`Increased quantity for ${idOrUniqueKey} to ${item.quantity}`);
        this.saveCart();
      }
    },

    // Decrease quantity by 1
    decreaseQuantity(idOrUniqueKey) {
      const item = this.cartItems.find(
        (item) => item.uniqueKey === idOrUniqueKey || item.id === idOrUniqueKey
      );
      
      if (item) {
        item.quantity -= 1;
        console.log(`Decreased quantity for ${idOrUniqueKey} to ${item.quantity}`);
        if (item.quantity <= 0) {
          this.removeFromCart(idOrUniqueKey);
        } else {
          this.saveCart();
        }
      }
    },

    // Clear the cart
    clearCart() {
      this.cartItems = [];
      this.saveCart();
      console.log('Cart has been cleared.');
    },

    // Save cart to localStorage
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      console.log('Cart saved to localStorage:', this.cartItems);
    },
  },
});