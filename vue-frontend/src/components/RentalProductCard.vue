<template>
    <div class="rental-product-card" :class="{ 'selected': isSelected }">
      <!-- Product Image with Link -->
      <router-link :to="productDetailLink" class="product-image">
        <img :src="imageSrc" :alt="title" />
      </router-link>
  
      <!-- Product Title with Link -->
      <router-link :to="productDetailLink" class="product-title">
        <h3>{{ title }}</h3>
      </router-link>
  
      <!-- Rental Price Display -->
      <div class="rental-pricing">
        <div class="rental-duration-tabs">
          <button 
            v-for="(price, duration) in rentalPrices" 
            :key="duration"
            @click="selectRentalDuration(duration)"
            :class="{ 'active': selectedDuration === duration }"
          >
            {{ formatDuration(duration) }}
          </button>
        </div>
        <div class="price-display">
          {{ rentalPrices[selectedDuration] }} грн / {{ formatDurationShort(selectedDuration) }}
        </div>
      </div>
  
      <!-- Add to Cart Button or Quantity Controls -->
      <transition name="fade">
        <div v-if="quantity > 0" class="quantity-controls">
          <button @click="decreaseQuantity" class="quantity-btn decrease">-</button>
          <span class="quantity-value">{{ quantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn increase">+</button>
        </div>
        <button v-else @click="addToCart" class="add-to-cart-btn">
          {{ $t('product.rent') }}
        </button>
      </transition>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useI18n } from 'vue-i18n';
  
  export default {
    name: 'RentalProductCard',
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      title: {
        type: String,
        required: true
      },
      imageSrc: {
        type: String,
        required: true
      },
      rentalPrices: {
        type: Object,
        required: true,
        validator: function(obj) {
          return obj.day !== undefined && obj.week !== undefined && obj.month !== undefined;
        }
      },
      brand: {
        type: String,
        default: ''
      },
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const { t } = useI18n();
      const cartStore = useCartStore();
      
      // Component state
      const selectedDuration = ref('day');
      const quantity = computed(() => cartStore.getItemQuantity(props.id));
      
      // Computed properties
      const productDetailLink = computed(() => `/product/${props.id}`);
      
      // Methods
      const formatDuration = (duration) => {
        const durations = {
          'day': t('product.durations.day'),
          'week': t('product.durations.week'),
          'month': t('product.durations.month')
        };
        return durations[duration] || duration;
      };
      
      const formatDurationShort = (duration) => {
        const shortDurations = {
          'day': t('product.durations.dayShort'),
          'week': t('product.durations.weekShort'),
          'month': t('product.durations.monthShort')
        };
        return shortDurations[duration] || duration;
      };
      
      const selectRentalDuration = (duration) => {
        selectedDuration.value = duration;
      };
      
      const addToCart = () => {
        cartStore.addToCart({
          id: props.id,
          name: props.title,
          image: props.imageSrc,
          price: props.rentalPrices[selectedDuration.value],
          rentalDuration: selectedDuration.value,
          quantity: 1,
          isRental: true,
          brand: props.brand
        });
      };
      
      const increaseQuantity = () => {
        cartStore.increaseQuantity(props.id);
      };
      
      const decreaseQuantity = () => {
        cartStore.decreaseQuantity(props.id);
      };
      
      return {
        selectedDuration,
        quantity,
        productDetailLink,
        formatDuration,
        formatDurationShort,
        selectRentalDuration,
        addToCart,
        increaseQuantity,
        decreaseQuantity
      };
    }
  };
  </script>
  
  <style scoped>
  .rental-product-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    display: flex;
    flex-direction: column;
    max-width: 250px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: 1px solid #e0e0e0;
    position: relative;
  }
  
  .rental-product-card.selected {
    border-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.25);
  }
  
  .rental-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    display: block;
    margin-bottom: 15px;
    text-decoration: none;
  }
  
  .product-image img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    display: block;
  }
  
  .product-title {
    text-decoration: none;
    color: inherit;
    margin-bottom: 15px;
  }
  
  .product-title h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 45px;
  }
  
  .rental-pricing {
    margin-bottom: 15px;
  }
  
  .rental-duration-tabs {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .rental-duration-tabs button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .rental-duration-tabs button.active {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .price-display {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
  
  .add-to-cart-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 100%;
    margin-top: auto;
  }
  
  .add-to-cart-btn:hover {
    background-color: #389c3c;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #4CAF50;
    border-radius: 5px;
    overflow: hidden;
    margin-top: auto;
  }
  
  .quantity-btn {
    background-color: white;
    color: #4CAF50;
    border: none;
    width: 40px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .quantity-btn:hover {
    background-color: #f0f0f0;
  }
  
  .quantity-value {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .rental-product-card {
      max-width: 100%;
    }
  }
  </style>