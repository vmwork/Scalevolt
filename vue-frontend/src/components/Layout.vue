<template>
  <div class="main-layout">
    <Header />
    <main class="content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Header,
    Footer
  }
});
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  margin-top: 180px; /* Match the header height to prevent content from hiding behind it */
  padding: 20px;
}
</style>