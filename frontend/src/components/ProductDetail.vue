<template>
  <div class="product-detail">
    <!-- Breadcrumb Component -->
    <Breadcrumb :breadcrumbs="breadcrumbs" />

    <!-- Product Details -->
    <div v-if="product">
      <h1>{{ product.attributes.general_information.name }}</h1>
      <img
        :src="getImageUrl(product.attributes.general_information.images.data[0])"
        alt="Product Image"
      />
      <div v-html="product.attributes.general_information.description"></div>
      <!-- Display other product details -->

      <!-- Add to Cart Section -->
      <div class="add-to-cart-section">
        <div v-if="itemInCart">
          <button @click="decreaseQuantity">-</button>
          <span>{{ cartQuantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>
        <button v-else @click="addToCart">Add to Cart</button>
      </div>
    </div>
    <div v-else>
      <p v-if="loading">Loading product details...</p>
      <p v-else>Product not found.</p>
    </div>
  </div>
</template>

<script>
import productService from '@/services/productService';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useCartStore } from '@/stores/cart'; // Import Pinia cart store
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'ProductDetail',
  components: {
    Breadcrumb,
  },
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();

    const product = ref(null);
    const loading = ref(true);
    const breadcrumbs = ref([]);
    const cartQuantity = ref(0);

    // Computed property to check if item is in cart
    const itemInCart = computed(() => cartQuantity.value > 0);

    const fetchProduct = async () => {
      try {
        const id = route.params.id;
        const response = await productService.getProductById(id, {
          populate: {
            general_information: {
              populate: ['images'],
            },
            pricing_and_inventory: true,
            specifications: true,
            category: true, // Ensure category is populated
          },
        });
        product.value = response.data.data;

        // Debug: Log the product data
        console.log('Product Data:', product.value);

        // Set up breadcrumbs after fetching the product
        if (product.value && product.value.attributes) {
          const productName = product.value.attributes.general_information.name;
          const categoryData =
            product.value.attributes.category &&
            product.value.attributes.category.data;

          // Debug: Log the category data
          console.log('Category Data:', categoryData);

          if (categoryData && categoryData.attributes) {
            const categoryName = categoryData.attributes.name || 'Category';
            const categoryId = categoryData.id || '';

            breadcrumbs.value = [
              { name: 'Home', link: '/' },
              { name: categoryName, link: `/category/${categoryId}` },
              { name: productName, link: '' },
            ];
          } else {
            // If category data is missing
            breadcrumbs.value = [
              { name: 'Home', link: '/' },
              { name: 'Category', link: '' },
              { name: productName, link: '' },
            ];
          }
        } else {
          breadcrumbs.value = [{ name: 'Home', link: '/' }];
        }

        // Debug: Log the breadcrumbs
        console.log('Breadcrumbs:', breadcrumbs.value);

        // Update cart quantity for this product
        updateCartQuantity();
      } catch (error) {
        console.error('Error fetching product:', error);
        product.value = null;
        breadcrumbs.value = [{ name: 'Home', link: '/' }];
      } finally {
        loading.value = false;
      }
    };

    const getImageUrl = (imageData) => {
      if (!imageData || !imageData.attributes || !imageData.attributes.url)
        return '';
      return `http://localhost:1337${imageData.attributes.url}`;
    };

    const addToCart = () => {
      if (product.value) {
        const productData = {
          id: product.value.id,
          name: product.value.attributes.general_information.name,
          price: product.value.attributes.pricing_and_inventory.price,
          // Add any other necessary product properties
        };
        cartStore.addToCart({ ...productData, quantity: 1 });
        cartQuantity.value = 1;
      }
    };

    const increaseQuantity = () => {
      if (product.value) {
        cartQuantity.value += 1;
        cartStore.updateQuantity(product.value.id, cartQuantity.value);
      }
    };

    const decreaseQuantity = () => {
      if (product.value && cartQuantity.value > 1) {
        cartQuantity.value -= 1;
        cartStore.updateQuantity(product.value.id, cartQuantity.value);
      } else if (product.value && cartQuantity.value === 1) {
        cartStore.removeFromCart(product.value.id);
        cartQuantity.value = 0;
      }
    };

    const updateCartQuantity = () => {
      if (product.value) {
        const quantity = cartStore.getItemQuantity(product.value.id);
        cartQuantity.value = quantity;
      }
    };

    watch(
      () => route.params.id,
      () => {
        loading.value = true;
        fetchProduct();
        cartQuantity.value = 0; // Reset cart quantity when product changes
      },
      { immediate: true }
    );

    watch(
      () => cartStore.cartItems,
      () => {
        updateCartQuantity();
      },
      { deep: true }
    );

    return {
      product,
      loading,
      breadcrumbs,
      cartQuantity,
      itemInCart,
      fetchProduct,
      getImageUrl,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
}

.product-detail img {
  max-width: 100%;
  height: auto;
}

.add-to-cart-section {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-to-cart-section button {
  padding: 5px 10px;
  font-size: 16px;
}

.add-to-cart-section span {
  font-size: 16px;
}
</style>
