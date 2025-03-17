<template>
  <div class="user-profile-container">
    <div class="profile-header">
      <div class="profile-avatar-container">
        <img 
          :src="user?.photoURL || defaultAvatar" 
          alt="User Avatar" 
          class="profile-avatar"
        />
        <button @click="triggerAvatarUpload" class="edit-avatar-btn">
          <i class="edit-icon">✏️</i>
        </button>
        <input 
          type="file" 
          ref="avatarInput" 
          @change="handleAvatarUpload" 
          accept="image/*" 
          class="hidden-file-input"
        />
      </div>
      
      <div class="profile-info">
        <h1 class="user-name">{{ user?.displayName || 'User' }}</h1>
        <p class="user-email">{{ user?.email }}</p>
      </div>
    </div>

    <div class="profile-sections">
      <div class="profile-section">
        <h2>{{ t('account_details') }}</h2>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">{{ t('email') }}</span>
            <span class="detail-value">{{ user?.email }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">{{ t('joined_date') }}</span>
            <span class="detail-value">
              {{ formatDate(user?.metadata?.creationTime) }}
            </span>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2>{{ t('account_settings') }}</h2>
        <div class="settings-grid">
          <div class="setting-item">
            <label class="switch">
              <input type="checkbox" v-model="notificationsEnabled" />
              <span class="slider round"></span>
            </label>
            <span>{{ t('email_notifications') }}</span>
          </div>
          <div class="setting-item">
            <label class="switch">
              <input type="checkbox" v-model="darkModeEnabled" />
              <span class="slider round"></span>
            </label>
            <span>{{ t('dark_mode') }}</span>
          </div>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="profile-section order-history-section">
        <h2>{{ t('order_history') }}</h2>
        
        <div v-if="isLoadingOrders" class="loading-spinner">
          <div class="spinner"></div>
        </div>
        
        <div v-else-if="orders.length === 0" class="empty-orders">
          <p>{{ t('no_orders_yet') }}</p>
          <button @click="$router.push('/')" class="btn-secondary">
            {{ t('start_shopping') }}
          </button>
        </div>
        
        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-meta">
                <h3>{{ t('order_number') }}: #{{ order.orderNumber }}</h3>
                <span class="order-date">{{ formatDate(order.createdAt) }}</span>
              </div>
              <div class="order-status" :class="getStatusClass(order.status)">
                {{ t(`order_status_${order.status.toLowerCase()}`) }}
              </div>
            </div>
            
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="item-image">
                  <img :src="item.image || '/images/product-placeholder.png'" :alt="item.name">
                </div>
                <div class="item-details">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-quantity">{{ t('quantity') }}: {{ item.quantity }}</p>
                </div>
                <div class="item-price">
                  {{ formatPrice(item.price * item.quantity) }}
                </div>
              </div>
            </div>
            
            <div class="order-footer">
              <div class="order-totals">
                <div class="total-row">
                  <span>{{ t('subtotal') }}:</span>
                  <span>{{ formatPrice(calculateSubtotal(order)) }}</span>
                </div>
                <div class="total-row">
                  <span>{{ t('shipping') }}:</span>
                  <span>{{ formatPrice(order.shipping) }}</span>
                </div>
                <div class="total-row total-final">
                  <span>{{ t('total') }}:</span>
                  <span>{{ formatPrice(calculateTotal(order)) }}</span>
                </div>
              </div>
              
              <div class="order-actions">
                <button @click="viewOrderDetails(order.id)" class="btn-text">
                  {{ t('view_details') }}
                </button>
                <button 
                  v-if="order.status === 'DELIVERED'" 
                  @click="reorderItems(order)" 
                  class="btn-primary btn-small"
                >
                  {{ t('reorder') }}
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="hasMoreOrders" class="load-more">
            <button @click="loadMoreOrders" class="btn-text">
              {{ t('load_more_orders') }}
            </button>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <button @click="saveProfile" class="btn-primary">
          {{ t('update_profile') }}
        </button>
        <button @click="logout" class="btn-secondary">
          {{ t('logout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import OrderService from '@/services/OrderService';

import { 
  getAuth, 
  signOut, 
  updateProfile as firebaseUpdateProfile, 
  updateEmail 
} from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
  name: 'UserProfilePage',
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const auth = getAuth();
    const storage = getStorage();

    // Get current user from store or auth
    const user = computed(() => userStore.user || auth.currentUser);

    // Default avatar
    const defaultAvatar = '/images/default-avatar.png';

    // Avatar upload references
    const avatarInput = ref(null);

    // Settings toggles
    const notificationsEnabled = ref(localStorage.getItem('notificationsEnabled') === 'true');
    const darkModeEnabled = ref(localStorage.getItem('darkModeEnabled') === 'true');

    // Order history
    const orders = ref([]);
    const isLoadingOrders = ref(true);
    const hasMoreOrders = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(5);

    // Watch for settings changes and save to localStorage
    const saveSettings = () => {
      localStorage.setItem('notificationsEnabled', notificationsEnabled.value);
      localStorage.setItem('darkModeEnabled', darkModeEnabled.value);
      
      // Apply dark mode if enabled
      if (darkModeEnabled.value) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    };

    // Methods
    const triggerAvatarUpload = () => {
      avatarInput.value.click();
    };

    // Upload avatar to Firebase Storage
    const uploadAvatarToFirebase = async (file) => {
      if (!user.value) return null;
      
      try {
        const fileRef = storageRef(storage, `avatars/${user.value.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    };

    const handleAvatarUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        // 1. Upload to Firebase Storage
        const photoURL = await uploadAvatarToFirebase(file);
        
        // 2. Update user profile with new photoURL
        if (photoURL && user.value) {
          await firebaseUpdateProfile(user.value, { photoURL });
          userStore.updateUserPhoto(photoURL);
        }
      } catch (error) {
        console.error('Avatar upload failed:', error);
        alert('Failed to upload avatar. Please try again.');
      }
    };

    const saveProfile = async () => {
      try {
        // Save settings
        saveSettings();
        
        // Show success message
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Profile update failed:', error);
        alert('Failed to update profile. Please try again.');
      }
    };

    const logout = async () => {
      try {
        await signOut(auth);
        userStore.clearUser();
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Failed to logout. Please try again.');
      }
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return 'N/A';
      return new Date(timestamp).toLocaleDateString();
    };

    // Order history methods
    const loadOrders = async (page = 1) => {
      if (!user.value) return;
      
      isLoadingOrders.value = true;
      try {
        const response = await OrderService.getUserOrders(user.value.uid, {
          page,
          pageSize: pageSize.value
        });
        
        if (page === 1) {
          orders.value = response.data;
        } else {
          orders.value = [...orders.value, ...response.data];
        }
        
        hasMoreOrders.value = response.pagination.page < response.pagination.pageCount;
        currentPage.value = page;
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        isLoadingOrders.value = false;
      }
    };

    const loadMoreOrders = () => {
      loadOrders(currentPage.value + 1);
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH'
      }).format(price);
    };

    const calculateSubtotal = (order) => {
      return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTotal = (order) => {
      return calculateSubtotal(order) + order.shipping;
    };

    const getStatusClass = (status) => {
      const statusMap = {
        'PENDING': 'status-pending',
        'PROCESSING': 'status-processing',
        'SHIPPED': 'status-shipped',
        'DELIVERED': 'status-delivered',
        'CANCELLED': 'status-cancelled'
      };
      
      return statusMap[status] || 'status-unknown';
    };

    const viewOrderDetails = (orderId) => {
      router.push(`/order/${orderId}`);
    };

    const reorderItems = async (order) => {
      // Add all items to cart
      for (const item of order.items) {
        await cartStore.addToCart({
          id: item.productId,
          quantity: item.quantity
        });
      }
      
      // Navigate to cart
      router.push('/cart');
    };

    // Check authentication on component mount
    onMounted(() => {
      if (!user.value) {
        console.log('No user found, redirecting to login');
        router.push('/login');
        return;
      }
      
      console.log('User profile loaded:', user.value);
      
      // Apply saved settings
      if (darkModeEnabled.value) {
        document.documentElement.classList.add('dark-mode');
      }
      
      // Load orders
      loadOrders();
    });

    return {
      user,
      t,
      defaultAvatar,
      avatarInput,
      notificationsEnabled,
      darkModeEnabled,
      triggerAvatarUpload,
      handleAvatarUpload,
      saveProfile,
      logout,
      formatDate,
      // Order history
      orders,
      isLoadingOrders,
      hasMoreOrders,
      loadMoreOrders,
      formatPrice,
      calculateSubtotal,
      calculateTotal,
      getStatusClass,
      viewOrderDetails,
      reorderItems
    };
  }
};
</script>

<style scoped>
.user-profile-container {
  max-width: 800px;
  margin: 120px auto 0; /* Added top margin to account for header */
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.profile-avatar-container {
  position: relative;
  margin-right: 30px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  border: 2px solid #f0f0f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-avatar-btn:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.hidden-file-input {
  display: none;
}

.profile-info {
  flex-grow: 1;
}

.user-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.user-email {
  color: #666;
  font-size: 16px;
}

.profile-sections {
  display: grid;
  gap: 25px;
}

.profile-section {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.profile-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.detail-grid, .settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item, .setting-item {
  display: flex;
  flex-direction: column;
}

.setting-item {
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}

.detail-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.profile-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn-primary, .btn-secondary {
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background-color: #0066cc;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0055b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 102, 204, 0.2);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 15px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #0066cc;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Order History Styles */
.order-history-section {
  margin-top: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 102, 204, 0.1);
  border-radius: 50%;
  border-top-color: #0066cc;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-orders {
  text-align: center;
  padding: 30px 0;
}

.empty-orders p {
  margin-bottom: 20px;
  color: #666;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.order-meta h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
}

.order-date {
  font-size: 14px;
  color: #666;
}

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status-pending {
  background-color: #FFF3CD;
  color: #856404;
}

.status-processing {
  background-color: #D1ECF1;
  color: #0C5460;
}

.status-shipped {
  background-color: #D4EDDA;
  color: #155724;
}

.status-delivered {
  background-color: #CCE5FF;
  color: #004085;
}

.status-cancelled {
  background-color: #F8D7DA;
  color: #721C24;
}

.order-items {
  padding: 15px;
}

.order-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  margin: 0 0 5px 0;
  font-weight: 500;
}

.item-quantity {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #333;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.order-totals {
  flex: 1;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
}

.total-final {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
}

.order-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-text {
  background: none;
  border: none;
  color: #0066cc;
  font-weight: 500;
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn-small {
  padding: 8px 15px;
  font-size: 14px;
}

.load-more {
  text-align: center;
  margin-top: 10px;
}

/* Dark mode overrides */
:root.dark-mode .user-profile-container {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

:root.dark-mode .user-name {
  color: #f0f0f0;
}

:root.dark-mode .user-email,
:root.dark-mode .detail-value {
  color: #d0d0d0;
}

:root.dark-mode .profile-section {
  background-color: #2a2a2a;
}

:root.dark-mode .btn-secondary {
  background-color: #333;
  color: #f0f0f0;
  border-color: #444;
}

:root.dark-mode .order-card {
  background-color: #2a2a2a;
}

:root.dark-mode .order-header,
:root.dark-mode .order-footer {
  background-color: #222;
  border-color: #333;
}

:root.dark-mode .order-item {
  border-color: #333;
}

:root.dark-mode .order-date,
:root.dark-mode .item-quantity {
  color: #aaa;
}

:root.dark-mode .item-price {
  color: #f0f0f0;
}

@media (max-width: 768px) {
  .user-profile-container {
    padding: 20px;
    margin-top: 100px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-avatar-container {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .detail-grid, .settings-grid {
    grid-template-columns: 1fr;
  }

  .profile-actions {
    flex-direction: column;
    gap: 15px;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }
  
  .order-footer {
    flex-direction: column;
    gap: 15px;
  }
  
  .order-actions {
    justify-content: flex-start;
  }
}
</style>