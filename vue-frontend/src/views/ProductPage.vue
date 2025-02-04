<template>
  <div class="product-page-container">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <span>Home</span>
      <span> &gt; </span>
      <span>Earphones &amp; Headphones</span>
      <span> &gt; </span>
      <span>{{ product?.title || 'Unknown Product' }}</span>
    </nav>

    <div v-if="product" class="product-wrapper">
      <!-- Image Gallery Section -->
      <div class="image-section">
        <!-- Thumbnails (vertical) -->
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

        <!-- Price Section -->
        <div class="price-container">
          <span class="current-price">
            ₹{{ product.currentPrice }}
          </span>
          <span class="discount-tag">
            {{ product.discount }}% Off
          </span>
          <br />
          <span class="original-price">
            <s>₹{{ product.originalPrice }}</s>
          </span>
          <span class="tax-info">(incl. of all taxes)</span>
        </div>

        <!-- Payment Offers (Example) -->
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

        <!-- Add to Cart Button -->
        <button class="add-to-cart-btn">Add To Cart</button>

        <!-- Additional Info (Icons, Delivery, etc.) -->
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
import { useCartStore } from '@/stores/cart';
import { productService } from '@/services/productService';

export default {
  name: "ProductPage",
  props: ["id"],

  data() {
    return {
      product: null,
      selectedImage: null,
      placeholderImage: "/images/placeholder.png",
    };
  },

  created() {
    // Hardcode TWO example products for demonstration
    // So that '/product/1' and '/product/7' both work
    const mockProducts = [
      {
        id: "1",
        title: "OnePlus Bullets Z2 Bluetooth Wireless In Ear Earphones",
        quantity: "1 piece",
        currentPrice: 1799,
        originalPrice: 2299,
        discount: 21,
        bankOfferPrice: 1599,
        images: [
          "/images/earphone1-thumb1.jpg",
          "/images/earphone1-thumb2.jpg",
          "/images/earphone1-thumb3.jpg",
          "/images/earphone1-thumb4.jpg",
        ],
        brand: "OnePlus",
        type: "Neckband",
        model: "Bullets Z2",
        offers: [
          { id: 1, bank: "SBI", detail: "Flat 10% off using SBI Bank debit cards" },
          { id: 2, bank: "Kotak", detail: "Flat 12% discount with Kotak Credit Card" },
          { id: 3, bank: "SBI", detail: "Flat 10% off using SBI Bank debit cards" },
          { id: 4, bank: "IndusInd", detail: "Get 10% upto ₹300 off with IndusInd Bank cards" },
          { id: 5, bank: "Federal Bank", detail: "Get 10% discount with Federal Bank Credit Card" },
        ],
      },
      {
        id: "7",
        title: "OnePlus Bullets Z2 (Sanchiz Edition)",
        quantity: "1 piece",
        currentPrice: 1999,
        originalPrice: 2599,
        discount: 23,
        bankOfferPrice: 1699,
        images: [
          "/images/earphone7-thumb1.jpg",
          "/images/earphone7-thumb2.jpg",
        ],
        brand: "OnePlus",
        type: "Neckband",
        model: "Bullets Z2 Sanchiz",
        offers: [
          { id: 1, bank: "SBI", detail: "Flat 10% off with SBI Bank debit cards" },
          { id: 2, bank: "ICICI", detail: "Get 12% discount with ICICI Bank Credit Card" },
        ],
      },
    ];

    setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  async created() {
    try {
      const response = await productService.getProductById(this.id);
      this.product = response.data;
      this.selectedImage = this.product.attributes.images?.[0] || this.placeholderImage;
    } catch (error) {
      console.error("Product loading error:", error);
    }
  },

  methods: {
    addToCart() {
      if (this.product) {
        this.cartStore.addItem({
          id: this.product.id,
          ...this.product.attributes
        });
        alert(`${this.product.attributes.title} added to cart!`);
      }
    }
  }
};
</script>

<style scoped>
/* Container for the entire product page */
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
</style>
