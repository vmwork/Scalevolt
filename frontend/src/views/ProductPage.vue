<template>
    <div class="product-page">
      <div v-if="product">
        <div class="product-container">
          <div class="image-gallery">
            <img :src="selectedImage || placeholderImage" alt="Product Image" class="main-image" />
            <div class="thumbnail-container">
              <img
                v-for="(image, index) in product.images"
                :key="index"
                :src="image"
                :alt="'Thumbnail ' + index"
                class="thumbnail"
                :class="{ active: selectedImage === image }"
                @click="selectedImage = image"
              />
            </div>
          </div>
          <div class="product-details">
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
            <p>{{ product.shortDescription }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Product not found. Ensure the product ID is valid. ID: {{ id }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductPage",
    props: ["id"],
    data() {
      return {
        product: null,
        selectedImage: null,
        placeholderImage: "/images/placeholder.png", // Ensure this image exists
      };
    },
    created() {
      console.log("Product ID received:", this.id); // Debugging
      const products = [
        {
          id: "1",
          name: "Smartwatch Pro 3000",
          price: 1599,
          shortDescription: "Feature-rich smartwatch with AMOLED display.",
          images: ["/images/watch1.jpg", "/images/watch2.jpg"], // Ensure these images exist
        },
      ];
  
      const productId = this.id;
      this.product = products.find((p) => p.id === productId);
  
      if (this.product) {
        this.selectedImage = this.product.images[0];
        console.log("Product Found:", this.product); // Debugging
      } else {
        console.warn("Product not found for ID:", productId);
      }
    },
    methods: {
      formatPrice(price) {
        return `₹${price.toFixed(2)}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .product-page {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
  .product-container {
    display: flex;
    gap: 20px;
  }
  .image-gallery {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .main-image {
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
  }
  .thumbnail-container {
    display: flex;
    gap: 10px;
  }
  .thumbnail {
    width: 60px;
    height: 60px;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .thumbnail.active {
    border-color: #007bff;
  }
  .product-details {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .product-title {
    font-size: 24px;
    font-weight: bold;
  }
  .product-price {
    font-size: 20px;
    color: green;
  }
  </style>
  