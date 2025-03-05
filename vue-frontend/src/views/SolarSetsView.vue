<template>
  <div class="catalogue-view">
    <!-- Breadcrumb Component with same design classes -->
    <Breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb-spacing" />

    <h1>{{ pageTitle }}</h1>

    <!-- Product Listing -->
    <div class="products-container">
      <div v-for="product in displayedProducts" :key="product.uniqueKey" class="product-card-wrapper">
        <!-- Wrap ProductCard in <router-link> to /product/:id -->
        <router-link :to="`/product/${product.id}`" style="text-decoration: none; color: inherit;">
          <!-- ProductCard component -->
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
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useCartStore } from '@/stores/cart';

export default {
  name: 'SolarSets',
  components: {
    ProductCard,
    Breadcrumb,
  },
  setup() {
    const cartStore = useCartStore();
    const route = useRoute();
    
    // Get category ID from the route and ensure it's correctly parsed
    const categoryId = computed(() => {
      return route.params.id ? Number(route.params.id) : null;
    });

    const products = ref([
      {
        id: 50,
        name: 'Гибридная солнечная электростанция на 30кВ з АКБ 60кВ',
        price: 1000,
        image: '/images/solar.set.hybrid.30kw.with.АКБ-60кВ.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 51,
        name: 'Сонячна Панель Longi-420-Black',
        price: 1200,
        image: '/images/Longi-420-Black.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 52,
        name: 'Сонячна Панель Longi-425-Black',
        price: 1000,
        image: '/images/Longi-425-Black.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 53,
        name: 'Сонячна Панель Longi-530-Black',
        price: 1200,
        image: '/images/Longi-530-Black.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 54,
        name: 'Сонячна Панель Longi-630-Bifacial',
        price: 1000,
        image: '/images/Longi-630-Bifacial.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 55,
        name: 'Сонячна Панель Longi-430',
        price: 1200,
        image: '/images/Longi-430.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 56,
        name: 'Сонячна Панель Longi-580',
        price: 1000,
        image: '/images/Longi-580.png',
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 57,
        name: 'Сонячна Панель Longi-585',
        price: 1200,
        image: '/images/Longi-585.png', // Fixed missing .png extension
        brand: 'Longi',
        categoryId: 5,
      },
      {
        id: 58,
        name: 'Сонячна Панель Longi-440',
        price: 1000,
        image: '/images/Longi-440.png',
        brand: 'Longi-440',
        categoryId: 5,
      },
      {
        id: 59,
        name: 'Сонячна Панель Longi-455',
        price: 1200,
        image: '/images/Longi-455.png',
        brand: 'Longi',
        categoryId: 5,
      },
    ]);

    // Add uniqueKey to each product
    products.value.forEach((product) => {
      product.uniqueKey = product.id;
    });

    // Filter products based on category ID
    const displayedProducts = computed(() => {
      if (categoryId.value !== null && categoryId.value !== undefined) {
        return products.value.filter((product) => product.categoryId === categoryId.value);
      }
      return products.value; // If no category is selected, return all products
    });

    // Debugging: Log values to console
    watchEffect(() => {
      console.log("Category ID:", categoryId.value);
      console.log("Filtered Products:", displayedProducts.value);
    });

    // Define breadcrumbs
    const breadcrumbs = ref([
      { name: 'Home', link: '/' },
      { name: 'Каталог', link: '/catalogue' },
      { name: 'SolarSets' },
    ]);

    const pageTitle = 'SolarSets';

    return {
      displayedProducts,
      pageTitle,
      breadcrumbs,
    };
  },
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 20px;
}


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


.product-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.product-header {
  position: relative;
  padding: 1rem;
  background: #f8f9fa;
}

.product-checkbox {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  transform: scale(1.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  display: block;
}

.product-details {
  padding: 1rem;
}

.brand {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #333;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 1rem 0;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #359c6d;
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>