<template>
  <div class="home-view">

    <!-- Residential & Commercial Solar System Section -->
    <div class="page-container">
      <section class="product-segment">
        <div class="section-header">
          <h2>Житлова та комерційна сонячна система</h2>
        </div>
        <div class="product-segment-grid">
          <router-link
            v-for="item in solarSystemItems"
            :key="item.id"
            :to="getCategoryRoute(item.slug)"
            class="product-segment-card promo-box"
          >
            <img :src="item.image" :alt="item.name" />
            <h3>{{ item.name }}</h3>
          </router-link>
        </div>
      </section>
    </div><!-- Close .page-container #1 -->

    <!-- EV Chargers & Components Section -->
    <div class="page-container">
      <section class="product-segment">
        <div class="section-header">
          <h2>Зарядні пристрої та компоненти для електромобілів</h2>
        </div>
        <div class="product-segment-grid">
          <router-link
            v-for="item in evChargerItems"
            :key="item.id"
            :to="getCategoryRoute(item.slug)"
            class="product-segment-card promo-box"
          >
            <img :src="item.image" :alt="item.name" />
            <h3>{{ item.name }}</h3>
          </router-link>
        </div>
      </section>
    </div><!-- Close .page-container #2 -->

    <!-- Carousel Section -->
    <div class="page-container">
      <section class="carousel-section">
        <Swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          navigation
          pagination
          class="carousel-container"
        >
          <SwiperSlide v-for="(slide, index) in carouselSlides" :key="index">
            <img :src="slide.image.toString()" :alt="slide.title" />
            <div class="slide-content">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </div><!-- Close .page-container #3 -->

    <!-- Explore New Category Section -->
    <div class="page-container">
      <section class="new-category-section">
        <div class="section-header">
          <h2>Досліджуйте нові категорії</h2>
        </div>
        <div class="new-category-grid">
          <router-link
            v-for="newCategory in newCategories"
            :key="newCategory.id"
            :to="getCategoryRoute(newCategory.slug)"
            class="new-category-card promo-box"
          >
            <img :src="newCategory.image" :alt="newCategory.name" />
            <h3>{{ newCategory.name }}</h3>
          </router-link>
        </div>
      </section>
    </div><!-- Close .page-container #4 -->

    <!-- Category Section -->
    <div class="page-container">
      <section class="category-section">
        <div class="section-header">
          <h2>Досліджуйте категорії</h2>
          <router-link to="/categories" class="see-all-button"
            >See All</router-link
          >
        </div>
        <div class="categories-grid">
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="getCategoryRoute(category.slug)"
            class="category-card promo-box"
          >
            <img :src="category.image" :alt="category.name" />
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </section>
    </div><!-- Close .page-container #5 -->

  </div>
</template>


<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import AdBox from '@/components/AdBox.vue'
import CategoryPromotionBox from '@/components/CategoryPromotionBox.vue'
import adService from '@/services/adService'
import productService from '@/services/productService'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
    AdBox,
    CategoryPromotionBox,
  },
  data() {
    return {
      Navigation,
      Pagination,
      Autoplay,
      // Define the arrays here
      solarSystemItems: [
        {
          id: 1,
          name: 'Сонячні Панелі',
          slug: 'solar-panels',
          image: '/images/HomeView/solar-farm.png',
        },
        {
          id: 2,
          name: 'Батареї',
          slug: 'batteries',
          image: '/images/HomeView/solar-battery.png',
        },
        {
          id: 3,
          name: 'Інвертори',
          slug: 'inverters',
          image: '/images/HomeView/інвертер.png',
        },
        {
          id: 4,
          name: 'Блок управління',
          slug: 'voltage-controllers',
          image: '/images/HomeView/блок-управління.png',
        },

        {
          id: 5,
          name: 'Комплекти сонячних електростанцій',
          slug: 'Sets-of-solar-power-plants',
          image: '/images/HomeView/комплект-сонячних.png',
        },
        {
          id: 6,
          name: 'Системи кріплення',
          slug: 'mounting-systems',
          image: '/images/HomeView/solar-mount-system.png',
        },
      ],
      evChargerItems: [
        {
          id: 1,
          name: 'Зарядні пристрої для електромобілів',
          slug: 'ev-chargers',
          image: '/images/HomeView/otcta-стійка-02.png',
        },
        {
          id: 2,
          name: 'Кабелі та адаптери',
          slug: 'cables-adapters',
          image: '/images/HomeView/electric-charging-adapters.png',
        },
        {
          id: 3,
          name: 'Зарядні станції',
          slug: 'charging-stations',
          image: '/images/HomeView/ev-charger-city.png',
        },
      ],
      ads: [],
      promotionCategories: [],
      carouselSlides: [
        {
          image: '/images/1.jpg',
          title: 'Slide 1',
          description: 'Description for Slide 1',
        },
        {
          image: '/images/2.jpg',
          title: 'Slide 2',
          description: 'Description for Slide 2',
        },
        {
          image: '/images/3.jpg',
          title: 'Slide 3',
          description: 'Description for Slide 3',
        },
      ],
      newCategories: [
        {
          id: 1,
          name: 'Сонячні Панелі',
          slug: 'solar-panels',
          image: '/images/HomeView/solar-panel.png',
        },
        {
          id: 2,
          name: 'Зарядки',
          slug: 'charging',
          image: '/images/HomeView/Charging-station-ND-EVC-UR40.jpg',
        },
        {
          id: 3,
          name: 'Батареї',
          slug: 'batteries',
          image: '/images/HomeView/літіюм-батареї.png',
        },
        {
          id: 4,
          name: 'Кабелі електричні та дроти',
          slug: 'cables-wires',
          image: '/images/HomeView/Electrical-cables-and-wires.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          name: 'Автоматичні вимикачі',
          slug: 'automatics',
          image: '/images/HomeView/Circuit-breakers.jpg',
        },
        {
          id: 2,
          name: 'Кабель',
          slug: 'cable',
          image: '/images/HomeView/Electrical-cables-and-wires.jpg',     
        },
      ],
      products: [],
      loading: true,
    }
  },
  methods: {
    getCategoryRoute(slug) {
      return `/${slug}`
    },
    async fetchAds() {
      try {
        const response = await adService.getAds({ populate: '*' })
        this.ads = response.data.data.map(ad => ({
          id: ad.id,
          title: ad.attributes?.title || 'No title',
          description: ad.attributes?.description || '',
          image:
            ad.attributes?.image?.data?.attributes?.url ||
            '/images/default-ad.jpg',
        }))
      } catch (error) {
        console.error('Error fetching ads:', error)
      }
    },
    async fetchPromotionCategories() {
      this.promotionCategories = [
        { id: 1, name: 'Сонячні Панелі' },
        { id: 2, name: 'Зарядні станції' },
        { id: 3, name: 'Батареї' },
        { id: 4, name: 'Кабеля' },
      ]
    },
    async fetchProducts() {
      try {
        const response = await productService.getProducts({
          populate: ['general_information.images', 'pricing_and_inventory'],
        })
        this.products = response.data.data
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchCarouselSlides() {
      try {
        const response = await axios.get('/api/carousel-slides')
        this.carouselSlides = response.data
      } catch (error) {
        console.error('Error fetching carousel slides:', error)
      }
    },
  },
  mounted() {
    this.fetchAds()
    this.fetchPromotionCategories()
    this.fetchProducts()
    this.fetchCarouselSlides()
  },
}

import Intercom from '@intercom/messenger-js-sdk'

Intercom({
  app_id: 'mm6ivt97',
})
</script>

<style scoped>
.home-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  margin: 0;
  padding: 0;
  padding-top: 150px; /* Adjust according to actual header height */
}

