<template>
  <div class="product-page-container">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <router-link to="/">{{ $t('common.home') }}</router-link>
      <span class="breadcrumb-separator">&gt;</span>
      <router-link :to="getTypeRoute(product?.type)">
        {{ product?.type || $t('common.categories') }}
      </router-link>
      <span class="breadcrumb-separator">&gt;</span>
      <span class="current-page">{{ product?.title || $t('product.section_title') }}</span>
    </nav>

    <div v-if="product" class="product-content">
      <!-- Left side - Gallery -->
      <div class="product-gallery">
        <!-- Thumbnail Gallery -->
        <div class="thumbnail-list">
          <div 
            v-for="(img, index) in productImages" 
            :key="index"
            class="thumbnail"
            :class="{ 'active': selectedImage === img }"
            @click="selectedImage = img"
          >
            <img :src="img" :alt="`Product Thumbnail ${index + 1}`" />
          </div>
        </div>

        <!-- Main Product Image -->
        <div class="main-image-container">
          <img 
            :src="selectedImage || productImages[0] || '/images/placeholder.png'" 
            :alt="product.title || product.name" 
            class="main-image"
          />
        </div>
      </div>

      <!-- Right side - Product Info -->
      <div class="product-info-container">
        <div class="product-info-sticky">
          <div class="product-info-scrollable">
            <!-- Product Details -->
            <div class="product-details">
              <h1 class="product-title">{{ product.title || product.name }}</h1>

              <!-- Rating and Reviews -->
              <div class="product-rating">
                <div class="rating-stars">
                  <span class="star">★</span>
                  <span class="rating-value">4.7</span>
                </div>
                <span class="review-count">(157 {{ $t('product.reviews') }})</span>
              </div>

              <!-- Pricing -->
              <div class="pricing-section">
                <div class="current-price">
                  <span class="price">{{ formatPrice(product.price) }} ₴</span>
                  <span v-if="product.originalPrice && product.originalPrice > product.price" class="discount-tag">
                    {{ calculateDiscount(product.price, product.originalPrice) }}% {{ $t('product.off') }}
                  </span>
                </div>
                <div v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
                  <span>MRP {{ formatPrice(product.originalPrice) }} ₴</span>
                  <span class="tax-info">({{ $t('product.taxInfo') }})</span>
                </div>
              </div>

              <!-- Delivery Info -->
              <div class="delivery-info">
                <span class="delivery-icon">⚡</span>
                <span>{{ $t('delivery.fastDelivery') }}</span>
              </div>

              <!-- Offers Section -->
              <div v-if="product.offers && product.offers.length > 0" class="offers-section">
                <h3>{{ $t('product.availableOffers') }}</h3>
                <div class="offer-list">
                  <div v-for="offer in product.offers.slice(0, 2)" :key="offer.id" class="offer-item">
                    <img :src="getOfferIcon(offer.bank)" alt="Bank Icon" class="offer-icon" />
                    <div>
                      <strong>{{ offer.bank }}</strong>
                      <p>{{ offer.detail }}</p>
                    </div>
                  </div>
                </div>
                <a href="#" v-if="product.offers.length > 2" class="view-all-offers">{{ $t('delivery.seeAll') }}</a>
              </div>

              <!-- Product Specifications -->
              <div class="product-specs">
                <h3>{{ $t('product.specifications') }}</h3>
                <table class="specs-table">
                  <tr v-if="product.brand">
                    <th>{{ $t('product.brand') }}</th>
                    <td>{{ product.brand }}</td>
                  </tr>
                  <tr v-if="product.model">
                    <th>{{ $t('product.model') }}</th>
                    <td>{{ product.model }}</td>
                  </tr>
                  <tr v-if="product.quantity">
                    <th>{{ $t('product.quantity') }}</th>
                    <td>{{ product.quantity }}</td>
                  </tr>
                  <!-- Add more specifications as needed -->
                </table>
              </div>

              <!-- Installation Option -->
              <div v-if="product.installationAvailable" class="installation-section">
                <div class="installation-toggle">
                  <label class="toggle-label">
                    <input type="checkbox" v-model="addInstallation" />
                    {{ $t('product.addInstallation') }}
                  </label>
                </div>
                
                <div v-if="addInstallation" class="installation-options">
                  <div class="form-group">
                    <label for="company">{{ $t('product.companyName') }}</label>
                    <input 
                      type="text" 
                      id="company" 
                      v-model="installationDetails.companyName" 
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="address">{{ $t('product.installationAddress') }} <span class="required-indicator">*</span></label>
                    <input 
                      type="text" 
                      id="address" 
                      v-model="installationDetails.address" 
                      placeholder="Enter installation address"
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="notes">{{ $t('product.additionalNotes') }}</label>
                    <textarea 
                      id="notes" 
                      v-model="installationDetails.notes" 
                      placeholder="Any special instructions?"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Quantity and Cart Control -->
              <div class="cart-control">
                <div class="quantity-selector">
                  <button 
                    class="quantity-btn" 
                    @click="decrementQuantity"
                    :disabled="quantity <= 1"
                  >-</button>
                  <span class="quantity-value">{{ quantity }}</span>
                  <button 
                    class="quantity-btn" 
                    @click="incrementQuantity"
                  >+</button>
                </div>
                <button 
                  class="add-to-cart-btn" 
                  @click="addToCart"
                >
                  {{ $t('product.addToCart') }}
                </button>
              </div>

              <!-- Extra Product Details -->
              <div class="extra-details">
                <div class="detail-icon">
                  <img src="/images/ProductPage/return-icon.png" alt="7 Days Exchange" />
                  <span>{{ $t('product.daysExchange', { days: 7 }) }}</span>
                </div>
                <div class="detail-icon">
                  <img src="/images/ProductPage/delivery-icon.png" alt="Fast Delivery" />
                  <span>{{ $t('product.fastDelivery') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="product && (product.type === 'Сонячні Панелі' || product.type === 'Швидкі Зарядні Станції (DC)')">
      <ProductQuoteForm 
        :productType="product.type === 'Сонячні Панелі' ? 'solar' : 'charger'" 
        :productId="product.id" 
        :productName="product.title || product.name"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import ProductQuoteForm from '@/components/ProductQuoteForm.vue';

// Define mockProducts array outside of setup
const mockProducts = [
  {
    id: 1,
    title: 'Portronics 1.5M Cord Length HDMI Cable(Black)',
    price: 199,
    originalPrice: 499,
    quantity: '1 piece',
    brand: 'Portronics',
    model: 'HDMI-1.5M',
    type: 'Cables, Chargers & Powerbanks',
    images: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/5.jpg'
    ],
    offers: [
      { 
        id: 1, 
        bank: 'CRED', 
        detail: 'Get assured rewards',
        icon: '/images/cred-icon.png'
      },
      { 
        id: 2, 
        bank: 'BHIM UPI', 
        detail: 'Get flat ₹25 discount'
      },
      { 
        id: 3, 
        bank: 'Amazon Pay', 
        detail: 'Get up to ₹25 cashback'
      }
    ], 
    installationAvailable: true  // Add this flag
  },
  {
    id: 2,
    title: 'Сонячна Панель Longi-420-Black',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-420-Black',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-420-Black.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 3,
    title: 'Сонячна Панель Longi-425-Black',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-425-Black',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-425-Black.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 4,
    title: 'Сонячна Панель Longi-530-Black',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-530-Black',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-530-Black.png'
    ],
    offers: [], 
    installationAvailable: true  // Add this flag
  },
  {
    id: 5,
    title: 'Сонячна Панель Longi-630-Bifacial',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-630-Bifacial',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-630-Bifacial.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 6,
    title: 'Сонячна Панель Longi-430',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-430',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-430.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 7,
    title: 'Сонячна Панель Longi-580',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-580',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-580.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 8,
    title: 'Сонячна Панель Longi-585',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-585',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-585.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 9,
    title: 'Сонячна Панель Longi-440',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-440',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-440.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 10,
    title: 'Сонячна Панель Longi-455',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Longi',
    model: 'Longi-455',
    type: 'Сонячні Панелі',
    images: [
      '/images/Categories/solar.panels/Longi-455.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  }, 
  {
    id: 11,
    name: 'АКБ Deye RW-M6.1-B-1',
    price: 1000,
    image: '/images/Categories/batteries/АКБ.Deye.RW-M6.1-B-1.jpg',
    brand: 'Deye',
    categoryId: 2,
  },
  {
    id: 12,
    name: 'RW-M5.3-Pro_1',
    price: 1200,
    image: '/images/Categories/batteries/RW-M5.3-Pro_1-2.jpg',
    brand: 'Deye',
    categoryId: 2,
  },
  {
    id: 13,
    name: 'Deye-RW-F10.6-51.2V-208AH-10.64KWH-1',
    price: 1000,
    image: '/images/Categories/batteries/Deye-RW-F10.6-51.2V-208AH-10.64KWH-1.jpg',
    brand: 'Deyes',
    categoryId: 2,
  },
  {
    id: 14,
    name: 'АКБ-Pylontech-US5000',
    price: 1200,
    image: '/images/Categories/batteries/АКБ-Pylontech-US5000-1.jpg',
    brand: 'Pylontech',
    categoryId: 2,
  },
  {
    id: 15,
    name: 'Сонячна Панель JA Solar 560kW',
    price: 1000,
    image: '/images/5.jpg',
    brand: 'JA Solar',
    categoryId: 2,
  },
  {
    id: 16,
    name: 'Сонячна Панель Jinko Tiger 560kW',
    price: 1200,
    image: '/images/6.jpg',
    brand: 'Jinko Tiger',
    categoryId: 2,
  },
  {
    id: 17,
    name: 'Сонячна Панель JA Solar 560kW',
    price: 1000,
    image: '/images/7.jpg',
    brand: 'JA Solar',
    categoryId: 2,
  },
  {
    id: 18,
    name: 'Сонячна Панель Jinko Tiger 560kW',
    price: 1200,
    image: '/images/8.jpg',
    brand: 'Jinko Tiger',
    categoryId: 2,
  },
  {
    id: 19,
    name: 'Сонячна Панель JA Solar 560kW',
    price: 1000,
    image: '/images/9.jpg',
    brand: 'JA Solar',
    categoryId: 2,
  },
  {
    id: 20,
    name: 'Сонячна Панель Jinko Tiger 560kW',
    price: 1200,
    image: '/images/Categories/batteries/АКБ.Deye.RW-M6.1-B-1.jpg',
    brand: 'Jinko Tiger',
    categoryId: 2,
  },
  {
    id: 21,
    title: 'PowerBank 10000mAh Ultra Slim',
    price: 599,
    originalPrice: 999,
    quantity: '1 piece',
    brand: 'PowerTech',
    model: 'PB-10000',
    type: 'Батареї',
    image:[
      '/images/Categories/batteries/АКБ.Deye.RW-M6.1-B-1.jpg',
    ],
    offers: []
  },
  {
    id: 22,
    title: 'PowerBank 20000mAh Solar Charging',
    price: 899,
    originalPrice: 1299,
    quantity: '1 piece',
    brand: 'SolarCharge',
    model: 'SC-20000',
    type: 'Батареї',
    images: [
      '/images/batteries/powerbank2.jpg'
    ],
    offers: []
  },
  {
    id: 23,
    title: 'Lithium Ion Battery Pack 48V',
    price: 2499,
    originalPrice: 3999,
    quantity: '1 piece',
    brand: 'EnergyCell',
    model: 'EC-48V',
    type: 'Батареї',
    images: [
      '/images/batteries/battery-pack1.jpg'
    ],
    offers: []
  },
  {
    id: 24,
    title: 'Home Battery Storage 5kWh',
    price: 4999,
    originalPrice: 6499,
    quantity: '1 piece',
    brand: 'HomeEnergy',
    model: 'HE-5000',
    type: 'Батареї',
    images: [
      '/images/batteries/home-battery1.jpg'
    ],
    offers: []
  },
  {
    id: 25,
    title: 'Portable Generator Battery 1000W',
    price: 1799,
    originalPrice: 2499,
    quantity: '1 piece',
    brand: 'PortaPower',
    model: 'PP-1000',
    type: 'Батареї',
    images: [
      '/images/batteries/generator1.jpg'
    ],
    offers: []
  }, 
  // Add these inverter products to your mockProducts array in ProductPage.vue
  {
    id: 30,
    title: 'Deye Hybrid 5kw 1ph',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 5kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-5kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 31,
    title: 'Deye Hybrid 6kw 1ph',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 6kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-6kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 32,
    title: 'Deye Hybrid 8kw 1ph',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 8kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-8kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 33,
    title: 'Deye Hybrid 10kw 1ph',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 10kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-10kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 34,
    title: 'Deye Hybrid 10kw 3ph',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 10kw 3ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-10kw-3ph-48V.png'
    ],
    offers: []
  },
  {
    id: 35,
    title: 'Deye Hybrid 12kw 1ph',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 12kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-12kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 36,
    title: 'Deye Hybrid 12kw 3ph',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 12kw 3ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-12kw-3ph-48V.png'
    ],
    offers: []
  },
  {
    id: 37,
    title: 'Deye Hybrid 15kw 3ph',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 15kw 3ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-15kw-3ph-48V.png'
    ],
    offers: []
  },
  {
    id: 38,
    title: 'Deye Hybrid 16kw 1ph',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 16kw 1ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-16kw-1ph-48V.png'
    ],
    offers: []
  },
  {
    id: 39,
    title: 'Deye Hybrid 16kw 3ph',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 piece',
    brand: 'Deye',
    model: 'Hybrid 16kw 3ph 48V',
    type: 'Інвертори',
    images: [
      '/images/deye-hybrid-16kw-3ph-48V.png'
    ],
    offers: []
    
    // Add these solar sets products to your mockProducts array in ProductPage.vue
  },
  {
    id: 40,
    title: 'Гибридная солнечная электростанция на 30кВ з АКБ 60кВ',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Hybrid 30kW Set',
    type: 'SolarSets',
    images: [
      '/images/solar.set.hybrid.30kw.with.АКБ-60кВ.png'
    ],
    offers: []
  },
  {
    id: 41,
    title: 'Сонячна Панель Longi-420-Black',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-420-Black',
    type: 'SolarSets',
    images: [
      '/images/Longi-420-Black.png'
    ],
    offers: []
  },
  {
    id: 42,
    title: 'Сонячна Панель Longi-425-Black',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-425-Black',
    type: 'SolarSets',
    images: [
      '/images/Longi-425-Black.png'
    ],
    offers: []
  },
  {
    id: 43,
    title: 'Сонячна Панель Longi-530-Black',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-530-Black',
    type: 'SolarSets',
    images: [
      '/images/Longi-530-Black.png'
    ],
    offers: []
  },
  {
    id: 44,
    title: 'Сонячна Панель Longi-630-Bifacial',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-630-Bifacial',
    type: 'SolarSets',
    images: [
      '/images/Longi-630-Bifacial.png'
    ],
    offers: []
  },
  {
    id: 45,
    title: 'Сонячна Панель Longi-430',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-430',
    type: 'SolarSets',
    images: [
      '/images/Longi-430.png'
    ],
    offers: []
  },
  {
    id: 46,
    title: 'Сонячна Панель Longi-580',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-580',
    type: 'SolarSets',
    images: [
      '/images/Longi-580.png'
    ],
    offers: []
  },
  {
    id: 47,
    title: 'Сонячна Панель Longi-585',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-585',
    type: 'SolarSets',
    images: [
      '/images/Longi-585.png'
    ],
    offers: []
  },
  {
    id: 48,
    title: 'Сонячна Панель Longi-440',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'Longi-440',
    model: 'Longi-440',
    type: 'SolarSets',
    images: [
      '/images/Longi-440.png'
    ],
    offers: []
  },
  {
    id: 49,
    title: 'Сонячна Панель Longi-455',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'Longi',
    model: 'Longi-455',
    type: 'SolarSets',
    images: [
      '/images/Longi-455.png'
    ],
    offers: []
  },
  // Add these solar mount system products to your mockProducts array in ProductPage.vue
  {
    id: 50,
    title: 'Система монтажу на скатну покрівлю 10кВт',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'MountingSystems',
    model: 'Roof-Mount-10kW',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/roof-mount-system-10kw.png'
    ],
    offers: []
  },
  {
    id: 51,
    title: 'Система монтажу на пласку покрівлю 15кВт',
    price: 1200,
    originalPrice: 1500,
    quantity: '1 комплект',
    brand: 'MountingSystems',
    model: 'Flat-Roof-15kW',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/flat-roof-mount-15kw.png'
    ],
    offers: []
  },
  {
    id: 52,
    title: 'Система монтажу на землю 30кВт',
    price: 1000,
    originalPrice: 1300,
    quantity: '1 комплект',
    brand: 'MountingSystems',
    model: 'Ground-Mount-30kW',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/ground-mount-system-30kw.png'
    ],
    offers: []
  },
  {
    id: 53,
    title: 'Кріплення на металочерепицю',
    price: 1200,
    originalPrice: 1500,
    quantity: '100 шт',
    brand: 'MountingSystems',
    model: 'Metal-Tile-Hook',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/metal-tile-hooks.png'
    ],
    offers: []
  },
  {
    id: 54,
    title: 'Кріплення на бітумну черепицю',
    price: 1000,
    originalPrice: 1300,
    quantity: '100 шт',
    brand: 'MountingSystems',
    model: 'Bitumen-Tile-Hook',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/bitumen-tile-hooks.png'
    ],
    offers: []
  },
  {
    id: 55,
    title: 'Алюмінієвий профіль 4м',
    price: 1200,
    originalPrice: 1500,
    quantity: '10 шт',
    brand: 'MountingSystems',
    model: 'Aluminum-Rail-4m',
    type: 'Система монтажу сонячних панелей',
    images: [
      '/images/aluminum-rail-4m.png'
    ],
    offers: []
  },
  {
    id: 60,
    title: 'Швидкі Зарядні Станції (DC)',
    price: 1200,
    originalPrice: 1500,
    quantity: '100 шт',
    brand: 'MountingSystems',
    model: 'Metal-Tile-Hook',
    type: 'Швидкі Зарядні Станції (DC)',
    images: [
      '/images/metal-tile-hooks.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 61,
    title: 'Швидкі Зарядні Станції (DC)',
    price: 1000,
    originalPrice: 1300,
    quantity: '100 шт',
    brand: 'MountingSystems',
    model: 'Bitumen-Tile-Hook',
    type: 'Швидкі Зарядні Станції (DC)',
    images: [
      '/images/bitumen-tile-hooks.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
  {
    id: 63,
    title: 'Швидкі Зарядні Станції (DC)',
    price: 1000,
    originalPrice: 1300,
    quantity: '100 шт',
    brand: 'MountingSystems',
    model: 'Bitumen-Tile-Hook',
    type: 'Швидкі Зарядні Станції (DC)',
    images: [
      '/images/bitumen-tile-hooks.png'
    ],
    offers: [],
    installationAvailable: true  // Add this flag
  },
];

export default {
  name: 'ProductPage',
  components: {
    ProductQuoteForm
  },
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();

    // Product State
    const product = ref(null);
    const selectedImage = ref(null);
    const quantity = ref(1);
    
    // Add these new reactive properties
    const addInstallation = ref(false);
    const installationDetails = ref({
      companyName: '',
      address: '',
      notes: ''
    });

    // Compute product images safely
    const productImages = computed(() => {
      if (!product.value) return [];
      if (product.value.images) return product.value.images;
      if (product.value.image) {
        return Array.isArray(product.value.image) ? product.value.image : [product.value.image];
      }
      return ['/images/placeholder.png'];
    });

    // Fetch product on component mount
    onMounted(async () => {
      try {
        const productId = route.params.id;
        // Simulate API call or use mock data
        const foundProduct = mockProducts.find(p => p.id.toString() === productId);
        
        if (foundProduct) {
          product.value = foundProduct;
          
          // Set selected image safely
          if (foundProduct.images && foundProduct.images.length > 0) {
            selectedImage.value = foundProduct.images[0];
          } else if (foundProduct.image) {
            selectedImage.value = Array.isArray(foundProduct.image) 
              ? foundProduct.image[0] 
              : foundProduct.image;
          } else {
            selectedImage.value = '/images/placeholder.png';
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    });

     // Methods
     const formatPrice = (price) => {
      return price ? price.toLocaleString('en-IN') : 'N/A';
    };

    const calculateDiscount = (currentPrice, originalPrice) => {
      if (!currentPrice || !originalPrice) return 0;
      const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
      return discount;
    };

    const getOfferIcon = (bank) => {
      // Map bank names to icons (you'd replace with actual icon paths)
      const iconMap = {
        'CRED': '/images/cred-icon.png',
        'BHIM UPI': '/images/bhim-icon.png',
        'Amazon Pay': '/images/amazon-pay-icon.png'
      };
      return iconMap[bank] || '/images/default-bank-icon.png';
    };

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const addToCart = () => {
      if (product.value) {
        const cartItem = {
          id: product.value.id,
          title: product.value.title || product.value.name,
          price: product.value.price,
          image: productImages.value[0] || '/images/placeholder.png',
          quantity: quantity.value,
          installation: addInstallation.value ? installationDetails.value : null
        };  
        
        cartStore.addToCart(cartItem);
        
        alert(`Added ${quantity.value} ${product.value.title || product.value.name} to cart${addInstallation.value ? ' with installation' : ''}`);
      }
    };

    // Add the getTypeRoute function here
    const getTypeRoute = (type) => {
      const typeToRoute = {
        'Сонячні Панелі': '/solar-panels',
        'Батареї': '/batteries',
        'Cables, Chargers & Powerbanks': '/cables',
        'Інвертори': '/inverters',
        'SolarSets': '/solar-sets',
        'Система монтажу сонячних панелей': '/mounting-systems', // Changed to match your URL
        'Швидкі Зарядні Станції (DC)': '/dc-charging-stations',
        'Зарядні Станції Рівня 2 (AC)': '/ac-charging-stations',
        'Портативні/Мобільні Зарядні Пристрої': '/portable-charging-devices'
      };
      return typeToRoute[type] || '/catalogue';
    };

    return {
      product,
      selectedImage,
      quantity,
      formatPrice,
      calculateDiscount,
      getOfferIcon,
      incrementQuantity,
      decrementQuantity,
      addToCart,
      getTypeRoute,
      addInstallation,
      installationDetails,
      productImages
    };
  }
};
</script>

<style scoped>
.product-page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 130px; /* Add padding to account for the fixed header height */
}

/* Breadcrumb Navigation */
.breadcrumb {
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #0066cc;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #999;
}

/* Product Content Layout */
.product-content {
  display: flex;
  gap: 30px;
}

/* Gallery Section */
.product-gallery {
  width: 55%;
  display: flex;
  gap: 15px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 4px;
}

.thumbnail.active {
  border-color: #0066cc;
}

.thumbnail img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.main-image-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.main-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

/* Product Info Section */
.product-info-container {
  width: 45%;
  position: relative;
}

.product-info-sticky {
  position: sticky;
  top: 150px; /* Adjust based on your header height */
  max-height: calc(100vh - 170px); /* Adjust based on your header height */
}

.product-info-scrollable {
  max-height: calc(100vh - 170px);
  overflow-y: auto;
  padding-right: 10px;
}

.product-details {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.product-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

/* Rating Section */
.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rating-stars {
  display: flex;
  align-items: center;
  color: #ffc107;
}

.star {
  font-size: 20px;
}

.rating-value {
  margin-left: 5px;
  font-weight: 500;
}

.review-count {
  color: #666;
  font-size: 14px;
}

/* Pricing Section */
.pricing-section {
  margin-bottom: 20px;
}

.current-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.discount-tag {
  background-color: #e53935;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.original-price {
  color: #666;
  font-size: 14px;
  margin-top: 5px;
}

.tax-info {
  font-size: 12px;
  color: #888;
}

/* Delivery Info */
.delivery-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4caf50;
  margin-bottom: 20px;
  font-weight: 500;
}

.delivery-icon {
  font-size: 20px;
}

/* Offers Section */
.offers-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.offers-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.offer-list {
  margin-bottom: 10px;
}

.offer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.offer-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.offer-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.view-all-offers {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  display: block;
  text-align: right;
}

/* Product Specifications */
.product-specs {
  margin-bottom: 20px;
}

.product-specs h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table th, 
.specs-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.specs-table th {
  width: 40%;
  color: #666;
  font-weight: 500;
}

/* Installation Section */
.installation-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.installation-toggle {
  display: flex;
  align-items: center;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
}

.installation-options {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.required-indicator {
  color: #e53935;
}

/* Quantity and Cart Control */
.cart-control {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  background: #f5f5f5;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:disabled {
  color: #aaa;
  cursor: not-allowed;
}

.quantity-value {
  padding: 0 15px;
  min-width: 40px;
  text-align: center;
  font-weight: 500;
}

.add-to-cart-btn {
  flex: 1;
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  transition: background-color 0.2s;
}

.add-to-cart-btn:hover {
  background-color: #0052a3;
}

/* Extra Product Details */
.extra-details {
  display: flex;
  gap: 20px;
}

.detail-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #666;
}

.detail-icon img {
  width: 24px;
  height: 24px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .product-content {
    flex-direction: column;
  }

  .product-gallery,
  .product-info-container {
    width: 100%;
  }

  .product-info-sticky {
    position: static;
    max-height: none;
  }

  .product-info-scrollable {
    max-height: none;
    overflow: visible;
  }
}

@media (max-width: 768px) {
  .product-page-container {
    padding: 120px 15px 20px;
  }

  .product-gallery {
    flex-direction: column-reverse;
  }

  .thumbnail-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .cart-control {
    flex-direction: column;
  }

  .add-to-cart-btn {
    height: 44px;
  }
}
</style>