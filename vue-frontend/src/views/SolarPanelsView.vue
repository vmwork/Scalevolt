<template>
  <div class="catalogue-view">
    <Breadcrumb :breadcrumbs="localizedBreadcrumbs" class="breadcrumb-spacing" />
    <h1>{{ $t('categories.solarPanels') }}</h1>
    
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
  name: 'SolarPanels',
  components: {
    ProductCard,
    Breadcrumb,
  },
  setup() {
    const { t, locale } = useI18n();
    const cartStore = useCartStore();
    const route = useRoute();
    const categoryId = route.params.id || null;

    // Product data with translation keys for each product
    const products = ref([
      {
        id: 1,
        nameKey: 'products.solarPanels.longi410Black',
        defaultName: 'Сонячна Панель Longi-410-Black',
        price: 1000,
        image: '/images/Categories/solar.panels/Longi-410-Black.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 2,
        nameKey: 'products.solarPanels.longi420Black',
        defaultName: 'Сонячна Панель Longi-420-Black',
        price: 1200,
        image: '/images/Categories/solar.panels/Longi-420-Black.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 3,
        nameKey: 'products.solarPanels.longi425Black',
        defaultName: 'Сонячна Панель Longi-425-Black',
        price: 1000,
        image: '/images/Categories/solar.panels/Longi-425-Black.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 4,
        nameKey: 'products.solarPanels.longi530Black',
        defaultName: 'Сонячна Панель Longi-530-Black',
        price: 1200,
        image: '/images/Categories/solar.panels/Longi-530-Black.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 5,
        nameKey: 'products.solarPanels.longi630Bifacial',
        defaultName: 'Сонячна Панель Longi-630-Bifacial',
        price: 1000,
        image: '/images/Categories/solar.panels/Longi-630-Bifacial.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 6,
        nameKey: 'products.solarPanels.longi430',
        defaultName: 'Сонячна Панель Longi-430',
        price: 1200,
        image: '/images/Categories/solar.panels/Longi-430.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 7,
        nameKey: 'products.solarPanels.longi580',
        defaultName: 'Сонячна Панель Longi-580',
        price: 1000,
        image: '/images/Categories/solar.panels/Longi-580.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 8,
        nameKey: 'products.solarPanels.longi585',
        defaultName: 'Сонячна Панель Longi-585',
        price: 1200,
        image: '/images/Categories/solar.panels/Longi-585.png',
        brand: 'Longi',
        categoryId: 1,
      },
      {
        id: 9,
        nameKey: 'products.solarPanels.longi440',
        defaultName: 'Сонячна Панель Longi-440',
        price: 1000,
        image: '/images/Categories/solar.panels/Longi-440.png',
        brand: 'Longi-440',
        categoryId: 1,
      },
      {
        id: 10,
        nameKey: 'products.solarPanels.longi455',
        defaultName: 'Сонячна Панель Longi-455',
        price: 1200,
        image: '/images/Categories/solar.panels/Longi-455.png',
        brand: 'Longi',
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

    // Get translated product name based on current locale
    const getTranslatedProductName = (product) => {
      return t(product.nameKey, product.defaultName);
    };

    // Define localized breadcrumbs
    const localizedBreadcrumbs = computed(() => [
      { name: t('common.home'), link: '/' },
      { name: t('common.categories'), link: '/catalogue' },
      { name: t('categories.solarPanels') },
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
