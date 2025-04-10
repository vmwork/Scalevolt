<template>
  <div class="header-wrapper">
    <div class="header flex items-center mt-4">
      <router-link to="/">
        <img
          class="my-logo w-[81px] md:w-[172px] md:mr-[40px]"
          src="/images/logo.svg"
          width="172"
      /></router-link>
      <nav class="hidden xl:flex text-lg">
        <ul class="flex mr-4">
          <li class="flex items-center gap-2">
            <img src="/images/menu-icon.svg" />
            <div href="#home">{{ $t("common.catalog") }}</div>
          </li>
        </ul>
        <ul class="flex gap-2 mr-4">
          <li class="px-[22px] py-[14px]">
            <a href="#home">{{ $t("common.sale_delivery") }}</a>
          </li>
          <li class="px-[22px] py-[14px]">
            <a href="#about">{{ $t("common.garanty") }}</a>
          </li>
          <li class="px-[22px] py-[14px]">
            <a href="#contact">{{ $t("common.rent") }}</a>
          </li>
          <li class="px-[22px] py-[14px]">
            <a href="#contact">{{ $t("common.stock") }}</a>
          </li>
        </ul>
      </nav>
      <div class="hidden xl:flex ml-[40px] mr-[40px]">
        <SearchBar
          class="my-search-bar full-width-search"
          :all-products="searchProducts"
          @search-selected="handleSearchSelected"
        />
      </div>
      <div class="select-region flex gap-2">
        <div
          class="region-option"
          :class="{ 'region-option-active': locale === 'pl' }"
          @click="selectRegion('pl')"
        >
          <span class="text-lg">POL</span>
        </div>
        <div
          :class="{ 'region-option-active': locale === 'uk' }"
          class="region-option"
          @click="selectRegion('uk')"
        >
          <span class="text-lg">UKR</span>
        </div>
      </div>
      <div class="diviwer-gorozontal rotate-90 w-[20px] h-[1px]"></div>
      <div class="select-region flex gap-2 mr-2">
        <div
          :class="{ 'region-option-active': locale === 'pl' }"
          class="region-option"
          @click="selectRegion('pl')"
        >
          <span class="text-lg">PLN</span>
        </div>
        <div
          :class="{ 'region-option-active': locale === 'uk' }"
          class="region-option"
          @click="selectRegion('uk')"
        >
          <span class="text-lg">UAN</span>
        </div>
      </div>

      <div class="user-menu flex gap-2 ml-[40px]">
        <button class="w-[26px] h-[26px] md:w-[52px] md:h-[52px]">
          <img src="/images/like.svg" width="52" alt="" />
        </button>

        <router-link
          to="/cart"
          class="w-[26px] h-[26px] md:w-[52px] md:h-[52px] relative"
        >
          <img src="/images/cart.svg" alt="" width="52" />
          <span
            v-if="cartCount > 0"
            class="cart-count absolute top-0 right-0 flex items-center justify-center"
            >{{ cartCount }}</span
          >
        </router-link>

        <router-link
          v-if="!user"
          to="/login"
          class="w-[26px] h-[26px] md:w-[52px] md:h-[52px]"
        >
          <img src="/images/profile.svg" alt="" width="52" />
        </router-link>
        <router-link
          v-else
          to="/profile"
          class="w-[26px] h-[26px] md:w-[52px] md:h-[52px]"
        >
          <img src="/images/profile.svg" width="52" alt="Account" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { computed } from "vue";

import SearchBar from "@/components/SearchBar.vue";
import { useI18n } from "vue-i18n";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";

const user = computed(() => userStore.user);
const userStore = useUserStore();
const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalQuantity);
const { t, locale } = useI18n(); // Make sure to get the t function
const currentLocale = computed(() => {
      // Add a default value if locale.value is undefined
      return locale.value || "uk";
    });

    const selectRegion = (region) => {
      console.log("Changing locale to:", region);

      // Update the i18n locale
      locale.value = region;

      // Store in localStorage
      localStorage.setItem("userLocale", region);

      // Update document language
      document.documentElement.setAttribute("lang", region);

      // Update currency based on region if not explicitly set by user
      if (!localStorage.getItem("userCurrency")) {
        const newCurrency = region === "pl" ? "PLN" : "UAH";
        localStorage.setItem("userCurrency", newCurrency);
      }

      // Choose ONE navigation approach - either reload or Vue Router
      // Option 1: Force a full page reload
      window.location.reload();

      // Option 2: Use Vue Router (commented out since we're using reload)
      // const currentPath = router.currentRoute.value.path;
      // const newPath = `/${region}${currentPath.substring(currentPath.indexOf('/', 1) || currentPath.length)}`;
      // router.push(newPath);

      // Close the dropdown (won't execute with reload)
      // regionMenuVisible.value = false;
    };
</script>
<style lang="css" scoped>
.header-wrapper {
  margin: 0 auto;
}
.diviwer-gorozontal {
  background-color: #e8e8e8;
}
button {
  padding: 0px;
}
.region-option {
  cursor: pointer;
  color: #b2bac0;
}
.region-option-active {
  color: #001e34;
}
nav li,
nav a {
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 132%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #001e34;
  cursor: pointer;
}

.cart-count {
  width: 20px;
  height: 20px;
  background: #ff3d00;
  border-radius: 50%;
  font-size: 14px;
  color: #ffffff;
}
</style>
