<template>
  <div class="category-view">
    <h1>{{ displayCategoryName }}</h1>

    <!-- Show Loading Indicator -->
    <div v-if="loading" class="loading-indicator">Loading products...</div>

    <!-- Show Products Only When Data is Loaded -->
    <div v-else-if="filteredProducts.length > 0" class="products-container">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :productId="product.id"
        :title="product.name || product.title"
        :price="product.price"
        :image-src="getProductImage(product)"
        :brand="product.brand"
      />
    </div>
    
    <!-- No products found message -->
    <div v-else class="no-products">
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script>
// In CategoryView.vue
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import productService from '@/services/productService';
import mockProducts from '@/data/mockProducts';  // Import the mock products

export default {
  name: 'CategoryView',
  components: {
    ProductCard,
  },
  props: {
    categoryName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const route = useRoute();
    const products = ref([]);
    const loading = ref(true);
    const categoryName = ref('');
    
    // Map route paths to category types
    const routeToType = {
      '/dc-charging-stations': 'Швидкі Зарядні Станції (DC)',
      '/ac-charging-stations': 'Зарядні Станції Рівня 2 (AC)',
      '/portable-charging-devices': 'Портативні/Мобільні Зарядні Пристрої',
      '/solar-panels': 'Сонячні Панелі',
      '/batteries': 'Батареї',
      '/inverters': 'Інвертори',
      '/solar-sets': 'SolarSets',
      '/mounting-systems': 'Система монтажу сонячних панелей'
    };

    // Determine if we should use API or mock data based on route
    const isCustomRoute = computed(() => {
      return Object.keys(routeToType).includes(route.path);
    });

    // Get display name - from props or route mapping
    const displayCategoryName = computed(() => {
      if (props.categoryName) {
        return props.categoryName;
      }
      
      if (isCustomRoute.value) {
        return routeToType[route.path] || categoryName.value;
      }
      
      return categoryName.value;
    });

    // Fetch products by category ID (for traditional categories)
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

    // Fetch mock products by type (for custom routes)
   // In CategoryView.vue
const fetchProductsByType = async (type) => {
  loading.value = true;
  try {
    // Use the API instead of mock data
    const response = await productService.getProducts({ type });
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products by type:', error);
    // Fallback to mock data if API fails
    products.value = mockProducts.filter(product => product.type === type);
  } finally {
    loading.value = false;
  }
};

    // Watch for route changes and fetch appropriate products
    watchEffect(() => {
      if (isCustomRoute.value) {
        const type = routeToType[route.path];
        if (type) {
          fetchProductsByType(type);
        }
      } else {
        const categoryId = route.params.id;
        if (categoryId) {
          fetchProductsByCategory(categoryId);
        }
      }
    });

    // Helper function to get product image
    const getProductImage = (product) => {
      if (product.images && product.images.length > 0) {
        return product.images[0];
      } else if (product.image) {
        return Array.isArray(product.image) ? product.image[0] : product.image;
      }
      return '/images/placeholder.png';
    };

    return {
      filteredProducts: computed(() => products.value),
      displayCategoryName,
      loading,
      getProductImage
    };
  },
};
</script>

<style scoped>
.category-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 130px; /* Adjust based on your header height */
}

h1 {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.loading-indicator {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>