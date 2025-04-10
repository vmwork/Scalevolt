<template>
    <div class="rental-product-page">
      <div class="container">
        <div class="product-gallery-section">
          <div class="thumbnails-column">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              :class="['thumbnail-image', { 'selected': selectedImage === index }]"
              @click="selectedImage = index"
            >
              <img :src="image" :alt="`${product.title} - image ${index + 1}`" />
            </div>
          </div>
          <div class="main-image">
            <img 
              :src="product.images[selectedImage]" 
              :alt="product.title" 
            />
          </div>
        </div>
  
        <div class="product-info-section">
          <h1 class="product-title">{{ product.title }}</h1>
          
          <div class="action-buttons">
            <button 
              :class="['wishlist-button', { 'active': isInWishlist }]"
              @click="toggleWishlist"
            >
              <i class="icon heart-icon"></i>
              <span>{{ $t('product.wishlist') }}</span>
            </button>
            
            <button class="share-button">
              <i class="icon share-icon"></i>
              <span>{{ $t('product.share') }}</span>
            </button>
          </div>
          
          <div class="price-section">
            <div class="price-label">від</div>
            <div class="price-value">{{ getRentalPrice(selectedDuration) }} ₴</div>
          </div>
          
          <!-- Rental Duration Selector -->
          <div class="rental-duration-section">
            <h3>{{ $t('product.rentalDuration') }}:</h3>
            <div class="duration-options">
              <button 
                v-for="duration in availableDurations" 
                :key="duration"
                :class="['duration-option', { 'selected': selectedDuration === duration }]"
                @click="selectedDuration = duration"
              >
                {{ formatDuration(duration) }}
              </button>
            </div>
          </div>
          
          <!-- Rental Period Calendar -->
          <div class="rental-period-section">
            <h3>{{ $t('product.rentalPeriod') }}:</h3>
            <div class="date-picker">
              <div class="date-display" @click="showCalendar = !showCalendar">
                <i class="icon calendar-icon"></i>
                <span>
                  {{ selectedStartDate ? formatDate(selectedStartDate) : $t('product.selectDate') }} 
                  {{ selectedEndDate ? `- ${formatDate(selectedEndDate)}` : '' }}
                </span>
              </div>
              
              <div v-if="showCalendar" class="calendar-dropdown">
                <div class="calendar-header">
                  <h4>{{ currentMonthName }} {{ currentYear }}</h4>
                </div>
                <div class="weekdays">
                  <div v-for="day in weekDays" :key="day">{{ day }}</div>
                </div>
                <div class="calendar-days">
                  <div 
                    v-for="(day, index) in calendarDays" 
                    :key="index"
                    :class="getCalendarDayClass(day)"
                    @click="day.value && selectDate(day.value)"
                  >
                    {{ day.label }}
                  </div>
                </div>
                <button class="close-calendar" @click="showCalendar = false">
                  {{ $t('product.applyDates') }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Quantity Selector -->
          <div class="quantity-section">
            <button class="quantity-button decrease" @click="decreaseQuantity">
              <i class="icon minus-icon"></i>
            </button>
            <span class="quantity-display">{{ quantity }}</span>
            <button class="quantity-button increase" @click="increaseQuantity">
              <i class="icon plus-icon"></i>
            </button>
          </div>
          
          <!-- Color Selector (if applicable) -->
          <div v-if="product.colors && product.colors.length > 0" class="color-section">
            <h3>{{ $t('product.selectColor') }}:</h3>
            <div class="color-options">
              <div 
                v-for="color in product.colors" 
                :key="color"
                :class="['color-option', { 'selected': selectedColor === color }]"
                :style="{ backgroundColor: color }"
                @click="selectedColor = color"
              ></div>
            </div>
          </div>
          
          <!-- Call-to-Action Buttons -->
          <div class="cta-section">
            <button class="add-to-cart-button" @click="addToCart">
              {{ $t('product.addToCart') }}
            </button>
            <button class="rent-now-button" @click="rentNow">
              {{ $t('product.rentNow') }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Specifications Section -->
      <div class="specifications-section container">
        <h2>{{ $t('product.specifications') }}:</h2>
        <div class="specs-grid">
          <div v-for="(value, key) in product.specifications" :key="key" class="spec-item">
            <div class="spec-name">{{ formatSpecName(key) }}:</div>
            <div class="spec-value">{{ value }}</div>
          </div>
        </div>
      </div>
      
      <!-- Related Products Section -->
      <div class="related-products-section container">
        <h2>{{ $t('product.youMayLike') }}</h2>
        <div class="related-products-grid">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            class="related-product-card"
          >
            <img :src="relatedProduct.image" :alt="relatedProduct.title" />
            <h3>{{ relatedProduct.title }}</h3>
            <div class="related-product-price">від {{ relatedProduct.rentalPrices.day }} ₴</div>
            <button class="add-to-cart-mini" @click.stop="addRelatedToCart(relatedProduct)">+</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useI18n } from 'vue-i18n';
  
  export default {
    name: 'RentalProductPage',
    props: {
      productId: {
        type: [Number, String],
        required: true
      }
    },
    setup(props) {
      const { t } = useI18n();
      const cartStore = useCartStore();
      
      // Product data - this would normally come from an API
      const product = ref({
        id: props.productId,
        title: 'Оренда генератора бензинового (інверторного) HONDA EU 30 iS (2,7)',
        images: [
          '/images/products/generator-1.png',
          '/images/products/generator-2.png',
          '/images/products/generator-3.png',
          '/images/products/generator-4.png',
          '/images/products/generator-5.png'
        ],
        rentalPrices: {
          day: 650,
          week: 3000,
          month: 12000
        },
        colors: ['red', 'black', 'blue', 'green', 'orange'],
        specifications: {
          nominalPower: '3.0 кВт',
          maxPower: '3.4 кВт',
          weight: '35.2 кг',
          workTime: '20 год',
          noiseLevel: '51.5 дБ'
        }
      });
      
      // Related products
      const relatedProducts = ref([
        { 
          id: 101, 
          title: 'HONDA EU 10i', 
          image: '/images/products/related-1.png',
          rentalPrices: { day: 450, week: 2000, month: 8000 }
        },
        { 
          id: 102, 
          title: 'HONDA EU 20i', 
          image: '/images/products/related-2.png',
          rentalPrices: { day: 550, week: 2500, month: 10000 }
        },
        { 
          id: 103, 
          title: 'HONDA EU 22i', 
          image: '/images/products/related-3.png',
          rentalPrices: { day: 570, week: 2700, month: 10500 }
        },
        { 
          id: 104, 
          title: 'HONDA EU 40i', 
          image: '/images/products/related-4.png',
          rentalPrices: { day: 750, week: 3500, month: 14000 }
        },
        { 
          id: 105, 
          title: 'HONDA EU 70i', 
          image: '/images/products/related-5.png',
          rentalPrices: { day: 950, week: 4500, month: 18000 }
        },
        { 
          id: 106, 
          title: 'HONDA EM 5500', 
          image: '/images/products/related-6.png',
          rentalPrices: { day: 850, week: 4000, month: 16000 }
        }
      ]);
      
      // UI state
      const selectedImage = ref(0);
      const selectedDuration = ref('day');
      const quantity = ref(1);
      const selectedColor = ref('red');
      const isInWishlist = ref(false);
      const showCalendar = ref(false);
      const selectedStartDate = ref(null);
      const selectedEndDate = ref(null);
      
      // Calendar helpers
      const today = new Date();
      const currentYear = ref(today.getFullYear());
      const currentMonth = ref(today.getMonth());
      
      const currentMonthName = computed(() => {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[currentMonth.value];
      });
      
      const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
      
      const calendarDays = computed(() => {
        const days = [];
        const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1).getDay();
        const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday as first day
        const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
        
        // Add empty cells for days before the 1st of the month
        for (let i = 0; i < firstDayIndex; i++) {
          days.push({ label: '', value: null });
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(currentYear.value, currentMonth.value, i);
          days.push({ 
            label: i, 
            value: date,
            isToday: isToday(date),
            isSelected: isSelectedDate(date),
            isInRange: isInDateRange(date)
          });
        }
        
        return days;
      });
      
      // Available durations for rental
      const availableDurations = ['day', 'week', 'month'];
      
      // Methods
      const formatDuration = (duration) => {
        const durations = {
          day: t('product.durations.day'),
          week: t('product.durations.week'),
          month: t('product.durations.month')
        };
        return durations[duration] || duration;
      };
      
      const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
      };
      
      const formatSpecName = (key) => {
        const specNames = {
          nominalPower: t('product.specs.nominalPower'),
          maxPower: t('product.specs.maxPower'),
          weight: t('product.specs.weight'),
          workTime: t('product.specs.workTime'),
          noiseLevel: t('product.specs.noiseLevel')
        };
        return specNames[key] || key;
      };
      
      const getRentalPrice = (duration) => {
        return product.value.rentalPrices[duration] || 0;
      };
      
      const increaseQuantity = () => {
        quantity.value++;
      };
      
      const decreaseQuantity = () => {
        if (quantity.value > 1) {
          quantity.value--;
        }
      };
      
      const toggleWishlist = () => {
        isInWishlist.value = !isInWishlist.value;
      };
      
      const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear();
      };
      
      const isSelectedDate = (date) => {
        if (!selectedStartDate.value && !selectedEndDate.value) return false;
        
        return (selectedStartDate.value && 
          date.getDate() === selectedStartDate.value.getDate() && 
          date.getMonth() === selectedStartDate.value.getMonth() && 
          date.getFullYear() === selectedStartDate.value.getFullYear()) ||
          (selectedEndDate.value && 
          date.getDate() === selectedEndDate.value.getDate() && 
          date.getMonth() === selectedEndDate.value.getMonth() && 
          date.getFullYear() === selectedEndDate.value.getFullYear());
      };
      
      const isInDateRange = (date) => {
        if (!selectedStartDate.value || !selectedEndDate.value) return false;
        
        return date > selectedStartDate.value && date < selectedEndDate.value;
      };
      
      const getCalendarDayClass = (day) => {
        if (!day.value) return 'calendar-day empty';
        
        let classes = 'calendar-day';
        if (day.isToday) classes += ' today';
        if (day.isSelected) classes += ' selected';
        if (day.isInRange) classes += ' in-range';
        
        return classes;
      };
      
      const selectDate = (date) => {
        if (!selectedStartDate.value || (selectedStartDate.value && selectedEndDate.value)) {
          selectedStartDate.value = dateselectedEndDate.value = null;
      } else {
        if (date > selectedStartDate.value) {
          selectedEndDate.value = date;
        } else {
          selectedEndDate.value = selectedStartDate.value;
          selectedStartDate.value = date;
        }
      }
    };
    
    const addToCart = () => {
      cartStore.addToCart({
        id: product.value.id,
        name: product.value.title,
        price: getRentalPrice(selectedDuration.value),
        image: product.value.images[0],
        quantity: quantity.value,
        rentalDuration: selectedDuration.value,
        startDate: selectedStartDate.value,
        endDate: selectedEndDate.value,
        color: selectedColor.value,
        isRental: true
      });
    };
    
    const rentNow = () => {
      addToCart();
      // Navigate to checkout
      // this.$router.push('/checkout');
    };
    
    const addRelatedToCart = (relatedProduct) => {
      cartStore.addToCart({
        id: relatedProduct.id,
        name: relatedProduct.title,
        price: relatedProduct.rentalPrices.day,
        image: relatedProduct.image,
        quantity: 1,
        rentalDuration: 'day',
        isRental: true
      });
    };
    
    return {
      product,
      relatedProducts,
      selectedImage,
      selectedDuration,
      quantity,
      selectedColor,
      isInWishlist,
      showCalendar,
      selectedStartDate,
      selectedEndDate,
      currentYear,
      currentMonth,
      currentMonthName,
      weekDays,
      calendarDays,
      availableDurations,
      formatDuration,
      formatDate,
      formatSpecName,
      getRentalPrice,
      increaseQuantity,
      decreaseQuantity,
      toggleWishlist,
      getCalendarDayClass,
      selectDate,
      addToCart,
      rentNow,
      addRelatedToCart
    };
  }
};
</script>

