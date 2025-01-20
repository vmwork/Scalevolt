<!-- frontend/src/App.vue -->
<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <router-view></router-view>
    </div>
    <!-- Use Footer only once here -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useUserStore } from './stores/user';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  setup() {
    const baseURL = import.meta.env.BASE_URL;
    
    const products = ref([
      {
        id: 1,
        name: 'Сонячні Панелі Ja Solar',
        price: 700,
        isAdded: false,
        image: '/categories/ja-solar560.jpg',
      },
      { 
        id: 2, 
        name: 'Сонячні Панелі Ja Solar 420', 
        price: 1000, 
        isAdded: false,
        image: '/Categories/ja-solar420.jpg',
      },
      { 
        id: 3, 
        name: 'Сонячні Панелі Longi Solar', 
        price: 1500, 
        isAdded: false, 
        image: '/Categories/longi-solar430.jpg',
      },
      { 
        id: 4, 
        name: 'Сонячні Панелі Rison Energy', 
        price: 800, 
        isAdded: false, 
        image: '/Categories/risen-titan485.jpg',
      },
      { 
        id: 5, 
        name: 'Сонячні Jinko Tiger', 
        price: 900, 
        isAdded: false,
        image: '/Categories/jinko-tiger425.jpg',
      },
    ]);
    
    const { autoLogin } = useUserStore();
    
    autoLogin();
    
    return {
      baseURL,
      products,
    };
  },
};
</script>

<style>
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  margin: 0;
  padding: 0;
}

.main-container {
  padding: 0px; /* Match this padding with your header */
}

.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  padding: 10px 0; /* Adjust padding if necessary */
}

@media (max-width: 1200px) {
  .products-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 992px) {
  .products-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .products-container {
    grid-template-columns: 1fr;
  }
}

/* Add your header styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8; /* Light gray background for contrast */
}

header h2,
header b {
  color: #333; /* Dark text color for visibility */
  margin: 0;
}

header ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
}

header ul li {
  display: flex;
  align-items: center;
}

header ul li img {
  height: 24px;
  margin-right: 8px;
}

/* Logo Container */
.logo-container {
  display: flex;
  align-items: center;
}

/* Search Container */
.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-container input {
  width: 100%;
  max-width: 400px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
/* Header Navigation */
header ul {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
}

.header-item {
  margin-left: 20px;
}

.icon-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-text img {
  height: 24px;
  margin-bottom: 4px;
}

.icon-text span {
  color: #333;
  font-weight: bold;
}

/* Logo Image */
.logo {
  height: 50px;
  margin-right: 10px;
}

/* Header Text */
header h2 {
  color: #333;
  margin: 0;
}
.logo {
  height: 50px;
  margin-right: 10px;
}

/* Global styles */
*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
