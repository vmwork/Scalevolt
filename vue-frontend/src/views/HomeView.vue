<template>
  <div class="home-view">
    <div class="hero-section" ref="heroSection">
      <!-- Gradient Background Container -->
      <div class="hero-background" ref="heroBackground">
        <div class="gradient-overlay"></div>
        <div class="animated-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>

      <!-- Hero Content Container -->
      <div class="hero-container">
        <div class="hero-content">
          <!-- Left Content - Copy -->
          <div class="hero-copy">
            <h1 class="hero-headline">
              <span class="headline-primary">{{ $t('hero.cleanEnergy', 'Чиста Енергія') }}</span>
              <span class="headline-secondary">{{ $t('hero.forTheFuture', 'для Майбутнього') }}</span>
            </h1>
            <p class="hero-description">
              {{ $t('hero.longDescription', 'Інноваційні енергетичні рішення для дому та бізнесу. Зменшіть рахунки за електроенергію, захистіть себе від відключень і зробіть свій внесок у збереження планети.') }}
            </p>
            
            <!-- CTA Buttons -->
            <div class="hero-cta">
              <router-link to="/solar-panels" class="cta-button primary">
                {{ $t('hero.exploreSolutions', 'Огляд Рішень') }}
              </router-link>
              <router-link to="/generators" class="cta-button secondary">
                {{ $t('hero.getFreeConsultation', 'Безкоштовна Консультація') }}
              </router-link>
            </div>
            
            <!-- Social Proof / Stats -->
            <div class="hero-stats">
              <div class="stat-item" v-for="(stat, index) in heroStats" :key="index">
                <span class="stat-number">{{ stat.number }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
          
          <!-- Right Content - Image/Animation -->
          <div class="hero-visual">
            <div class="visual-container">
              <!-- Main Image -->
              <img src="/images/HomeView/solar-farm.png" alt="Smart Home Energy Solution" class="main-image" ref="mainImage" />
              
              <!-- Floating Elements -->
              <div class="floating-element solar" ref="solarElement">
                <img src="/images/header.hero/solarpanel.headerhero.png" alt="Solar Panel" />
              </div>
              <div class="floating-element battery" ref="batteryElement">
                <img src="/images/header.hero/batterystorage.headerhero.png" alt="Battery Storage" />
              </div>
              <div class="floating-element charger" ref="evChargerElement">
                <img src="/images/header.hero/evcharger.headerhero.png" alt="EV Charger" />
              </div>
              
              <!-- Animated Stats/Metrics -->
              <div class="energy-metrics">
                <div class="metric-item savings">
                  <div class="metric-icon">💰</div>
                  <div class="metric-text">
                    <div class="metric-value">-40%</div>
                    <div class="metric-label">{{ $t('hero.energyBill', 'Рахунок за Енергію') }}</div>
                  </div>
                </div>
                <div class="metric-item eco">
                  <div class="metric-icon">🌱</div>
                  <div class="metric-text">
                    <div class="metric-value">CO₂↓</div>
                    <div class="metric-label">{{ $t('hero.footprint', 'Вуглецевий Слід') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Featured Clients/Partners -->
        <div class="hero-partners">
          <div class="partners-container">
            <p class="partners-title">{{ $t('hero.trustedBy', 'Нам Довіряють') }}</p>
            <div class="partners-logos">
              <img src="/images/header.hero/sv.energyinfrastructure.png" alt="Partner 1" />
              <img src="/images/header.hero/octa.jpg" alt="Partner 2" />
              <img src="/images/header.hero/ugv.chargers1.png" alt="Partner 3" />
              <img src="/images/header.hero/leetsoft.jpg" alt="Partner 4" />
            </div>
          </div>
        </div>
      </div>
    </div><!-- End of hero-section -->

    <!-- Residential & Commercial Solar System Section -->
    <div class="page-container">
      <section class="product-segment">
        <div class="section-header">
          <h2>{{ $t('homeView.residentialCommercialSolar') }}</h2>
        </div>
        <div class="product-segment-grid">
          <router-link
            v-for="item in solarSystemItems"
            :key="item.id"
            :to="getRoute(item.slug)"
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
          <h2>{{ $t('homeView.evChargersComponents') }}</h2>
        </div>
        <div class="product-segment-grid">
          <router-link
            v-for="item in evChargerItems"
            :key="item.id"
            :to="getRoute(item.slug)"
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
          :modules="swiperModules"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          navigation
          pagination
          class="carousel-container"
        >
          <swiper-slide v-for="(slide, index) in carouselSlides" :key="index">
            <!-- Conditional rendering for video vs image -->
            <template v-if="slide.type === 'video'">
              <video 
                :src="slide.src" 
                autoplay 
                loop 
                muted 
                playsinline 
                class="carousel-video"
              >
                Your browser does not support the video tag.
              </video>
            </template>
            <template v-else>
              <img :src="slide.src" :alt="slide.title" />
            </template>
                    
            <div class="slide-content">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </swiper-slide>
        </Swiper>
      </section>
    </div>

    <!-- Explore New Category Section -->
    <div class="page-container">
      <section class="new-category-section">
        <div class="section-header">
          <h2>{{ $t('homeView.exploreNewCategories') }}</h2>
        </div>
        <div class="new-category-grid">
          <router-link
            v-for="newCategory in newCategories"
            :key="newCategory.id"
            :to="getRoute(newCategory.slug)"
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
          <h2>{{ $t('homeView.rental') }}</h2>
          <router-link to="/categories" class="see-all-button">
            {{ $t('homeView.seeAll') }}
          </router-link>
        </div>
        <div class="categories-grid">
          <div v-if="rentalCategories && rentalCategories.length === 0">No categories found</div>
          <router-link
            v-for="category in rentalCategories"
            :key="category.id"
            :to="getRoute(category.slug)"
            class="category-card promo-box"
          >
            <img :src="category.image" :alt="category.name" />
            <h3>{{ category.name }}</h3>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useI18n } from 'vue-i18n';
import gsap from 'gsap';
import Intercom from '@intercom/messenger-js-sdk';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import AdBox from '@/components/AdBox.vue';
import CategoryPromotionBox from '@/components/CategoryPromotionBox.vue';
import adService from '@/services/adService';
import productService from '@/services/productService';

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
    AdBox,
    CategoryPromotionBox,
  },
  setup() {
    const { t } = useI18n();
    
    // Initialize Intercom
    try {
      Intercom({
        app_id: 'mm6ivt97',
      });
    } catch (error) {
      console.error('Intercom initialization error:', error);
    }
    
    // State references
    const ads = ref([]);
    const promotionCategories = ref([]);
    const products = ref([]);
    const loading = ref(true);
    const categories = ref([]);
    
    // Swiper modules
    const swiperModules = [Navigation, Pagination, Autoplay];
    
    // ============ BEGIN NEW HERO SECTION REFERENCES ============
    // New hero section references
    const heroSection = ref(null);
    const mainImage = ref(null);
    const solarElement = ref(null);
    const batteryElement = ref(null);
    const evChargerElement = ref(null);
    const heroBackground = ref(null);
    
    // Original parallax refs (keep these to prevent errors in existing code)
    const parallaxContainer = ref(null);
    const backgroundLayer = ref(null);
    const middleLayer = ref(null);
    const contentLayer = ref(null);
    const generatorElement = ref(null);
    
    // New feature cards data (aligned with Slack/Shopify style)
    const heroStats = reactive([
      {
        number: '1000+',
        label: t('hero.installationsCompleted', 'Завершених Установок')
      },
      {
        number: '98%',
        label: t('hero.clientSatisfaction', 'Задоволених Клієнтів')
      },
      {
        number: '24/7',
        label: t('hero.support', 'Підтримка')
      }
    ]);
    
    // Keep the original features for compatibility with other components
    const features = reactive([
      {
        icon: 'icon-solar',
        color: '#ffd600',
        title: t('hero.solarFeature', 'Сонячна Енергія'),
        description: t('hero.solarFeatureDesc', 'Фотоелектричні системи для будь-яких потреб')
      },
      {
        icon: 'icon-battery',
        color: '#4CAF50',
        title: t('hero.batteryFeature', 'Акумуляція'),
        description: t('hero.batteryFeatureDesc', 'Зберігайте енергію для використання в будь-який час')
      },
      {
        icon: 'icon-generator',
        color: '#ff9800',
        title: t('hero.generatorFeature', 'Генератори'),
        description: t('hero.generatorFeatureDesc', 'Надійне резервне живлення за потреби')
      }
    ]);
    // ============ END NEW HERO SECTION REFERENCES ============
    
    // Category route function
    function getRoute(slug) {
      return `/${slug.toLowerCase().replace(/ /g, '-')}`;
    }
    
    // ============ BEGIN NEW HERO SECTION METHODS ============
    // New modern hero section animation methods
    const animateHeroElements = () => {
      const tl = gsap.timeline();
      
      // Animate headline
      tl.from('.headline-primary', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      tl.from('.headline-secondary', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      }, '-=0.5');
      
      // Animate description and CTA
      tl.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.4');
      
      tl.from('.cta-button', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=0.3');
      
      // Animate stats
      tl.from('.stat-item', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
      
      // Animate main visual
      tl.from('.main-image', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.7');
      
      // Animate floating elements
      const floatingElements = ['.floating-element.solar', '.floating-element.battery', '.floating-element.charger'];
      
      floatingElements.forEach((element, index) => {
        // Initial animation
        tl.from(element, {
          opacity: 0,
          scale: 0.7,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.7');
        
        // Continuous floating animation
        gsap.to(element, {
          y: '-=15',
          x: '+=5',
          rotation: '+=3',
          duration: 3 + index,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });
      
      // Animate energy metrics
      tl.from('.metric-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }, '-=0.5');
      
      // Animate partners
      tl.from('.hero-partners', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.3');
      
      // Animate background shapes
      gsap.to('.shape-1', {
        x: '+=30',
        y: '-=20',
        rotation: '+=5',
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
      
      gsap.to('.shape-2', {
        x: '-=40',
        y: '+=30',
        rotation: '-=8',
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
      
      gsap.to('.shape-3', {
        x: '+=20',
        y: '+=20',
        rotation: '+=10',
        duration: 12,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    };
    
    // New parallax effect for mouse movement
    const handleHeroMouseMove = (e) => {
      if (!heroSection.value) return;
      
      const { left, top, width, height } = heroSection.value.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const moveX = (e.clientX - centerX) / 30;
      const moveY = (e.clientY - centerY) / 30;
      
      // Apply subtle movement to floating elements
      if (solarElement.value) {
        gsap.to(solarElement.value, {
          x: -moveX * 0.6,
          y: -moveY * 0.6,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      if (batteryElement.value) {
        gsap.to(batteryElement.value, {
          x: -moveX * 1.2,
          y: -moveY * 1.2,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      if (evChargerElement.value) {
        gsap.to(evChargerElement.value, {
          x: -moveX * 0.9,
          y: -moveY * 0.9,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      // Slight movement for main image
      if (mainImage.value) {
        gsap.to(mainImage.value, {
          x: -moveX * 0.3,
          y: -moveY * 0.3,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      // Apply subtle movement to background shapes
      if (heroBackground.value) {
        const shapes = heroBackground.value.querySelectorAll('.shape');
        gsap.to(shapes, {
          x: -moveX * 1.5,
          y: -moveY * 1.5,
          duration: 1.5,
          ease: 'power2.out'
        });
      }
    };
    // ============ END NEW HERO SECTION METHODS ============
    
    // Keep original methods for compatibility - these won't actually run on the new hero section
    const handleMouseMove = (e) => {
      if (!parallaxContainer.value) return;
      
      const container = parallaxContainer.value;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      
      // Reduce movement factor for a more subtle effect
      const moveX = (mouseX - containerCenterX) / 35; // Increased divisor from 25 to 35
      const moveY = (mouseY - containerCenterY) / 35; // Increased divisor from 25 to 35
      
      // Move layers with different speeds
      if (backgroundLayer.value) {
        gsap.to(backgroundLayer.value, { 
          x: moveX * 0.15, // Reduced from 0.2
          y: moveY * 0.15, // Reduced from 0.2
          duration: 0.8, // Faster animation
          ease: "power2.out" 
        });
      }
      
      if (middleLayer.value) {
        gsap.to(middleLayer.value, { 
          x: moveX * 0.4, // Reduced from 0.5
          y: moveY * 0.4, // Reduced from 0.5
          duration: 0.8, // Faster animation
          ease: "power2.out" 
        });
      }
      
      if (contentLayer.value) {
        gsap.to(contentLayer.value, { 
          x: moveX * 0.6, // Reduced from 0.8
          y: moveY * 0.6, // Reduced from 0.8
          duration: 0.8, // Faster animation
          ease: "power2.out" 
        });
      }
    };

    // Keeping original scroll handling for compatibility
    const handleScroll = () => {
      if (!parallaxContainer.value) return;
      
      const scrollTop = window.pageYOffset;
      const containerRect = parallaxContainer.value.getBoundingClientRect();
      const containerTop = containerRect.top + scrollTop;
      const containerHeight = containerRect.height;
      
      if (scrollTop >= containerTop - window.innerHeight && 
          scrollTop <= containerTop + containerHeight) {
        
        const scrollPosition = scrollTop - containerTop;
        const parallaxFactor = scrollPosition / containerHeight;
        
        // Reduce the parallax effect by using smaller values
        if (backgroundLayer.value) {
          backgroundLayer.value.style.transform = `translateY(${parallaxFactor * 60}px)`; // Reduced from 100
        }
        
        if (middleLayer.value) {
          middleLayer.value.style.transform = `translateY(${parallaxFactor * 40}px)`; // Reduced from 70
        }
        
        if (contentLayer.value) {
          contentLayer.value.style.transform = `translateY(${parallaxFactor * 25}px)`; // Reduced from 40
        }
      }
    };

    // Keeping original animation methods for compatibility
    const animateFloatingElements = () => {
      const animateElement = (element, initialX, initialY, finalX, finalY) => {
        if (element.value) {
          gsap.set(element.value, { opacity: 0, x: initialX, y: initialY, rotation: -3 }); // Reduced rotation
          gsap.to(element.value, { opacity: 1, duration: 0.6, delay: 0.3 }); // Faster animation
          
          // Smaller movement range for floating elements
          gsap.to(element.value, {
            x: finalX,
            y: finalY,
            rotation: 3, // Reduced rotation from 5 to 3
            duration: 15, // Faster animation cycle
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      };
      
      // These won't be used in the new hero section but keeping for compatibility
      animateElement(solarElement, -60, 30, 30, 20);       
      animateElement(batteryElement, 60, -40, 90, -20);    
      animateElement(generatorElement, -90, -60, -60, -90); 
      animateElement(evChargerElement, 120, 60, 90, 90);   
    };

    // Keeping original animation init for compatibility
    const initAnimations = () => {
      const tl = gsap.timeline();
      
      // These won't be needed with new hero section but keeping for compatibility
      tl.from(".tag-line", { 
        opacity: 0, 
        y: 20,
        duration: 0.6,
        ease: "power3.out" 
      });
      
      tl.from(".animated-word", { 
        opacity: 0, 
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out" 
      }, "-=0.3");
      
      tl.from(".description", { 
        opacity: 0, 
        y: 20,
        duration: 0.6,
        ease: "power3.out" 
      }, "-=0.3");
      
      tl.from(".hero-button", { 
        opacity: 0, 
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out" 
      }, "-=0.3");
      
      tl.from(".feature-card", { 
        opacity: 0, 
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.3");
      
      // Hover animations for feature cards
      gsap.utils.toArray(".feature-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            duration: 0.2,
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.2,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            ease: "power2.out"
          });
        });
      });
      
      // Original floating elements animation
      animateFloatingElements();
      
      gsap.to(".scroll-arrow", {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".scroll-indicator", {
        opacity: 0.8,
        duration: 0.8,
        delay: 1.8,
        ease: "power2.inOut"
      });
    };

    // ============ INTEGRATION SETUP ============
    // Updated setupHeroEvents to handle both hero sections (for graceful transition)
    const setupHeroEvents = () => {
      // Setup new hero section events
      if (heroSection.value) {
        heroSection.value.addEventListener('mousemove', handleHeroMouseMove, { passive: true });
        // Initialize animations for the new hero section
        setTimeout(animateHeroElements, 100);
      }
      
      // Keep old hero setup for compatibility - these elements won't be in the DOM
      if (parallaxContainer.value) {
        parallaxContainer.value.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
      
      // Initialize animations for the old hero section if it exists
      setTimeout(initAnimations, 100);
    };

    // Updated cleanup to handle both hero sections
    const cleanupHeroEvents = () => {
      // Cleanup for new hero section
      if (heroSection.value) {
        heroSection.value.removeEventListener('mousemove', handleHeroMouseMove);
      }
      
      // Keep old hero cleanup for compatibility
      if (parallaxContainer.value) {
        parallaxContainer.value.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      }
      
      // Kill all GSAP animations to prevent memory leaks
      gsap.killTweensOf("*");
    };
    
    // Computed properties for dynamic data
    const solarSystemItems = computed(() => [
      {
        id: 1,
        name: t('homeView.solarPanels'),
        slug: 'solar-panels',
        image: '/images/HomeView/solar-farm.png',
      },
      {
        id: 2,
        name: t('homeView.batteries'),
        slug: 'batteries',
        image: '/images/HomeView/solar-battery.png',
      },
      {
        id: 3,
        name: t('homeView.inverters'),
        slug: 'inverters',
        image: '/images/HomeView/інвертер.png',
      },
      {
        id: 4,
        name: t('homeView.solarSets'),
        slug: 'Sets-of-solar-power-plants',
        image: '/images/HomeView/комплект-сонячних.png',
      },
      {
        id: 6,
        name: t('homeView.mountingSystems'),
        slug: 'mounting-systems',
        image: '/images/HomeView/solar-mount-system.png',
      },
    ]);
    
    const evChargerItems = computed(() => [
      {
        id: 1,
        name: t('homeView.dcChargingStations'),
        slug: 'dc-charging-stations',
        image: '/images/HomeView/ev-charger-city.png',
      },
      {
        id: 2,
        name: t('homeView.acChargingStations'),
        slug: 'ac-charging-stations',
        image:'/images/HomeView/otcta-стійка-02.png',
      },
      {
        id: 3,
        name: t('homeView.portableChargingDevices'),
        slug: 'portable-charging-devices',
        image: '/images/HomeView/ev-charger-city.png',
      },
    ]);
    
    const newCategories = computed(() => [
      {
        id: 1,
        name: t('homeView.portablePowerStation'),
        slug: 'portable-power-station',
        image: '/images/HomeView/solar-panel.png',
      },
      {
        id: 2,
        name: t('homeView.solarGenerators'),
        slug: 'charging',
        image: '/images/Categories/portable.solar.generators/jackery-solar-generator-2000-plus_01.png',
      },
      {
        id: 3,
        name: t('homeView.portableSolarPanels'),
        slug: 'portable-solar-panels',
        image: '/images/Categories/portable.solar.panels/Портативні-Сонячні-панелі-Jackery-SolarSaga-100W.png',
      },
      {
        id: 4,
        name: t('homeView.cablesAndWires'),
        slug: 'cables-wires',
        image: '/images/HomeView/Electrical-cables-and-wires.jpg',
      },
    ]);
    
    const rentalCategories = computed(() => [
      {
        id: 1,
        name: t('homeView.generators'),
        slug: 'generators',
        image: '/images/HomeView/генератори.png',
      },
      {
        id: 2,
        name: t('homeView.industrialGenerators'),
        slug: 'industrial-generators',
        image: '/images/HomeView/Промислові-генератори-для-важких-навантажень.png',     
      },
      {
        id: 3,
        name: t('homeView.solarLightingTowers'),
        slug: 'solar-lighting-towers',
        image: '/images/HomeView/Освітлювальні-вежі-на-сонячних-батареях.png',     
      },
      {
        id: 4,
        name: t('homeView.liftsAndCranes'),
        slug: 'lifts-and-cranes',
        image: '/images/Categories/rent/lifts.png',
      }
    ]);
    
    const carouselSlides = computed(() => [
      {
        type: 'gif',
        src: '/videos/carousel/Self-Sustaining-Smart-Home.gif',
        title: t('homeView.solarPanels'),
        description: 'Живіть своє життя від чистої сонячної енергії. Зменшуйте рахунки та захищайте довкілля за допомогою наших високоефективних панелей'
      },
      {
        type: 'gif',
        src: '/videos/carousel/ev.chargers.gif',
        title: t('homeView.evChargersComponents'),
        description: 'Заряджайте свій електромобіль швидко та ефективно. Наші розумні зарядні пристрої забезпечують надійне живлення, коли вам це потрібно'
      },
      {
        type: 'gif',
        src: '/videos/carousel/portable.panels.gif',
        title: t('homeView.portableSolarPanels'),
        description: 'Беріть енергію з собою будь-куди. Наші портативні сонячні панелі ідеальні для кемпінгу, автофургонів та пригод поза мережею'
      },
    ]);
    
    // Define fetchAds inside setup
    const fetchAds = async () => {
      try {
        // Using the service directly instead of this.$services
        const response = await adService.getAds({ populate: '*' });
        ads.value = response.data.data.map(ad => ({
          id: ad.id,
          title: ad.attributes?.title || 'No title',
          description: ad.attributes?.description || '',
          image: ad.attributes?.image?.data?.attributes?.url || '/images/default-ad.jpg',
        }));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    
    // Define fetchPromotionCategories inside setup
    const fetchPromotionCategories = async () => {
      promotionCategories.value = [
        { id: 1, name: t('homeView.solarPanels') },
        { id: 2, name: t('homeView.dcChargingStations') },
        { id: 3, name: t('homeView.batteries') },
        { id: 4, name: t('homeView.cablesAndWires') },
      ];
    };

    const fetchProducts = async () => {
      try {
        // Placeholder - update with your actual service implementation
        const response = await productService.getProducts({
          populate: ['general_information.images', 'pricing_and_inventory'],
        });
        products.value = response.data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        loading.value = false;
      }
    };
    
    const fetchCarouselSlides = async () => {
      try {
        // Optional: Fetch slides dynamically from an API if needed
        // const response = await axios.get('/api/carousel-slides');
      } catch (error) {
        console.error('Error fetching carousel slides:', error);
      }
    };
    
    // Setup lifecycle hooks
    onMounted(() => {
      setupHeroEvents();
      fetchAds();
      fetchPromotionCategories();
      fetchProducts();
      fetchCarouselSlides();
    });
    
    onUnmounted(() => {
      cleanupHeroEvents();
    });


    return {
      // Expose translation function
      t,
      
      // Navigation and modules
      swiperModules,
      Navigation,
      Pagination,
      Autoplay,
      
      // Data
      ads,
      promotionCategories,
      products,
      loading,
      
      // New hero refs
      heroSection,
      mainImage,
      heroBackground,
      
      // Original parallax refs (keeping for compatibility)
      parallaxContainer,
      backgroundLayer,
      middleLayer,
      contentLayer,
      solarElement,
      batteryElement,
      generatorElement,
      evChargerElement,
      
      // Features and stats data
      features,
      heroStats,
      
      // Computed properties
      solarSystemItems,
      evChargerItems,
      newCategories,
      rentalCategories,
      carouselSlides,

      // Navigation function - only expose getRoute
      getRoute,
      
      // Methods
      fetchAds,
      fetchPromotionCategories,
      fetchProducts,
      fetchCarouselSlides,
      
      // Animation functions - old and new
      setupHeroEvents,
      cleanupHeroEvents,
      handleHeroMouseMove,
      animateHeroElements
    };
  },
  
  // Options API methods for potential legacy compatibility
  methods: {
    getRoute(slug) {
      return `/${slug.toLowerCase().replace(/ /g, '-')}`;
    },
    
    async fetchAds() {
      try {
        const response = await this.$services.adService.getAds({ populate: '*' });
        this.ads = response.data.data.map(ad => ({
          id: ad.id,
          title: ad.attributes?.title || 'No title',
          description: ad.attributes?.description || '',
          image: ad.attributes?.image?.data?.attributes?.url || '/images/default-ad.jpg',
        }));
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    },
    
    async fetchPromotionCategories() {
      this.promotionCategories = [
        { id: 1, name: this.$t('homeView.solarPanels') },
        { id: 2, name: this.$t('homeView.dcChargingStations') },
        { id: 3, name: this.$t('homeView.batteries') },
        { id: 4, name: this.$t('homeView.cablesAndWires') },
      ];
    },
    
    async fetchProducts() {
      try {
        const response = await this.$services.productService.getProducts({
          populate: ['general_information.images', 'pricing_and_inventory'],
        });
        this.products = response.data.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchCarouselSlides() {
      try {
        // Optional: Fetch slides dynamically from an API if needed
        // const response = await this.$axios.get('/api/carousel-slides');
      } catch (error) {
        console.error('Error fetching carousel slides:', error);
      }
    }
  }
}
</script>

<!-- Style Section -->
<style scoped>
/* Base styles for home view (preserved from your original code) */
.home-view {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  margin: 0;
  padding: 0;
  padding-top: 150px; /* Adjust according to your header height */
}

/* =========== NEW HERO SECTION STYLES =========== */
/* Hero Section Styles */
.hero-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 650px;
  margin-top: -120px;
  padding-top: 120px;
  padding-bottom: 0; /* Remove bottom padding */
  margin-bottom: 0; /* Remove bottom margin */
}

/* Background styles */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #0a3d62 0%, #3867d6 100%);
  opacity: 0.97;
}

.animated-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.shape-1 {
  top: 15%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
}

.shape-2 {
  bottom: 20%;
  right: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
}

.shape-3 {
  top: 60%;
  left: 30%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%);
}

/* Container styles */
.hero-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  z-index: 1;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Left side - Copy styles */
.hero-copy {
  flex: 0 0 50%;
  max-width: 50%;
  color: #fff;
  padding-right: 40px;
}

.hero-headline {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.headline-primary {
  display: block;
  margin-bottom: 8px;
}

.headline-secondary {
  display: block;
  color: #4ecca3;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.9);
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  background-color: #4ecca3;
  color: #0a3d62;
  box-shadow: 0 4px 14px rgba(78, 204, 163, 0.4);
}

.cta-button.primary:hover {
  background-color: #65e6bb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(78, 204, 163, 0.5);
}

.cta-button.secondary {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.cta-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Stats section */
.hero-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #4ecca3;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

/* Right side - Visual styles */
.hero-visual {
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
}

.visual-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* New floating elements */
.floating-element {
  position: absolute;
  opacity: 0; /* Will be animated to visible */
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  will-change: transform;
}

.floating-element img {
  max-width: 100%;
  height: auto;
}

/* New specific floating elements positions */
.floating-element.solar {
  top: -30px;
  left: -50px;
  width: 120px;
  z-index: 2;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
}

.floating-element.battery {
  bottom: 40px;
  left: -30px;
  width: 100px;
  z-index: 2;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
}

.floating-element.charger {
  top: 40px;
  right: -40px;
  width: 110px;
  z-index: 2;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
}

/* Energy metrics */
.energy-metrics {
  position: absolute;
  bottom: -15px;
  right: 20px;
  display: flex;
  gap: 15px;
  z-index: 3;
}

.metric-item {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.metric-icon {
  font-size: 24px;
  margin-right: 12px;
}

.metric-text {
  display: flex;
  flex-direction: column;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0a3d62;
}

.metric-label {
  font-size: 0.8rem;
  color: #6c757d;
}

/* Partners section */
.hero-partners {
  margin-top: 60px;
  padding: 30px 0;
  background-color: white;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 52px rgba(0, 0, 0, 0.1);
}


.partners-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.partners-title {
  font-size: 1rem;
  color: #333; /* Changed from rgba(255, 255, 255, 0.6) to dark text */
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}

.partners-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px; /* Increased from 40px */
  flex-wrap: wrap;
}

.partners-logos img {
  height: 30px;
  max-width: 120px;
  object-fit: contain;
  filter: grayscale(100%); /* Changed from brightness/invert to grayscale */
  opacity: 0.7;
  transition: all 0.3s ease;
  /* Removed the drop-shadow */
}

.partners-logos img:hover {
  filter: grayscale(0%); /* Remove grayscale on hover */
  opacity: 1;
}

/* Hero section responsive */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
  }
  
  .hero-copy, .hero-visual {
    flex: 0 0 100%;
    max-width: 100%;
    padding-right: 0;
  }
  
  .hero-copy {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .floating-element.solar {
    top: -20px;
    left: 0;
  }
  
  .floating-element.battery {
    bottom: 30px;
    left: 0;
  }
  
  .floating-element.charger {
    top: 30px;
    right: 0;
  }
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 12px;
  }
  
  .cta-button {
    width: 100%;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .energy-metrics {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
    justify-content: center;
  }
  
  .floating-element.solar,
  .floating-element.battery,
  .floating-element.charger {
    width: 80px;
  }
  
  .partners-logos {
    gap: 20px;
  }
  
  .partners-logos img {
    height: 24px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding-top: 80px;
    min-height: auto;
  }
  
  .hero-headline {
    font-size: 2rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
/* =========== END NEW HERO SECTION STYLES =========== */

/* =========== ORIGINAL STYLES PRESERVED =========== */
/* Improved Hero Parallax Container */
.hero-parallax-container {
  position: relative;
  height: 80vh; /* Changed from 100vh to 80vh */
  min-height: 500px; /* Reduced from 600px */
  max-height: 650px; /* Reduced from 800px */
  overflow: hidden;
  margin-bottom: 40px; /* Reduced from 60px */
  background: linear-gradient(135deg, #0a1929 0%, #1a365d 100%);
}

/* Parallax Layers */
.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.background-layer {
  background: linear-gradient(135deg, #0a1929 0%, #1a365d 100%);
  background-size: 200% 200%;
  animation: gradientBackground 15s ease infinite;
}

@keyframes gradientBackground {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.middle-layer {
  pointer-events: none;
}

.content-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Original Floating Elements */
.solar-panel {
  top: 15%;
  left: 10%;
  width: 180px;
}

.battery {
  top: 60%;
  right: 15%;
  width: 160px;
}

.generator {
  bottom: 20%;
  left: 15%;
  width: 170px;
}

.ev-charger {
  top: 25%;
  right: 10%;
  width: 150px;
}

/* Original Hero Content styles */
.hero-text {
  margin-bottom: 60px;
  text-align: center;
}

.tag-line {
  font-size: 18px;
  font-weight: 500;
  color: #64b5f6;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.2;
}

.animated-word {
  display: inline-block;
  margin-right: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto 30px;
  color: rgba(255, 255, 255, 0.9);
}

/* Original Hero Buttons */
.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.hero-button {
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.hero-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: width 0.3s ease;
  z-index: -1;
}

.hero-button:hover:before {
  width: 100%;
}

.hero-button.primary {
  background-color: #ff4f5a;
  color: white;
}

.hero-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 79, 90, 0.4);
}

.hero-button.secondary {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.hero-button.secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
}

/* Feature Cards */
.feature-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 50px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  width: 260px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.feature-icon i {
  font-size: 24px;
  color: #fff;
}

.feature-card h3 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
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
  padding: 5px 5px; /* Add a small padding to prevent edge overflow */
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

/* General media styles for carousel */
.carousel-media {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire slide area */
  display: block;
}

/* Specific styles for videos */
.carousel-video {
  object-position: center;
  background-color: #000; /* Black background for videos with different aspect ratios */
}

/* Specific styles for GIFs - if needed */
.carousel-gif {
  /* Any specific styles for GIFs */
}

/* Make sure the slide container maintains a consistent aspect ratio */
.swiper-slide {
  height: 400px; /* Set a fixed height or use aspect-ratio */
  overflow: hidden;
  position: relative;
}

/* Improve the slide content styling */
.slide-content {
  position: absolute;
  bottom: 30px;
  left: 30px;
  max-width: 60%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  z-index: 10; /* Make sure content is above the media */
}

.slide-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
}

.slide-content p {
  font-size: 16px;
  line-height: 1.4;
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
  padding-top: 10px 0;
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
/* Scroll indicator (continued) */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0.8;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  margin-bottom: 10px;
}

.scroll-text {
  font-size: 0.8rem;
  letter-spacing: 1px;
}

/* Icon styles */
.icon-solar::before {
  content: "☀️";
}

.icon-battery::before {
  content: "🔋";
}

.icon-generator::before {
  content: "⚡";
}

/* Responsive styles */
@media (max-width: 992px) {
  /* Original hero content breakpoint preserved */
  .hero-text {
    text-align: center;
    max-width: 100%;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .feature-cards {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .title {
    font-size: 3.2rem;
  }
}

@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .title {
    font-size: 2.8rem;
  }
  
  .description {
    font-size: 1.2rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-description {
    font-size: 1.2rem;
    max-width: 90%;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 576px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 15px;
  }
}
</style>