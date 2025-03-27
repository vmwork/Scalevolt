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
        :imageSrc="getProductImage(product)"
        :brand="product.brand"
        :isRentalItem="product.isRentalItem"
        :rentalPrices="product.rentalPrices"
      />
    </div>
    
    <!-- No products found message -->
    <div v-else class="no-products">
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted } from 'vue';
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
    
    // Expanded route to type mapping
    const routeToType = {
      '/generators': 'Генератори',
      '/industrial-generators': 'Промислові генератори для важких навантажень (100 кВт+)',
      '/solar-lighting-towers': 'Освітлювальні вежі на сонячних батареях',
      '/lifts-and-cranes': 'Підйомники та Крани',
      '/dc-charging-stations': 'Швидкі Зарядні Станції (DC)',
      '/ac-charging-stations': 'Зарядні Станції Рівня 2 (AC)',
      '/portable-charging-devices': 'Портативні/Мобільні Зарядні Пристрої',
      '/solar-panels': 'Сонячні Панелі',
      '/batteries': 'Батареї',
      '/inverters': 'Інвертори',
      '/solar-sets': 'SolarSets',
      '/mounting-systems': 'Система монтажу сонячних панелей'
    };

    // Rental categories that should use rental item display
    const rentalCategories = [
      'Генератори', 
      'Промислові генератори для важких навантажень (100 кВт+)', 
      'Освітлювальні вежі на сонячних батареях',
      'Підйомники та Крани'
    ];

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

    // Fetch products by type
    const fetchProductsByType = async (type) => {
      loading.value = true;
      try {
        // First, try API
        try {
          const response = await productService.getProducts({ 
            filters: { 
              type: { $eq: type } 
            },
            populate: ['general_information.images', 'pricing_and_inventory']
          });
          
          if (response.data && response.data.length > 0) {
            products.value = response.data.map(product => {
              const isRental = rentalCategories.includes(type);
              return {
                id: product.id,
                name: product.attributes?.name || product.name,
                price: product.attributes?.pricing_and_inventory?.price || product.price,
                image: product.attributes?.general_information?.images?.data?.[0]?.attributes?.url || product.image,
                brand: product.attributes?.general_information?.brand || product.brand,
                // Add rental-specific properties
                isRentalItem: isRental,
                rentalPrices: isRental ? {
                  day: product.attributes?.pricing_and_inventory?.day_price || 150,
                  week: product.attributes?.pricing_and_inventory?.week_price || 300,
                  month: product.attributes?.pricing_and_inventory?.month_price || 600
                } : {}
              };
            });
            return;
          }
        } catch (apiError) {
          console.warn('API fetch failed, falling back to mock products', apiError);
        }

        // Fallback to mock data with rental information
        products.value = mockProducts
          .filter(product => 
            product.type === type || 
            product.type?.toLowerCase() === type.toLowerCase()
          )
          .map(product => {
            const isRental = rentalCategories.includes(type);
            return {
              ...product,
              isRentalItem: isRental,
              rentalPrices: isRental ? (product.rentalPrices || {
                day: 150,
                week: 300,
                month: 600
              }) : {}
            };
          });
      } catch (error) {
        console.error('Error fetching products by type:', error);
        products.value = [];
      } finally {
        loading.value = false;
      }
    };

    // Fetch products by category ID
    const fetchProductsByCategory = async (categoryId) => {
      loading.value = true;
      try {
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