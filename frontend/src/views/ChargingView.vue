<!-- src/views/Charging.vue -->
<template>
  <div class="catalogue-view">
    <!-- Breadcrumb Component -->
    <Breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb-spacing" />

    <h1>{{ pageTitle }}</h1>

    <!-- Product Listing -->
    <div class="products-container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :title="product.name"
        :price="product.price"
        :image-src="product.image"
        :brand="product.brand"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumb from '@/components/Breadcrumb.vue'; // <-- Import the actual Breadcrumb.vue

export default {
  name: "Charging",
  components: {
    ProductCard,
    Breadcrumb,
  },
  setup() {
    // Define breadcrumb path
    const breadcrumbs = ref([
      { name: "Головна", link: "/" },
      { name: "Низьковольтна Продукція", link: "#" },
      { name: "Зарядки" },
    ]);

    // Sample products
    const products = ref([
      { id: 1, name: "Product 1", price: 500, image: "/images/1.jpg", brand: "Brand 1" },
      { id: 2, name: "Product 2", price: 700, image: "/images/2.jpg", brand: "Brand 2" },
    ]);

    const pageTitle = "Зарядки";

    return {
      breadcrumbs,
      products,
      pageTitle,
    };
  },
};
</script>

<style scoped>
/* If your header is fixed at ~60px, shift content down. */
.catalogue-view {
  margin-top: 80px;
}

/* Optional spacing for the breadcrumb. */
.breadcrumb-spacing {
  margin-bottom: 1rem;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  padding: 20px;
  background-color: #f9fafb;
}

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
