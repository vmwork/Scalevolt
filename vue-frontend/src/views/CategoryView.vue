<template>
    <div class="category-view">
      <h1>{{ categoryName }}</h1>
      <div class="products-container">
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
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductCard from '@/components/ProductCard.vue';
  import productService from '@/services/productService';
  
  export default {
    name: 'CategoryView',
    components: {
      ProductCard,
    },
    props: {
      id: {
        type: [Number, String],
        required: true,
      },
    },
    setup(props) {
      const products = ref([]);
      const loading = ref(true);
      const categoryName = ref('');
  
      const fetchProductsByCategory = async () => {
        try {
          const response = await productService.getProducts({
            populate: ['general_information.images', 'pricing_and_inventory'],
            filters: {
              categoryId: {
                $eq: props.id,
              },
            },
          });
          products.value = response.data.data;
          if (products.value.length > 0) {
            categoryName.value = products.value[0].attributes.categoryName || 'Категорія';
          } else {
            categoryName.value = 'Категорія';
          }
        } catch (error) {
          console.error('Error fetching products by category:', error);
        } finally {
          loading.value = false;
        }
      };
  
      fetchProductsByCategory();
  
      const filteredProducts = computed(() => products.value);
  
      return {
        filteredProducts,
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
  