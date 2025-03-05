<template>
  <div class="product-page-container">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <span>Home</span>
      <span> &gt; </span>
      <span>{{ product?.type || 'Unknown Category' }}</span>
      <span> &gt; </span>
      <span>{{ product?.title || 'Unknown Product' }}</span>
    </nav>

    <div v-if="product" class="product-wrapper">
      <!-- Image Gallery Section -->
      <div class="image-section">
        <!-- Thumbnails -->
        <div class="thumbnail-list">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            class="thumbnail"
            :class="{ active: selectedImage === img }"
            @click="selectedImage = img"
            alt="Thumbnail"
          />
        </div>

        <!-- Main Image -->
        <div class="main-image-container">
          <img
            :src="selectedImage || placeholderImage"
            alt="Main Product Image"
            class="main-image"
          />
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="details-section">
        <h1 class="product-title">{{ product.title }}</h1>
        <p class="product-quantity">Net Qty: {{ product.quantity }}</p>

        <!-- Price -->
        <div class="price-container">
          <span class="current-price">₹{{ product.price }}</span>
        </div>

        <!-- Payment Offers -->
        <div class="payment-offers">
          <p>Get it for ₹{{ product.bankOfferPrice }} on bank payment offers</p>
          <a href="#">View all offers &gt;</a>
        </div>

        <!-- Coupons & Offers -->
        <div class="coupons-offers">
          <h3>Coupons &amp; Offers</h3>
          <ul>
            <li v-for="offer in product.offers" :key="offer.id">
              <span class="bank-name">{{ offer.bank }}: </span>
              <span class="offer-detail">{{ offer.detail }}</span>
            </li>
          </ul>
          <a href="#">View all coupons &gt;</a>
        </div>

       <!-- Add to Cart Button or Quantity Selector -->
<div class="cart-control">
  <button 
    v-if="!showQuantitySelector" 
    class="add-to-cart-btn" 
    @click="showQuantitySelector = true"
  >
    Add To Cart
  </button>
  <div v-else class="quantity-selector">
    <button class="quantity-btn" @click="decrementQuantity">-</button>
    <span class="quantity-value">{{ quantity }}</span>
    <button class="quantity-btn" @click="incrementQuantity">+</button>
    <button class="add-to-cart-btn" @click="addToCart">Add To Cart</button>
  </div>
</div>

        <!-- Additional Info -->
        <div class="extra-info">
          <div class="info-icon">
            <img src="/images/ProductPage/return-icon.png" alt="7 Days Exchange" />
            <p>7 Days Exchange</p>
          </div>
          <div class="info-icon">
            <img src="/images/ProductPage/delivery-icon.png" alt="Fast Delivery" />
            <p>Fast Delivery</p>
          </div>
        </div>
      </div>
    </div>

    <!-- If the product is not found -->
    <div v-else>
      <p>Product not found. Ensure the product ID is valid.</p>
    </div>

    <!-- Highlights Section -->
    <div class="highlights-section" v-if="product">
      <h2>Highlights</h2>
      <table>
        <tr>
          <th>Brand</th>
          <td>{{ product.brand }}</td>
        </tr>
        <tr>
          <th>Product Type</th>
          <td>{{ product.type }}</td>
        </tr>
        <tr>
          <th>Model</th>
          <td>{{ product.model }}</td>
        </tr>
        <!-- Add more rows as needed -->
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import productService from '@/services/productService';

