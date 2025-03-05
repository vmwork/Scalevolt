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
          id: 30,
          name: 'Deye Hybrid 5kw 1ph',
          price: 1000,
          image: '/images/deye-hybrid-5kw-1ph-48V.png',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 31,
          name: 'Deye Hybrid 6kw 1ph',
          price: 1200,
          image: '/images/deye-hybrid-6kw-1ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 32,
          name: 'Deye Hybrid 8kw 1ph',
          price: 1000,
          image: '/images/deye-hybrid-8kw-1ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 33,
          name: 'Deye Hybrid 10kw 1ph',
          price: 1200,
          image: '/images/deye-hybrid-10kw-1ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 34,
          name: 'Deye Hybrid 10kw 3ph',
          price: 1000,
          image: '/images/deye-hybrid-10kw-3ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 35,
          name: 'Deye Hybrid 12kw 1ph',
          price: 1200,
          image: '/images/deye-hybrid-12kw-1ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 36,
          name: 'Deye Hybrid 12kw 3ph',
          price: 1000,
          image: '/images/deye-hybrid-12kw-3ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 37,
          name: 'Deye Hybrid 15kw 3ph',
          price: 1200,
          image: '/images/deye-hybrid-15kw-3ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 38,
          name: 'Deye Hybrid 16kw 1ph',
          price: 1000,
          image: '/images/deye-hybrid-16kw-1ph-48V',
          brand: 'Deye',
          categoryId: 1,
        },
        {
          id: 39,
          name: 'Deye Hybrid 16kw 3ph',
          price: 1200,
          image: '/images/deye-hybrid-16kw-3ph-48V',
          brand: 'Deye',
          categoryId: 1,
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
        { name: 'Інвертори' },
      ]);
  
      const pageTitle = 'Інвертори';
  
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
  