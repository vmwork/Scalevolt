<template>
  <div class="catalogue-view">
    <!-- Breadcrumb Component with same design classes -->
    <Breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb-spacing" />

    <h1>{{ pageTitle }}</h1>

    <!-- Product Listing -->
    <div class="products-container">
      <div
        v-for="product in products"
        :key="product.uniqueKey"
        class="product-card-wrapper"
      >
        <ProductCard
          :title="product.name"
          :price="product.price"
          :image-src="product.image"
          :brand="product.brand"
        />

        <!-- Add to Cart Section with Quantity Selector -->
        <div class="add-to-cart-section">
          <div v-if="isProductInCart(product.uniqueKey)">
            <button @click="decreaseQuantity(product.uniqueKey)">-</button>
            <span>{{ getProductQuantity(product.uniqueKey) }}</span>
            <button @click="increaseQuantity(product.uniqueKey)">+</button>
          </div>
          <div v-else>
            <input
              type="number"
              v-model.number="productQuantities[product.uniqueKey]"
              min="1"
              @input="validateQuantity(product.uniqueKey)"
              class="quantity-input"
            />
            <button @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useCartStore } from '@/stores/cart';

export default {
  name: 'AutomaticSwitches',
  components: {
    ProductCard,
    Breadcrumb,
  },
  setup() {
    const cartStore = useCartStore();

    // Define breadcrumb path
    const breadcrumbs = ref([
      { name: 'Головна', link: '/' },
      { name: 'Низьковольтна Продукція', link: '#' },
      { name: 'Автоматичні вимикачі' },
    ]);

    const products = ref([
      // ... Your existing products
    ]);

    // Add uniqueKey to each product
    products.value.forEach((product) => {
      product.uniqueKey = product.id;
    });

    // Reactive object to hold quantities for each product
    const productQuantities = ref({});
    products.value.forEach((product) => {
      productQuantities.value[product.uniqueKey] = 1; // Default quantity is 1
    });

    // Cart-related methods
    const isProductInCart = (uniqueKey) => {
      return cartStore.cartItems.some((item) => item.uniqueKey === uniqueKey);
    };

    const getProductQuantity = (uniqueKey) => {
      return cartStore.getItemQuantity(uniqueKey);
    };

    const addToCart = (product) => {
      const quantity = productQuantities.value[product.uniqueKey];
      cartStore.addToCart({
        ...product,
        quantity,
      });
    };

    const increaseQuantity = (uniqueKey) => {
      cartStore.increaseQuantity(uniqueKey);
    };

    const decreaseQuantity = (uniqueKey) => {
      cartStore.decreaseQuantity(uniqueKey);
    };

    const validateQuantity = (uniqueKey) => {
      const qty = productQuantities.value[uniqueKey];
      if (qty < 1 || isNaN(qty)) {
        productQuantities.value[uniqueKey] = 1;
      }
    };

    const pageTitle = 'Автоматичні вимикачі';

    return {
      breadcrumbs,
      products,
      pageTitle,
      productQuantities,
      isProductInCart,
      getProductQuantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      validateQuantity,
    };
  },
};
</script>

<style scoped>
/* Adds space if your header is fixed. Adjust as needed. */
.catalogue-view {
  margin-top: 80px;
}

/* If your Breadcrumb.vue has .breadcrumb-spacing styling, 
   this ensures consistent margin or spacing for the breadcrumb */
.breadcrumb-spacing {
  margin-bottom: 1rem; 
  /* margin-top: 1rem;  optionally add top spacing if you like */
}

/* Your existing styles */
.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Five columns */
  gap: 15px;
  padding: 20px;
  background-color: #f9fafb;
}

/* Responsive styles */
@media (max-width: 1600px) {
  .products-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1200px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-container {
    grid-template-columns: 1fr;
  }
}
</style>