<style scoped>
/* Base Styles */
.rental-product-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #f5f5f5;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}

/* Product Layout */
.container:first-child {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Product Gallery Section */
.product-gallery-section {
  display: flex;
  gap: 15px;
  width: 50%;
}

.thumbnails-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail-image {
  width: 60px;
  height: 60px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-image.selected {
  border-color: #4CAF50;
}

.thumbnail-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.main-image {
  flex-grow: 1;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* Product Info Section */
.product-info-section {
  flex-grow: 1;
  width: 50%;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.3;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.wishlist-button, .share-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  padding: 5px 0;
}

.wishlist-button.active {
  color: #e04350;
}

.icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.heart-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'%3E%3C/path%3E%3C/svg%3E");
}

.share-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'%3E%3C/path%3E%3Cpolyline points='16 6 12 2 8 6'%3E%3C/polyline%3E%3Cline x1='12' y1='2' x2='12' y2='15'%3E%3C/line%3E%3C/svg%3E");
}

.calendar-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
}

.minus-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='8' y1='12' x2='16' y2='12'%3E%3C/line%3E%3C/svg%3E");
}

.plus-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='16'%3E%3C/line%3E%3Cline x1='8' y1='12' x2='16' y2='12'%3E%3C/line%3E%3C/svg%3E");
}

