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
      formatDate
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

/* Dark mode styles */
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
}
</style>