/* Modify the .page-container to center content properly */
.page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px; /* Horizontal padding to prevent cut-off */
  box-sizing: border-box; /* Include padding in the width */
}

/* Top Grid Section */
.top-grid-section {
  padding: 20px;
  background-color: #f0f4f8; /* Light gray background */
}

/* Ensure the grid container doesn't overflow */
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 0; /* Ensure no extra margins */
  padding: 5 5px; /* Add a small padding to prevent edge overflow */
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

/* Carousel Styles */
.carousel-section {
  position: relative;
  width: 100%;
  height: 400px; /* Adjust as needed */
  margin-bottom: 40px;
}

.carousel-container {
  width: 100%;
  height: 100%;
}

.carousel-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5); /* Optional: background for readability */
  padding: 20px;
  border-radius: 10px;
}

.slide-content h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.slide-content p {
  font-size: 18px;
}

/* Swiper Navigation Buttons */
.swiper-button-next,
.swiper-button-prev {
  color: #fff;
}

/* Swiper Pagination Bullets */
.swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.7);
}

.swiper-pagination-bullet-active {
  background: #fff;
}

/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.section-header h2 {
  color: #333;
  font-size: 17px;
}

.new-category-section,
.category-section {
  padding: 40px 0px;
}

/* New Category Grid */
.new-category-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Added to handle overflow */
}

.new-category-card,
.category-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 200px; /* Responsive sizing */
}

/* The rules below set object-fit to contain for .new-category-card/.category-card images. */
.new-category-card img,
.category-card img {
  display: block;        
  width: 100%;
  max-height: 150px;     
  object-fit: contain;   
  margin: 0 auto;        
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.new-category-card h3,
.category-card h3 {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}

.new-category-card:hover,
.category-card:hover,
.promo-box:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.category-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
}

/* The universal card style */
.promo-box {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-decoration: none; /* If using router-link as a box */
  color: inherit; /* Inherit text color for the link */
}

/* The universal image style (assuming each card has an <img>) */
.promo-box img {
  width: 100%;
  height: 150px;
  object-fit: cover; /* By default, promo-box uses cover. */
  border-bottom: 1px solid #e0e0e0;
}

/* The universal heading style */
.promo-box h3 {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.new-category-grid {
  /* flex-wrap or grid */
}

/* Ensure router-link styled as cards are block elements */
.new-category-card,
.category-card {
  display: block; /* Ensure the entire card is clickable */
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Inherit text color */
}

/* "See All" Button Styles */
.see-all-button {
  background-color: #ff4f5a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.see-all-button:hover {
  background-color: #e04350;
}

.product-segment-grid,
.new-category-grid,
.categories-grid {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  overflow-x: unset;
  padding: 10px 0;
}

/* Unified single rule for .product-segment-card */
.product-segment-card {
  flex: 0 0 auto;
  width: 200px;    /* remove the 150px block */
  min-height: 280px;
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.product-segment-card img {
  width: 100%;
  height: 150px; 
  object-fit: cover;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.product-segment-card h3 {
  font-size: 16px;
  color: #333;
  margin: 0;
  padding: 0;
}

.product-segment-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* OVERRIDE for new-category-card & category-card images if they also have .promo-box class */
/* Ensures they are contain, not cover, so they won't be cropped. */
.new-category-card.promo-box img,
.category-card.promo-box img {
  object-fit: contain !important;
  height: auto !important;
  max-height: 150px !important;
}
</style>