export default {
  name: "ProductPage",
  setup() {
    const route = useRoute();
    const cartStore = useCartStore();

    const product = ref(null);
    const selectedImage = ref(null);
    const placeholderImage = ref("/images/placeholder.png");
    const quantity = ref(1); // Track quantity
    const showQuantitySelector = ref(false); // Track whether to show quantity selector

    const mockProducts = [
      {
        id: 1,
        title: 'Сонячна Панель JA Solar 560kW',
        price: 1000,
        bankOfferPrice: 950,
        offers: [
          { id: 1, bank: 'HDFC', detail: '5% off on credit card' },
          { id: 2, bank: 'ICICI', detail: '10% cashback' },
        ],
        images: ['/images/1.jpg', '/images/2.jpg'],
        brand: 'JA Solar',
        quantity: '1 piece',
        model: 'JA560Model',
        type: 'Solar Panel',
      },
      {
        id: 2,
        title: 'Сонячна Панель Jinko Tiger 560kW',
        price: 1200,
        bankOfferPrice: 1150,
        offers: [
          { id: 1, bank: 'SBI', detail: 'Flat ₹200 off' },
        ],
        images: ['/images/3.jpg', '/images/4.jpg'],
        brand: 'Jinko Tiger',
        quantity: '1 piece',
        model: 'Jinko560Model',
        type: 'Solar Panel',
      },
    ];

    onMounted(async () => {
      try {
        const productId = route.params.id;

        // Try API first
        const response = await productService.getProductById(productId);
        if (response?.data) {
          product.value = {
            id: response.data.id,
            ...response.data.attributes,
            images: response.data.attributes.images?.data?.map(
              (img) => img.attributes.url
            ) || [],
          };
        } else {
          // Fallback to mock data
          const foundMock = mockProducts.find(
            (item) => item.id.toString() === productId
          );
          product.value = foundMock || null;
        }

        // Set initial image
        selectedImage.value = product.value?.images[0] || placeholderImage.value;
      } catch (error) {
        console.error("Error loading product:", error);
      }
    });

    const addToCart = () => {
      if (product.value) {
        const cartItem = {
          id: product.value.id,
          title: product.value.title,
          price: product.value.price,
          image: product.value.images[0],
          quantity: quantity.value, // Include quantity in cart item
        };
        cartStore.addItem(cartItem);
        alert(`${product.value.title} added to cart! (Quantity: ${quantity.value})`);
        
        // Optionally toggle back to button or keep quantity selector visible
        showQuantitySelector.value = true; // Keep quantity selector visible after adding
      }
    };

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    return {
      product,
      selectedImage,
      placeholderImage,
      addToCart,
      quantity,
      showQuantitySelector,
      incrementQuantity,
      decrementQuantity,
    };
  },
};
</script>


<style scoped>
/* (Unchanged) Container for the entire product page */
.product-page-container {
  padding-top: 100px; /* Adjust based on header height */
  margin-top: -80px; /* Compensate for fixed header */
  padding-bottom: 40px;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
/* Breadcrumbs */
.breadcrumbs {
  font-size: 14px;
  margin-bottom: 20px;
  color: #666;
}

/* Main product layout */
.product-wrapper {
  display: flex;
  gap: 30px;
}

/* Image Section */
.image-section {
  display: flex;
  gap: 10px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.2s border-color;
}
.thumbnail.active {
  border-color: #f26e9a; /* Pink highlight for example */
}

.main-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  min-width: 300px;
  min-height: 300px;
}

.main-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

/* Details Section */
.details-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-title {
  font-size: 22px;
  font-weight: 600;
}

.product-quantity {
  color: #888;
}

.price-container {
  font-size: 18px;
}
.current-price {
  font-size: 22px;
  font-weight: bold;
  color: #212121;
  margin-right: 8px;
}
.discount-tag {
  color: green;
  font-weight: bold;
}
.original-price {
  color: #999;
  margin-right: 8px;
}
.tax-info {
  color: #666;
  font-size: 14px;
}

/* Payment Offers */
.payment-offers {
  background-color: #fdf9f7;
  padding: 10px;
  border-radius: 4px;
}

/* Coupons & Offers */
.coupons-offers {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
}

.coupons-offers ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.coupons-offers li {
  margin-bottom: 5px;
}
.bank-name {
  font-weight: bold;
}
.offer-detail {
  margin-left: 5px;
}

/* Add to Cart Button */
.add-to-cart-btn {
  padding: 15px 25px;
  background-color: #f75389; /* Pinkish color */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
.add-to-cart-btn:hover {
  background-color: #eb3271;
}

/* Icons (Exchange, Delivery, etc.) */
.extra-info {
  display: flex;
  gap: 20px;
}

.info-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-icon img {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

/* Highlights Section */
.highlights-section {
  margin-top: 40px;
}

.highlights-section table {
  width: 100%;
  border-collapse: collapse;
}
.highlights-section th,
.highlights-section td {
  border: 1px solid #eee;
  padding: 10px;
  text-align: left;
}
.highlights-section th {
  background-color: #f9f9f9;
  width: 200px;
  font-weight: 500;
}


/* Quantity Selector */
.quantity-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #f26e9a;
  border-radius: 4px;
  margin-top: 10px;
}

.quantity-btn {
  padding: 5px 10px;
  background-color: #f26e9a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 30px;
  height: 30px;
}

.quantity-btn:hover {
  background-color: #eb3271;
}

.quantity-value {
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px;
  min-width: 30px;
  text-align: center;
}

/* Ensure the Add to Cart button in quantity selector matches the original */
.quantity-selector .add-to-cart-btn {
  padding: 10px 20px;
  background-color: #f75389;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.quantity-selector .add-to-cart-btn:hover {
  background-color: #eb3271;
}
</style>