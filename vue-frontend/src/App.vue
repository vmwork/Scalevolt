<!-- frontend/src/App.vue -->
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #f5f5f5;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Breadcrumbs */
.breadcrumbs {
  background-color: #f0f0f0;
  padding: 10px 0;
  margin-bottom: 20px;
}

.breadcrumbs a {
  color: #4CAF50;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 150px - 300px); /* Adjust for header and footer */
  padding: 20px 0;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1005;
}

/* Products grid styling */
.products-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  padding: 10px 0;
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
</style>