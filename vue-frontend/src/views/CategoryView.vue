<template>
  <div class="category-view">
    <h1>{{ categoryName }}</h1>

    <!-- Show Loading Indicator -->
    <div v-if="loading">Loading products...</div>

    <!-- Show Products Only When Data is Loaded -->
    <div v-else class="products-container">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :productId="product.id"
        :title="product.name"
        :price="product.price"
        :image-src="product.image"
        :brand="product.brand"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import productService from '@/services/productService';

export default {
  name: 'CategoryView',
  components: {
    ProductCard,
  },
  setup() {
    const route = useRoute();
    const products = ref([]);
    const loading = ref(true);
    const categoryName = ref('');

    // Fetch products by category
    const fetchProductsByCategory = async (categoryId) => {
      try {
        loading.value = true;
        const response = await productService.getProducts({
          populate: ['general_information.images', 'pricing_and_inventory'],
          filters: {
            categoryId: {
              $eq: categoryId,
            },
          },
        });

        products.value = response.data.data.map((product) => ({
          id: product.id,
          name: product.attributes.name,
          price: product.attributes.pricing_and_inventory?.price || 0,
          image: product.attributes.general_information.images?.data?.[0]?.attributes?.url || '/default-image.jpg',
          brand: product.attributes.general_information.brand || 'No Brand',
        }));

        categoryName.value = products.value.length > 0 ? products.value[0].attributes.categoryName : 'Категорія';
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        loading.value = false;
      }
    };

    // Watch for route changes and fetch new products when category changes
    watchEffect(() => {
      const categoryId = route.params.id;
      if (categoryId) {
        fetchProductsByCategory(categoryId);
      }
    });

    return {
      filteredProducts: computed(() => products.value),
      categoryName,
      loading,
    };
  },
};
</script>

<style scoped>
.category-view {
  padding: 20px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
