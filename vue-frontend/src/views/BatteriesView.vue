<template>
  <div class="catalogue-view">
    <Breadcrumb :breadcrumbs="localizedBreadcrumbs" class="breadcrumb-spacing" />
    <h1>{{ $t('categories.batteries') }}</h1>
    
    <div class="products-container">
      <div
        v-for="product in displayedProducts"
        :key="product.uniqueKey"
        class="product-card-wrapper"
      >
        <router-link
          :to="`/product/${product.id}`"
          style="text-decoration: none; color: inherit;"
        >
          <ProductCard
            :productId="product.id"
            :title="getTranslatedProductName(product)"
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
import { useI18n } from 'vue-i18n';
import ProductCard from '@/components/ProductCard.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useCartStore } from '@/stores/cart';

export default {
  name: 'Batteries',
  components: {
    ProductCard,
    Breadcrumb,
  },
  setup() {
    const { t, locale } = useI18n();
    const cartStore = useCartStore();
    const route = useRoute();
    const categoryId = route.params.id || null;

    // Product data with translation keys
    const products = ref([
      {
        id: 11,
        nameKey: 'products.batteries.deyeRWM61B1',
        defaultName: 'АКБ Deye RW-M6.1-B-1',
        price: 1000,
        image: '/images/Categories/batteries/АКБ.Deye.RW-M6.1-B-1.jpg',
        brand: 'Deye',
        categoryId: 2,
      },
      {
        id: 12,
        nameKey: 'products.batteries.rwM53Pro1',
        defaultName: 'RW-M5.3-Pro_1',
        price: 1200,
        image: '/images/Categories/batteries/RW-M5.3-Pro_1-2.jpg',
        brand: 'Deye',
        categoryId: 2,
      },
      {
        id: 13,
        nameKey: 'products.batteries.deyeRWF106',
        defaultName: 'Deye-RW-F10.6-51.2V-208AH-10.64KWH-1',
        price: 1000,
        image: '/images/Categories/batteries/Deye-RW-F10.6-51.2V-208AH-10.64KWH-1.png',
        brand: 'Deye',
        categoryId: 2,
      },
      {
        id: 14,
        nameKey: 'products.batteries.pylontechUS5000',
        defaultName: 'АКБ-Pylontech-US5000',
        price: 1200,
        image: '/images/Categories/batteries/АКБ-Pylontech-US5000-1.jpg',
        brand: 'Pylontech',
        categoryId: 2,
      },
      {
        id: 15,
        nameKey: 'products.batteries.dyness48V50Ah',
        defaultName: 'АКБ-Dyness-48V-50Ah-1',
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

    // Get translated product name based on current locale
    const getTranslatedProductName = (product) => {
      return t(product.nameKey, product.defaultName);
    };

    // Define localized breadcrumbs
    const localizedBreadcrumbs = computed(() => [
      { name: t('common.home'), link: '/' },
      { name: t('common.categories'), link: '/catalogue' },
      { name: t('categories.batteries') },
    ]);

    return {
      displayedProducts,
      getTranslatedProductName,
      localizedBreadcrumbs,
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
  