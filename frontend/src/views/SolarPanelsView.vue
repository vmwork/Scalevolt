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
        <!-- Corrected ProductCard component tag -->
        <ProductCard
          :productId="product.id"
          :title="product.name"
          :price="product.price"
          :image-src="product.image"
          :brand="product.brand"
        />
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
        id: 1,
        name: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        image: '/images/1.jpg',
        brand: 'JA Solar',
        categoryId: 1,
      },
      {
        id: 2,
        name: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        image: '/images/2.jpg',
        brand: 'Jinko Tiger',
        categoryId: 1,
      },
      {
        id: 3,
        name: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        image: '/images/3.jpg',
        brand: 'JA Solar',
        categoryId: 1,
      },
      {
        id: 4,
        name: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        image: '/images/4.jpg',
        brand: 'Jinko Tiger',
        categoryId: 1,
      },
      {
        id: 5,
        name: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        image: '/images/5.jpg',
        brand: 'JA Solar',
        categoryId: 1,
      },
      {
        id: 6,
        name: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        image: '/images/6.jpg',
        brand: 'Jinko Tiger',
        categoryId: 1,
      },
      {
        id: 7,
        name: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        image: '/images/7.jpg',
        brand: 'JA Solar',
        categoryId: 1,
      },
      {
        id: 8,
        name: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        image: '/images/8.jpg',
        brand: 'Jinko Tiger',
        categoryId: 1,
      },
      {
        id: 9,
        name: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        image: '/images/9.jpg',
        brand: 'JA Solar',
        categoryId: 1,
      },
      {
        id: 10,
        name: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        image: '/images/10.jpg',
        brand: 'Jinko Tiger',
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
      { name: 'Сонячні Панелі' },
    ]);

    const pageTitle = 'Сонячні Панелі';

    return {
      displayedProducts,
      pageTitle,
      breadcrumbs,
    };
  },
};
</script>

<style scoped>
/* Match other pages so breadcrumb isn't hidden by a fixed header */
.catalogue-view {
  margin-top: 80px;
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
