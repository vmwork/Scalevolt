<template>
    <div class="catalogue-view">
      <!-- Breadcrumb Component with same design classes -->
      <Breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb-spacing" />
  
      <h1>{{ pageTitle }}</h1>
  
      <!-- Product Listing -->
      <div class="products-container">
        <div
          v-for="product in displayedProducts"
          :key="product.uniqueKey"
          class="product-card-wrapper"
        >
  
          <!-- Wrap ProductCard in <router-link> to /product/:id -->
            <router-link
            :to="`/product/${product.id}`"
            style="text-decoration: none; color: inherit;"
          >
  
          <!-- Corrected ProductCard component tag -->
          <ProductCard
            :productId="product.id"
            :title="product.name"
            :price="product.price"
            :image-src="product.image"
            :brand="product.brand"
               />
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductCard from '@/components/ProductCard.vue';
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import { useCartStore } from '@/stores/cart';
  
  export default {
    name: 'SolarPanels',
    components: {
      ProductCard,
      Breadcrumb,
    },
    setup() {
      const cartStore = useCartStore();
      const route = useRoute();
      const categoryId = route.params.id || null;
  
      const products = ref([
        {
          id: 11,
          name: 'АКБ Deye RW-M6.1-B-1',
          price: 1000,
          image: '/images/Categories/batteries/АКБ.Deye.RW-M6.1-B-1.jpg',
          brand: 'Deye',
          categoryId: 2,
        },
        {
          id: 12,
          name: 'RW-M5.3-Pro_1',
          price: 1200,
          image: '/images/Categories/batteries/RW-M5.3-Pro_1-2.jpg',
          brand: 'Deye',
          categoryId: 2,
        },
        {
          id: 13,
          name: 'Deye-RW-F10.6-51.2V-208AH-10.64KWH-1',
          price: 1000,
          image: '/images/Categories/batteries/Deye-RW-F10.6-51.2V-208AH-10.64KWH-1.png',
          brand: 'Deye',
          categoryId: 2,
        },
        {
          id: 14,
          name: 'АКБ-Pylontech-US5000',
          price: 1200,
          image: '/images/Categories/batteries/АКБ-Pylontech-US5000-1.jpg',
          brand: 'Pylontech',
          categoryId: 2,
        },
        {
          id: 15,
          name: 'АКБ-Dyness-48V-50Ah-1  ',
          price: 1000,
          image: '/images/Categories/batteries/АКБ-Dyness-48V-50Ah-1.jpg',
          brand: 'Dyness',
          categoryId: 2,
        },
      ]);
  
      // Add uniqueKey to each product
      products.value.forEach((product) => {
        product.uniqueKey = product.id;
      });
  
      // Filter products by categoryId if present
      const displayedProducts = computed(() => {
        if (categoryId) {
          return products.value.filter(
            (product) => product.categoryId === categoryId
          );
        }
        return products.value;
      });
  
      // Define breadcrumbs
      const breadcrumbs = ref([
        { name: 'Home', link: '/' },
        { name: 'Каталог', link: '/catalogue' },
        { name: 'Батареї' },
      ]);
  
      const pageTitle = 'Батареї';
  
      return {
        displayedProducts,
        pageTitle,
        breadcrumbs,
      };
    },
  };
  </script>
  
  <style scoped>
  
 .catalogue-view {
  padding-top: 120px; /* Header height + 10px buffer */
  margin-top: 0 !important;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 15px;
  padding: 20px;
  background-color: #f9fafb;
}
  
  /* Same class used in Breadcrumb.vue for consistent spacing */
  .breadcrumb-spacing {
    margin-bottom: 1rem;
    /* margin-top: 1rem; /* If you want additional top spacing above the breadcrumb */
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
      grid-template-columns: repeat(5, 1fr); /* Four columns */
    }
  }
  
  @media (max-width: 1200px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr); /* Three columns */
    }
  }
  
  @media (max-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr); /* Two columns */
    }
  }
  
  @media (max-width: 600px) {
    .products-container {
      grid-template-columns: 1fr; /* One column */
    }
  }
  </style>
  