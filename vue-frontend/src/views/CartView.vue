<template>
  <div class="cart-view">
    <h1 class="page-title">{{ $t('cart.yourCart') }}</h1>

    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.uniqueKey" class="cart-item">
          <img :src="item.image" :alt="item.name" class="product-image" />
          <div class="product-details">
            <h3>{{ item.name }}</h3>
            <p class="product-price">
              {{ $t('product.price') }}: {{ formatPrice(item.price) }} грн
            </p>
            <div class="quantity-controls">
              <button
                @click="decreaseQuantity(item.uniqueKey)"
                aria-label="Decrease quantity"
                class="quantity-button"
              >
                −
              </button>
              <input
                type="number"
                :value="item.quantity"
                @input="updateQuantity(item.uniqueKey, $event.target.value)"
                class="quantity-input"
                min="1"
              />
              <button
                @click="increaseQuantity(item.uniqueKey)"
                aria-label="Increase quantity"
                class="quantity-button"
              >
                +
              </button>
            </div>
            <p class="product-subtotal">
              {{ $t('cart.subtotal') }}: {{ formatPrice(item.price * item.quantity) }} грн
            </p>
            <button
              @click="removeFromCart(item.uniqueKey)"
              class="remove-button"
            >
              <span class="remove-icon">×</span>
              {{ $t('common.remove') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h2>{{ $t('cart.orderSummary') }}</h2>
        <div class="summary-item">
          <span>{{ $t('cart.items') }}:</span>
          <span>{{ totalQuantity }}</span>
        </div>
        <div class="summary-item">
          <span>{{ $t('cart.subtotal') }}:</span>
          <span>{{ formatPrice(totalPrice) }} грн</span>
        </div>
        <div class="summary-item">
          <span>{{ $t('cart.tax') }} (20%):</span>
          <span>{{ formatPrice(tax) }} грн</span>
        </div>
        <div class="summary-item">
          <span>{{ $t('cart.shipping') }}:</span>
          <span>{{ formatPrice(shipping) }} грн</span>
          <span v-if="totalPrice > 5000" class="free-shipping-badge">{{ $t('cart.free') }}</span>
        </div>
        <hr />
        <div class="summary-total">
          <span>{{ $t('cart.total') }}:</span>
          <span>{{ formatPrice(total) }} грн</span>
        </div>
        <button @click="proceedToCheckout" class="checkout-button">
          <span class="checkout-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          {{ $t('cart.checkout') }}
        </button>
        <button @click="continueShopping" class="continue-shopping-button">
          {{ $t('cart.continueShopping') }}
        </button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <div class="empty-cart-content">
        <div class="empty-cart-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#CCCCCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2 class="empty-cart-title">{{ $t('cart.empty') }}</h2>
        <p class="empty-cart-message">{{ $t('cart.emptyMessage') || 'Your shopping cart is waiting to be filled with amazing products.' }}</p>
        <div class="empty-cart-actions">
          <button @click="continueShopping" class="continue-shopping-button primary">
            <span class="shopping-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            {{ $t('cart.continueShopping') }}
          </button>
          <button @click="goToFeaturedProducts" class="featured-products-button">
            {{ $t('cart.viewFeatured') || 'View Featured Products' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth' // Added auth store import
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export default {
  name: 'CartView',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore() // Added auth store
    const router = useRouter()
    const toast = useToast()
    const { t } = useI18n()

    // Computed properties
    const cartItems = computed(() => cartStore.cartItems)
    const totalPrice = computed(() => cartStore.totalPrice)
    const totalQuantity = computed(() => cartStore.totalQuantity)

    // Calculations
    const tax = computed(() => totalPrice.value * 0.2) // 20% Tax
    const shipping = computed(() => (totalPrice.value > 5000 ? 0 : 200)) // Free shipping over 5000 грн
    const total = computed(() => totalPrice.value + tax.value + shipping.value)

    // Methods
    const removeFromCart = uniqueKey => {
      cartStore.removeFromCart(uniqueKey)
      toast.success(t('cart.itemRemoved'))
    }

    const increaseQuantity = uniqueKey => {
      const item = cartStore.cartItems.find(
        item => item.uniqueKey === uniqueKey
      )
      if (item) {
        cartStore.updateQuantity(uniqueKey, item.quantity + 1)
        toast.success(t('cart.quantityUpdated'))
      }
    }

    const decreaseQuantity = uniqueKey => {
      const item = cartStore.cartItems.find(
        item => item.uniqueKey === uniqueKey
      )
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(uniqueKey, item.quantity - 1)
        toast.success(t('cart.quantityUpdated'))
      }
    }

    const updateQuantity = (uniqueKey, quantity) => {
      const qty = parseInt(quantity, 10)
      if (qty > 0) {
        cartStore.updateQuantity(uniqueKey, qty)
      }
    }

    const formatPrice = price => {
      return price.toLocaleString('en-US')
    }

    // Updated checkout method with proper route handling
    const proceedToCheckout = () => {
      if (cartStore.cartItems.length === 0) {
        toast.error(t('cart.emptyCartError'))
        return
      }

      // Route to checkout and let the route guard handle authentication check
      router.push({ name: 'Checkout' })
    }

    const continueShopping = () => {
      router.push({ name: 'Home' })
    }

    const goToFeaturedProducts = () => {
  // Change this to your featured products route or category
  router.push({ name: 'Products', query: { featured: true } })
  // Alternative options:
  // router.push('/products/featured')
  // or router.push({ name: 'Category', params: { slug: 'featured' } })
}

    return {
      cartItems,
      totalPrice,
      totalQuantity,
      tax,
      shipping,
      total,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      formatPrice,
      proceedToCheckout,
      continueShopping,
      goToFeaturedProducts, // Add this to your return statement
      $t: t,
    }
  },
}
</script>

<style scoped>
/* Root Styles */
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.page-title {
  text-align: center;
  margin: 80px 0 40px; /* Increased top margin to prevent header overlap */
  font-size: 2rem;
  font-weight: 600;
  position: relative;
}

/* Cart Container */
.cart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

/* Cart Items */
.cart-items {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Add spacing between cart items */
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-details {
  flex: 1;
}

.product-details h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #222;
}

.product-price,
.product-subtotal {
  font-size: 1rem;
  margin: 5px 0;
  color: #555;
}

.product-subtotal {
  font-weight: 500;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align to left for better UX */
  gap: 8px;
  margin: 15px 0;
}

/* Improved quantity buttons */
.quantity-button {
  width: 36px;
  height: 36px;
  background-color: #f8f8f8;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 50%; 
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.quantity-button:hover {
  background-color: #eee;
  transform: scale(1.05);
}

.quantity-button:active {
  transform: scale(0.98);
}

.quantity-input {
  width: 50px;
  height: 36px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0 8px;
}

.quantity-input:focus {
  outline: none;
  border-color: #52c41a;
  box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.1);
}

/* Improved remove button */
.remove-button {
  margin-top: 10px;
  padding: 8px 14px;
  background-color: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.remove-button:hover {
  background-color: #fff1f0;
}

.remove-icon {
  font-size: 16px;
  font-weight: bold;
}

/* Cart Summary */
.cart-summary {
  flex: 1;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px; /* Keep summary visible when scrolling */
  max-height: calc(100vh - 120px);
  align-self: flex-start;
}

.cart-summary h2 {
  margin-bottom: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: #222;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1rem;
  color: #555;
  position: relative;
}

.free-shipping-badge {
  position: absolute;
  top: -8px;
  right: 0;
  background-color: #52c41a;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  margin: 20px 0;
}

.cart-summary hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

/* Improved checkout button */
.checkout-button {
  width: 100%;
  padding: 14px 20px;
  background-color: #52c41a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(82, 196, 26, 0.2);
}

.checkout-button:hover {
  background-color: #46b314;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(82, 196, 26, 0.25);
}

.checkout-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);
}

.checkout-icon {
  display: flex;
  align-items: center;
}

/* Improved continue shopping button */
.continue-shopping-button {
  width: 100%;
  margin-top: 12px;
  padding: 12px 20px;
  background-color: transparent;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.continue-shopping-button:hover {
  background-color: #e6f7ff;
}

.continue-shopping-button.primary {
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 6px rgba(24, 144, 255, 0.2);
}

.continue-shopping-button.primary:hover {
  background-color: #096dd9;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(24, 144, 255, 0.25);
}

/* Add these styles to your <style> section */

/* Empty Cart - Updated Styles */
.empty-cart {
  text-align: center;
  margin: 60px auto;
  max-width: 600px;
  padding: 60px 40px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.empty-cart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.empty-cart-icon {
  margin-bottom: 10px;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.empty-cart-title {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.empty-cart-message {
  font-size: 1.1rem;
  color: #666;
  margin: 5px 0 20px;
  line-height: 1.5;
  max-width: 400px;
}

.empty-cart-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
}

.shopping-icon {
  display: flex;
  align-items: center;
}

.continue-shopping-button.primary {
  padding: 16px 20px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.featured-products-button {
  padding: 14px 20px;
  background-color: #ffffff;
  color: #555;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.featured-products-button:hover {
  background-color: #f9f9f9;
  color: #333;
  border-color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .empty-cart {
    padding: 40px 20px;
    margin: 40px 20px;
  }
  
  .empty-cart-title {
    font-size: 1.5rem;
  }
  
  .empty-cart-message {
    font-size: 1rem;
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .cart-container {
    flex-direction: column;
  }

  .cart-summary {
    width: 100%;
    position: static;
    max-height: none;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    margin-bottom: 10px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 1.75rem;
    margin-top: 70px;
  }

  .cart-summary {
    padding: 20px;
  }

  .checkout-button {
    padding: 12px;
  }
  
  .cart-item {
    padding: 15px;
  }
  
  .product-details h3 {
    font-size: 1.1rem;
  }
}
</style>