<template>
  <div class="product-card">
    <!-- Wrap image in router-link -->
    <router-link :to="productLink" class="product-image">
      <img :src="imageSrc" :alt="title || 'Product Image'" />
    </router-link>

    <!-- Wrap title in router-link -->
    <router-link :to="productLink" class="product-name">
      <h2>{{ title }}</h2>
    </router-link>

    <!-- Conditionally show brand if not empty -->
    <div v-if="brand" class="product-brand">
      Brand: {{ brand }}
    </div>

    <h3 class="product-price">{{ price }} грн</h3>

    <!-- Add to Cart Button Logic -->
    <div v-if="cartCount === 0">
      <button class="add-to-cart" @click="handleAddToCart">Add to Cart</button>
    </div>
    <div v-else class="quantity-controls">
      <button @click="decreaseCount" class="decrement-btn">-</button>
      <span class="quantity-number">{{ cartCount }}</span>
      <button @click="increaseCount" class="increment-btn">+</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const cartStore = useCartStore();

    // Computed property to get the current quantity from the store
    const cartCount = computed(() => cartStore.getItemQuantity(props.productId));

    // Computed property for the product link
    const productLink = computed(() => `/product/${props.productId}`);

    // Method to add product to cart
    const addToCart = () => {
      console.log('Adding product to cart:', props.productId);
      cartStore.addToCart({
        id: props.productId,
        name: props.title,
        price: props.price,
        image: props.imageSrc,
        brand: props.brand,
        uniqueKey: props.productId, // Ensure uniqueKey is consistent
        quantity: 1,
      });
    };

    // Method to handle adding to cart
    const handleAddToCart = () => {
      addToCart();
    };

    // Method to increase quantity
    const increaseCount = () => {
      cartStore.increaseQuantity(props.productId);
    };

    // Method to decrease quantity
    const decreaseCount = () => {
      cartStore.decreaseQuantity(props.productId);
    };

    return {
      cartCount,
      productLink,
      handleAddToCart,
      increaseCount,
      decreaseCount,
    };
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-name {
  text-decoration: none;
  color: inherit;
}

.product-name h2 {
  margin: 20px 0;
  color: #000; /* Set title color to black */
}

/* Show the brand if it's not empty */
.product-brand {
  margin-bottom: 8px;
  font-style: italic;
  color: #555;
}

.product-price {
  font-weight: bold;
}

.add-to-cart {
  background-color: #ff4f5a;
  color: #fff; /* Changed to white for better contrast */
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.add-to-cart:hover {
  background-color: #e04350;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.decrement-btn,
.increment-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ff4f5a;
  color: #ff4f5a;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.quantity-number {
  color: #000; /* Set text color to black for visibility */
  padding: 0 15px;
  font-size: 16px;
}

.decrement-btn:hover,
.increment-btn:hover {
  background-color: #ff4f5a;
  color: #fff; /* Changed to #fff for better contrast on hover */
}
</style>
