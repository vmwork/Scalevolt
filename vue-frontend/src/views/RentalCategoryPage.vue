<template>
    <div class="rental-category-page">
      <!-- Category Header -->
      <div class="category-header">
        <h1>{{ categoryData.title }}</h1>
        <p>{{ categoryData.description }}</p>
      </div>
  
      <!-- Subcategories Grid (if available) -->
      <div v-if="categoryData.subcategories && categoryData.subcategories.length > 0" class="subcategories-section">
        <h2>{{ $t('category.subcategories') }}</h2>
        <div class="subcategories-grid">
          <router-link
            v-for="subcategory in categoryData.subcategories"
            :key="subcategory.id"
            :to="getSubcategoryRoute(subcategory.slug)"
            class="subcategory-card"
          >
            <img :src="subcategory.image" :alt="subcategory.name" />
            <h3>{{ subcategory.name }}</h3>
          </router-link>
        </div>
      </div>
  
      <!-- Filters & Sort Section -->
      <div class="filters-section">
        <div class="filter-group">
          <label>{{ $t('category.filterBy') }}</label>
          <select v-model="selectedFilter" @change="applyFilters">
            <option value="all">{{ $t('category.all') }}</option>
            <option value="brand">{{ $t('category.brand') }}</option>
            <option value="price">{{ $t('category.price') }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>{{ $t('category.sortBy') }}</label>
          <select v-model="selectedSort" @change="applySort">
            <option value="price-asc">{{ $t('category.priceLowToHigh') }}</option>
            <option value="price-desc">{{ $t('category.priceHighToLow') }}</option>
            <option value="name-asc">{{ $t('category.nameAToZ') }}</option>
            <option value="name-desc">{{ $t('category.nameZToA') }}</option>
          </select>
        </div>
      </div>
  
      <!-- Products Grid -->
      <div class="products-section">
        <div v-if="isLoading" class="loading-indicator">
          {{ $t('common.loading') }}...
        </div>
        <div v-else-if="filteredProducts.length === 0" class="no-products">
          {{ $t('category.noProductsFound') }}
        </div>
        <div v-else class="products-grid">
          <RentalProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :id="product.id"
            :title="product.title"
            :imageSrc="product.image"
            :rentalPrices="product.rentalPrices"
            :brand="product.brand"
          />
        </div>
      </div>
  
      <!-- Pagination if needed -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          :disabled="currentPage === 1" 
          @click="changePage(currentPage - 1)"
          class="page-button prev"
        >
          &laquo; {{ $t('common.previous') }}
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in displayedPages" 
            :key="page"
            :class="['page-number', { active: currentPage === page }]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          :disabled="currentPage === totalPages" 
          @click="changePage(currentPage + 1)"
          class="page-button next"
        >
          {{ $t('common.next') }} &raquo;
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import RentalProductCard from '@/components/RentalProductCard.vue';
  
  export default {
    name: 'RentalCategoryPage',
    components: {
      RentalProductCard
    },
    props: {
      categorySlug: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const { t } = useI18n();
      const route = useRoute();
      
      // Page state
      const isLoading = ref(true);
      const categoryData = ref({});
      const products = ref([]);
      const selectedFilter = ref('all');
      const selectedSort = ref('price-asc');
      const currentPage = ref(1);
      const itemsPerPage = 12;
      
      // Example data - this would normally come from an API
      const fetchCategoryData = async () => {
        // Simulating API call
        isLoading.value = true;
        
        // For demo purposes, we're using static data
        if (props.categorySlug === 'lifts-and-cranes') {
          categoryData.value = {
            id: 1,
            title: 'Підйомники та Крани',
            description: 'Оренда підйомного обладнання для різних потреб',
            slug: 'lifts-and-cranes',
            subcategories: [
              {
                id: 1,
                name: 'Ножичні Підйомники',
                slug: 'scissor-lifts',
                image: '/images/categories/scissor-lifts.png'
              },
              {
                id: 2,
                name: 'Самохідні Підйомники',
                slug: 'boom-lifts',
                image: '/images/categories/boom-lifts.png'
              },
              {
                id: 3,
                name: 'Одномісні Підйомники',
                slug: 'single-man-lifts',
                image: '/images/categories/single-man-lifts.png'
              },
              {
                id: 4,
                name: 'Крани',
                slug: 'cranes',
                image: '/images/categories/cranes.png'
              }
            ]
          };
          
          products.value = [
            {
              id: 1,
              title: '19\' Ножичний Підйомник',
              image: '/images/equipment/19-scissor-lift.png',
              brand: 'Generic',
              rentalPrices: {
                day: 150,
                week: 300,
                month: 600
              }
            },
            {
              id: 2,
              title: '26\' Ножичний Підйомник',
              image: '/images/equipment/26-scissor-lift.png',
              brand: 'Generic',
              rentalPrices: {
                day: 250,
                week: 475,
                month: 925
              }
            },
            {
              id: 3,
              title: '32\' Ножичний Підйомник',
              image: '/images/equipment/32-scissor-lift.png',
              brand: 'Generic',
              rentalPrices: {
                day: 300,
                week: 600,
                month: 1200
              }
            },
            {
              id: 4,
              title: 'Одномісний Підйомник 12\'',
              image: '/images/equipment/12-vertical-mast-lift.png',
              brand: 'Generic',
              rentalPrices: {
                day: 100,
                week: 250,
                month: 750
              }
            },
            {
              id: 5,
              title: 'Кран 50 Тонн',
              image: '/images/equipment/50-ton-crane.png',
              brand: 'Generic',
              rentalPrices: {
                day: 1500,
                week: 4500,
                month: 13500
              }
            }
          ];
        } else if (props.categorySlug === 'generators') {
          categoryData.value = {
            id: 2,
            title: 'Генератори',
            description: 'Оренда генераторів для забезпечення електроенергією',
            slug: 'generators',
            subcategories: [
              {
                id: 5,
                name: 'Бензинові Генератори',
                slug: 'petrol-generators',
                image: '/images/categories/petrol-generators.png'
              },
              {
                id: 6,
                name: 'Дизельні Генератори',
                slug: 'diesel-generators',
                image: '/images/categories/diesel-generators.png'
              },
              {
                id: 7,
                name: 'Інверторні Генератори',
                slug: 'inverter-generators',
                image: '/images/categories/inverter-generators.png'
              }
            ]
          };
          
          products.value = [
            {
              id: 101,
              title: 'HONDA EU 30 iS (2,7)',
              image: '/images/equipment/honda-eu30is.png',
              brand: 'Honda',
              rentalPrices: {
                day: 650,
                week: 3000,
                month: 12000
              }
            },
            {
              id: 102,
              title: 'HONDA EU 20i',
              image: '/images/equipment/honda-eu20i.png',
              brand: 'Honda',
              rentalPrices: {
                day: 550,
                week: 2500,
                month: 10000
              }
            },
            {
              id: 103,
              title: 'HONDA EU 10i',
              image: '/images/equipment/honda-eu10i.png',
              brand: 'Honda',
              rentalPrices: {
                day: 450,
                week: 2000,
                month: 8000
              }
            },
            {
              id: 104,
              title: 'Дизельний генератор 20 кВт',
              image: '/images/equipment/diesel-20kw.png',
              brand: 'Generic',
              rentalPrices: {
                day: 1200,
                week: 5000,
                month: 20000
              }
            }
          ];
        } else {
          // Default empty state
          categoryData.value = {
            title: 'Category Not Found',
            description: 'The requested category does not exist',
            subcategories: []
          };
          products.value = [];
        }
        
        isLoading.value = false;
      };
      
      // Computed values
      const filteredProducts = computed(() => {
        let result = [...products.value];
        
        // Apply filters
        if (selectedFilter.value === 'brand' && route.query.brand) {
          result = result.filter(product => product.brand === route.query.brand);
        } else if (selectedFilter.value === 'price' && route.query.minPrice && route.query.maxPrice) {
          const minPrice = parseFloat(route.query.minPrice);
          const maxPrice = parseFloat(route.query.maxPrice);
          result = result.filter(product => {
            const dailyPrice = product.rentalPrices.day;
            return dailyPrice >= minPrice && dailyPrice <= maxPrice;
          });
        }
        
        // Apply sorting
        if (selectedSort.value === 'price-asc') {
          result.sort((a, b) => a.rentalPrices.day - b.rentalPrices.day);
        } else if (selectedSort.value === 'price-desc') {
          result.sort((a, b) => b.rentalPrices.day - a.rentalPrices.day);
        } else if (selectedSort.value === 'name-asc') {
          result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedSort.value === 'name-desc') {
          result.sort((a, b) => b.title.localeCompare(a.title));
        }
        
        // Pagination
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        return result.slice(startIndex, endIndex);
      });
      
      const totalItems = computed(() => products.value.length);
      const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
      
      const displayedPages = computed(() => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages.value <= maxVisiblePages) {
          // Show all pages if there are few
          for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
          }
        } else {
          // Show a subset of pages with the current page in the middle
          const halfVisible = Math.floor(maxVisiblePages / 2);
          let startPage = currentPage.value - halfVisible;
          let endPage = currentPage.value + halfVisible;
          
          if (startPage < 1) {
            endPage += (1 - startPage);
            startPage = 1;
          }
          
          if (endPage > totalPages.value) {
            startPage -= (endPage - totalPages.value);
            endPage = totalPages.value;
          }
          
          // Ensure startPage is not negative
          startPage = Math.max(1, startPage);
          
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }
        }
        
        return pages;
      });
      
      // Methods
      const getSubcategoryRoute = (slug) => `/${props.categorySlug}/${slug}`;
      
      const applyFilters = () => {
        // This would normally update the route/URL with query params
        // For demo purposes, we're just updating the local state
      };
      
      const applySort = () => {
        // This would normally update the route/URL with query params
        // For demo purposes, we're just updating the local state
      };
      
      const changePage = (page) => {
        currentPage.value = page;
        window.scrollTo(0, 0); // Scroll to top on page change
      };
      
      // Lifecycle hooks
      onMounted(() => {
        fetchCategoryData();
      });
      
      return {
        isLoading,
        categoryData,
        filteredProducts,
        selectedFilter,
        selectedSort,
        currentPage,
        totalPages,
        displayedPages,
        getSubcategoryRoute,
        applyFilters,
        applySort,
        changePage
      };
    }
  };
  </script>
  
  <style scoped>
  .rental-category-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .category-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .category-header h1 {
    font-size: 32px;
    color:#333;
  margin-bottom: 10px;
}

.category-header p {
  font-size: 16px;
  color: #666;
}

/* Subcategories Section */
.subcategories-section {
  margin-bottom: 40px;
}

.subcategories-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.subcategories-grid {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
}

.subcategory-card {
  min-width: 180px;
  max-width: 200px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.subcategory-card:hover {
  transform: translateY(-5px);
}

.subcategory-card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 10px;
}

.subcategory-card h3 {
  font-size: 16px;
  color: #333;
}

/* Filters Section */
.filters-section {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group label {
  font-size: 14px;
  color: #666;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
}

/* Products Section */
.products-section {
  margin-bottom: 40px;
}

.loading-indicator {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.no-products {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 10px;
}

.page-button {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number:hover {
  background-color: #f0f0f0;
}

.page-number.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

/* Responsive styles */
@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters-section {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .subcategories-grid {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>