<template>
    <div class="search-container">
      <input
        type="text"
        :placeholder="t('search')"
        v-model="searchTerm"
        @input="onInput"
        @keydown.enter.prevent="onEnter"
        aria-label="Search Products"
        @focus="showDropdown = true"
        @blur="handleBlur"
      />
      <!-- Optional: Add a search icon inside the input -->
      <img src="/images/1.jpg" alt="Search" class="search-icon" />
  
      <!-- Dropdown for search results -->
      <ul v-if="showDropdown && filteredResults.length" class="results-dropdown">
        <li 
          v-for="product in filteredResults" 
          :key="product.id" 
          @mousedown.prevent="selectProduct(product)"
        >
          {{ product.name }}
        </li>
      </ul>
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="loading-spinner">Loading...</div>
      <!-- Error Message -->
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  import { useI18n } from 'vue-i18n';
  import debounce from 'lodash.debounce'; // Using lodash.debounce for better reliability
  
  export default {
    name: 'SearchBar',
    props: {
      allProducts: {
        type: Array,
        required: true,
      },
    },
    emits: ['search-selected'],
    setup(props, { emit }) {
      const { t } = useI18n(); // Access the translation function
  
      const searchTerm = ref('');
      const filteredResults = ref([]);
      const isLoading = ref(false);
      const error = ref(null);
      const showDropdown = ref(false);
  
      // Debounced search function using lodash.debounce
      const performSearch = debounce(() => {
        const query = searchTerm.value.trim().toLowerCase();
        if (query.length === 0) {
          filteredResults.value = [];
          isLoading.value = false;
          return;
        }
  
        isLoading.value = true;
        error.value = null;
  
        try {
          // Simulate async search (replace with actual API call if needed)
          const results = props.allProducts.filter(product =>
            product.name.toLowerCase().includes(query)
          );
          filteredResults.value = results;
        } catch (err) {
          console.error(err);
          error.value = t('search_error') || 'Error searching products.';
        } finally {
          isLoading.value = false;
        }
      }, 300); // 300ms debounce
  
      // Watch for changes in searchTerm and perform search
      watch(searchTerm, performSearch);
  
      const selectProduct = (product) => {
        emit('search-selected', product);
        searchTerm.value = '';
        filteredResults.value = [];
        showDropdown.value = false;
      };
  
      const onInput = () => {
        // Show dropdown when user types
        showDropdown.value = true;
      };
  
      const onEnter = () => {
        if (filteredResults.value.length > 0) {
          emit('search-selected', filteredResults.value[0]);
          searchTerm.value = '';
          filteredResults.value = [];
          showDropdown.value = false;
        }
      };
  
      // Handle clicking outside to close the dropdown
      const handleClickOutside = (event) => {
        if (!event.target.closest('.search-container')) {
          showDropdown.value = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
      });
  
      onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
      });
  
      // Handle blur event with a slight delay to allow click events on dropdown items
      const handleBlur = () => {
        setTimeout(() => {
          showDropdown.value = false;
        }, 200);
      };
  
      return {
        searchTerm,
        filteredResults,
        isLoading,
        error,
        selectProduct,
        onInput,
        onEnter,
        showDropdown,
        t,
        handleBlur,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    position: center;
    width: 100%;
    margin: 0 auto; /* Center the search bar if needed */
  }
  
  .search-container input {
    width: 100%;
    padding: 15px 40px 15px 20px; /* Extra padding for the search icon */
    border-radius: 15px;
    border: none;
    outline: none;
    font-size: 18px;
    background-color: #ffffff;
    color: #333333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Include padding in width */
  }
  
  .search-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    pointer-events: none; /* Allows clicks to pass through */
  }
  
  .results-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    list-style: none;
    margin: 5px 0 0 0;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .results-dropdown li {
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }
  
  .results-dropdown li:hover {
    background-color: #f0f0f0;
    color: #007bff;
  }
  
  .loading-spinner,
  .error-message {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 10px;
    background: white;
    text-align: center;
    border: 1px solid #ddd;
    border-top: none;
    z-index: 1001;
  }
  
  .loading-spinner {
    background-color: #f9f9f9;
  }
  
  .error-message {
    background-color: #ffe6e6;
    color: #cc0000;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .search-container {
      max-width: 100%;
      margin: 0 10px;
    }
  
    .search-container input {
      font-size: 16px;
      padding: 10px 35px 10px 10px;
    }
  
    .search-icon {
      width: 18px;
      height: 18px;
      right: 10px;
    }
  
    .results-dropdown li {
      padding: 10px 15px;
      font-size: 14px;
    }
  }
  </style>
  