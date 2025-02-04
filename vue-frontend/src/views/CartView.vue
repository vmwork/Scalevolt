<template>
  <div class="cart-view">
    <h1>Your Cart</h1>

    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.uniqueKey" class="cart-item">
          <img :src="item.image" :alt="item.name" class="product-image" />
          <div class="product-details">
            <h3>{{ item.name }}</h3>
            <p class="product-price">
              Price: {{ formatPrice(item.price) }} грн
            </p>
            <div class="quantity-controls">
              <button
                @click="decreaseQuantity(item.uniqueKey)"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                :value="item.quantity"
                @input="updateQuantity(item.uniqueKey, $event.target.value)"
                class="quantity-input"
              />
              <button
                @click="increaseQuantity(item.uniqueKey)"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <p class="product-subtotal">
              Subtotal: {{ formatPrice(item.price * item.quantity) }} грн
            </p>
            <button
              @click="removeFromCart(item.uniqueKey)"
              class="remove-button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-item">
          <span>Items:</span>
          <span>{{ totalQuantity }}</span>
        </div>
        <div class="summary-item">
          <span>Subtotal:</span>
          <span>{{ formatPrice(totalPrice) }} грн</span>
        </div>
        <div class="summary-item">
          <span>Tax (20%):</span>
          <span>{{ formatPrice(tax) }} грн</span>
        </div>
        <div class="summary-item">
          <span>Shipping:</span>
          <span>{{ formatPrice(shipping) }} грн</span>
        </div>
        <hr />
        <div class="summary-total">
          <span>Total:</span>
          <span>{{ formatPrice(total) }} грн</span>
        </div>
        <button @click="proceedToCheckout" class="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <img src="/images/Cart/empty-cart.png" alt="Empty Cart" />
      <p>Your cart is empty.</p>
      <button @click="continueShopping" class="continue-shopping-button">
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import { useToast } from 'vue-toastification'

export default {
  name: 'CartView',
  setup() {
    const cartStore = useCartStore()
    const router = useRouter()
    const toast = useToast()

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
      toast.success('Item removed from cart.')
    }

    const increaseQuantity = uniqueKey => {
      const item = cartStore.cartItems.find(
        item => item.uniqueKey === uniqueKey
      )
      if (item) {
        cartStore.updateQuantity(uniqueKey, item.quantity + 1)
      }
    }

    const decreaseQuantity = uniqueKey => {
      const item = cartStore.cartItems.find(
        item => item.uniqueKey === uniqueKey
      )
      if (item && item.quantity > 1) {
        cartStore.updateQuantity(uniqueKey, item.quantity - 1)
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

    const proceedToCheckout = async () => {
      if (cartStore.cartItems.length === 0) {
        toast.error('Your cart is empty.')
        return
      }

      // Initialize Stripe
      const stripe = await loadStripe(
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      )

      // Create a Checkout Session on the server
      try {
        const response = await fetch(
          'http://localhost:4242/create-checkout-session',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems.value }),
          }
        )

        const session = await response.json()

        if (session.url) {
          // Redirect to Stripe Checkout
          window.location.href = session.url
          toast.success('Redirecting to checkout...')
        } else {
          toast.error('Unable to proceed to checkout. Please try again later.')
        }
      } catch (error) {
        console.error('Error creating checkout session:', error)
        toast.error('An error occurred. Please try again.')
      }
    }

    const continueShopping = () => {
      router.push({ name: 'Home' })
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

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: 600;
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
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  flex: 1;
}

.product-details h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.product-price,
.product-subtotal {
  font-size: 1rem;
  margin: 5px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.2s ease;
}

.quantity-controls button:hover {
  background-color: #e0e0e0;
}

.quantity-input {
  width: 60px;
  height: 36px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.remove-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ff4d4f;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: #d9363e;
}

/* Cart Summary */
.cart-summary {
  flex: 1;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart-summary h2 {
  margin-bottom: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 20px 0;
}

.cart-summary hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

.checkout-button {
  width: 100%;
  padding: 15px;
  background-color: #52c41a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.checkout-button:hover {
  background-color: #41a516;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  margin-top: 100px;
}

.empty-cart img {
  width: 200px;
  margin-bottom: 30px;
}

.empty-cart p {
  font-size: 1.5rem;
  color: #666;
}

.continue-shopping-button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.continue-shopping-button:hover {
  background-color: #146bb2;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .cart-container {
    flex-direction: column;
  }

  .cart-summary {
    width: 100%;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-image {
    width: 100%;
    height: auto;
  }

  .quantity-controls {
    justify-content: flex-start;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.75rem;
  }

  .cart-summary {
    padding: 20px;
  }

  .checkout-button {
    padding: 12px;
  }
}
</style>