.price-section {
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;
}

.price-label {
  font-size: 16px;
  color: #666;
  margin-right: 8px;
}

.price-value {
  font-size: 32px;
  font-weight: bold;
  color: #000;
}

/* Rental Duration Selector */
.rental-duration-section {
  margin-bottom: 20px;
}

.rental-duration-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.duration-options {
  display: flex;
  gap: 10px;
}

.duration-option {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
}

.duration-option.selected {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

/* Rental Period Calendar */
.rental-period-section {
  margin-bottom: 20px;
}

.rental-period-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.date-picker {
  position: relative;
}

.date-display {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 15px;
}

.calendar-header {
  text-align: center;
  margin-bottom: 10px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
}

.calendar-day:hover {
  background-color: #f0f0f0;
}

.calendar-day.today {
  background-color: #e0e0e0;
}

.calendar-day.selected {
  background-color: #4CAF50;
  color: white;
}

.calendar-day.in-range {
  background-color: rgba(76, 175, 80, 0.2);
}

.calendar-day.empty {
  pointer-events: none;
}

.close-calendar {
  width: 100%;
  padding: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
}

/* Quantity Selector */
.quantity-section {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.quantity-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4CAF50;
  padding: 0;
}

.quantity-display {
  font-size: 18px;
  font-weight: bold;
}

/* Color Selector */
.color-section {
  margin-bottom: 30px;
}

.color-section h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.color-options {
  display: flex;
  gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-option.selected {
  border-color: #333;
}

/* Call-to-Action Buttons */
.cta-section {
  display: flex;
  gap: 15px;
}

.add-to-cart-button, .rent-now-button {
  flex: 1;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  border: none;
}

.add-to-cart-button {
  background-color: white;
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

.rent-now-button {
  background-color: #4CAF50;
  color: white;
}

/* Specifications Section */
.specifications-section {
  margin-bottom: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.specifications-section h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.spec-item .spec-name {
  color: #666;
}

.spec-item .spec-value {
  font-weight: bold;
}

/* Related Products Section */
.related-products-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 40px;
}

.related-products-section h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.related-product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
}

.related-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.related-product-card img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 10px;
}

.related-product-card h3 {
  font-size: 14px;
  margin-bottom: 5px;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.related-product-price {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.add-to-cart-mini {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Responsive styles */
@media (max-width: 992px) {
  .container:first-child {
    flex-direction: column;
  }
  
  .product-gallery-section,
  .product-info-section {
    width: 100%;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-section {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .product-gallery-section {
    flex-direction: column-reverse;
  }
  
  .thumbnails-column {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .main-image {
    height: 300px;
  }
  
  .related-products-grid {
    grid-template-columns: 1fr;
  }
  
  .duration-options {
    flex-wrap: wrap;
  }
}
</style>