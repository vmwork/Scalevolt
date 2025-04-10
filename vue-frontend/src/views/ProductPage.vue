<template>
  <div class="product-page-container flex flex-col justify-center items-center">
    <nav class="breadcrumb ml-8">
      <router-link to="/">{{ $t("common.home") }}</router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link :to="getTypeRoute(myproduct?.type)">
        {{ myproduct?.type || $t("common.categories") }}
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="current-page">{{
        myproduct?.title || $t("product.section_title")
      }}</span>
    </nav>
    <div class="flex flex-col xl:flex-row">
      <div class="product-containew p-4">
        <div v-if="product" class="product-content">
          <div class="product-gallery">
            <!-- Thumbnail Gallery -->
            <div class="thumbnail-list">
              <div
                v-for="(img, index) in productImages"
                :key="index"
                class="thumbnail"
                :class="{ active: selectedImage === img }"
                @click="selectedImage = img"
              >
                <img :src="img" :alt="`Product Thumbnail ${index + 1}`" />
              </div>
            </div>

            <!-- Main Product Image -->
            <div class="main-image-container">
              <img
                :src="
                  selectedImage || productImages[0] || '/images/placeholder.png'
                "
                :alt="product.title || product.name"
                class="main-image"
              />
            </div>
          </div>
        </div>
        <div class="p-4 diviwer mt-6 mb-6"></div>
        <div class="product-characteristics">
          <div v-for="(item, i) in productCharacteristics" :key="i" class="">
            <div class="product-characteristic p-[17px] flex gap-3 my-2">
              <img :src="item.src" alt="" />
              <div class="">
                <div class="characteristics-name">{{ item.name }}</div>
                <div class="characteristics-description">
                  {{ item.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-instaletion">
          <button
            class="flex gap-2 items-center justify-center w-full h-[50px] rounded-[12px]"
          >
            <img src="/images/service.svg" alt="" />
            <p>Замовити встановлення</p>
          </button>
        </div>
        <div class="p-4 diviwer mt-6 mb-6"></div>
        <div class="social flex gap-1">
          <button><img src="/images/facebook.svg" alt="" /></button>
          <button><img src="/images/tg.svg" alt="" /></button>
          <button><img src="/images/soc.svg" alt="" /></button>
        </div>
      </div>
      <div v-if="product" class="about-product p-4">
        <div class="about-product-head flex justify-between">
          <div class="availability">В наявності</div>
          <div class="code">Код: <span>12743</span></div>
        </div>
        <h2 class="product-name mt-3">{{ product.defaultName }}</h2>
        <div class="sertification flex items-center mt-6">
          <img src="/images/sertification-Icon.svg" alt="" />
          <div class="ml-2">Сертифікований товар.</div>
          <a href="/">Дивитись сертифікат</a>
        </div>

        <div class="product-boxes flex flex-wrap mt-6">
          <div
            v-for="(box, index) in productBoxes"
            :key="index"
            class="product-boxe flex items-center mt-2 mr-2"
          >
            <img class="mr-2" :src="box.img" alt="" />
            <div class="">{{ box.title }}</div>
          </div>
        </div>
        <div class="p-4 diviwer mt-6 mb-6"></div>
        <div class="product-price">
          <div class="flex items-center">
            <span class="product-price-discount">64 543 ₴</span>
            <span class="discount ml-2">-5%</span>
          </div>
          <div class="real-price mt-1">57 999 ₴</div>
          <div class="credits-price flex items-center">
            <img src="/images/calender.svg" alt="" />
            <span class="credit-price ml-2 mr-2">від 580 ₴/міс</span>
            <span class="credit">в кредит</span>
          </div>
        </div>
        <div class="p-4 diviwer mt-6 mb-6"></div>
        <div class="product-sizes">
          <span>Разміри сонячної батареї, (мм)</span>
          <div class="mt-3 product-sizes-buttons">
            <button
              @click="sizeButton = size"
              v-for="(size, i) in productSizes"
              :key="size.id"
              :class="{ active: sizeButton.id === size.id }"
            >
              {{ size.size }}
            </button>
          </div>
        </div>
        <div class="garanty">
          <h4 class="h4">Гарантія та доставка:</h4>
          <div class="garanty-data mt-3">
            <div
              v-for="(garanty, i) in garantyData"
              :key="i"
              class="flex items-center mt-6"
            >
              <img class="mr-3" :src="garanty.img" alt="" />
              <span>{{ garanty.title }}</span>
            </div>
          </div>
        </div>
        <div class="payments-data mt-6">
          <h3>Оплату можна здійснити:</h3>
          <div class="flex flex-wrap">
            <div v-for="(item, i) in paymantData" :key="i" class="paymant">
              <button><img :src="item.img" alt="" /></button>
            </div>
          </div>
        </div>
        <div class="main-characters mt-[63px]">
          <h3>Основні характеристики</h3>
          <div class="main-characters-data mt-8">
            <div
              class="characters-data p-8 flex items-center justify-between xl:justify-start flex-wrap"
              v-for="(item, i) in mainCharacters"
              :key="i"
            >
              <span>{{ item.name }}</span>
              <div>{{ item.description }}</div>
            </div>
          </div>
        </div>
        <!-- <div
          class="add-to-card mt-5 flex items-center justify-between xl:justify-start"
        >
          <div class="product-counter flex items-center justify-between">
            <button @click="changeProductCount('-')">
              <img src="/images/dash.svg" alt="" />
            </button>
            <input v-model="productCount" />
            <button @click="changeProductCount('+')">
              <img src="/images/plus.svg" alt="" />
            </button>
          </div>
          <div class="add-to-card-button xl:ml-4">
            <button
              @click="addToCart"
              class="flex items-center justify-center xl:w-[580px]"
            >
              <img
                class="mr-2"
                src="/images/cart-2.svg"
                alt=""
                width="20"
                height="17"
              />
              <p>Додати в кошик</p>
            </button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="relative">
      <div
        class="add-to-card mt-5 flex items-center justify-between xl:justify-start"
      >
        <div class="product-counter flex items-center justify-between">
          <button @click="changeProductCount('-')">
            <img src="/images/dash.svg" alt="" />
          </button>
          <input v-model="productCount" />
          <button @click="changeProductCount('+')">
            <img src="/images/plus.svg" alt="" />
          </button>
        </div>
        <div class="add-to-card-button xl:ml-4">
          <button
            @click="addToCart"
            class="flex items-center justify-center xl:w-[580px]"
          >
            <img
              class="mr-2"
              src="/images/cart-2.svg"
              alt=""
              width="20"
              height="17"
            />
            <p>Додати в кошик</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <InstallationPopup /> -->

  <Swiper />
</template>

<script setup lang="js">
import { ref, onMounted, computed, onUpdated, watch } from "vue";
import { useRoute } from "vue-router";
import Swiper from "@/components/swiper.vue";
import { useCartStore } from "@/stores/cart";
import { useProductsStore } from "@/stores/products";
import InstallationPopup from "@/components/installationPopup.vue";

const route = useRoute();
const store = useProductsStore();
const cartStore = useCartStore();
const productId = computed(() => route.params.id);
const product = ref(null);
const selectedImage = ref(null);
const productCount = ref(1)
const sizeButton = ref({ id: 1, size: "1722×1134×30" })
const changeProductCount = (action) => {
  if (action === "+") {
    productCount.value++;
  } else if (action === "-") {
    if (productCount.value > 1) {
      productCount.value--;
    }
  }
};
const productSizes = [
  { id: 1, size: "1722×1134×30" },
  { id: 2, size: "2600×1134×30" },
  { id: 3, size: "2600×1134×30" },
];
const myproduct = computed(() => {
  return store.getProducts.filter((product) => +product.id === +productId);
});
const productCharacteristics = [
  { src:'/images/manufactury.svg',
    name: "Виробник",
    description: "Victron Energy (Китай)",
  },
  {src:'/images/core_1.svg',
    name: "Номінальна потужність",
    description: "435 Вт",
  },
  {src:'/images/core.svg',
    name: "Маса",
    description: "1.9 Кг",
  },
  {src:'/images/selfie.svg',
    name: "Номінальна напруга",
    description: "18.4 В",
  },
  {src:'/images/battery.svg',
    name: "Струм короткого замикання",
    description: "1.18 А",
  },

]
const productBoxes = [
  {
    img: "/images/np.svg",
    title: "Доставка за 1 грн.",
  },
  {
    img: "/images/krash.svg",
    title: "Кращ",
  },
  {
    img: "/images/trade-in.svg",
    title: "Trade-In",
  }
]
const garantyData = [
  {
    img: "/images/truck.svg",
    title: "Безкоштовна доставка у магазин та відділення Нової Пошти.",
  },
  {
    img: "/images/shield-tick.svg",
    title: "Офіційна гарантія від виробника",
  },
  {
    img: "/images/3d-rotate.svg",
    title: "Швидкий обмін та повернення протягом 14 днів.",
  }
]
const mainCharacters = [
  {
    name: "Номінальна потужність, (Вт)",
    description: "435",
  },
  {
    name: "Тип кристала",
    description: "Монокристал",
  },
  {
    name: "Напруга при максимальній потужності, (В)",
    description: "33,04",
  },
  {
    name: "Струм при максимальній потужності, (A)",
    description: "13,17 А",
  },
  {
    name: "Напруга холостого ходу, (В)",
    description: "39,33",
  },
  {
    name: "Струм короткого замикання Iк.з. (A) ",
    description: "1722х1134х30",
  },
  {
    name: "Рама",
    description: "Анодований алюміній",
  },
  {
    name: "Вага, (кг)",
    description: "120 Гц",
  },
  {
    name: "Напруга холостого ходу, (В)",
    description: "20,8",
  },
]
const paymantData=[
  {
    img: "/images/paymants/google.svg",
    title: "google",
  },
  {
    img: "/images/paymants/apple.svg",
    title: "apple",
  },
  {
    img: "/images/paymants/privat.svg",
    title: "privat",
  },
  {
    img: "/images/paymants/visa.svg",
    title: "УкрСиббанк",
  },
  {
    img: "/images/paymants/master.svg",
    title: "УкрСиббанк",
  },
  {
    img: "/images/paymants/green.svg",
    title: "УкрСиббанк",
  },
  {
    img: "/images/paymants/yellow.svg",
    title: "УкрСиббанк",
  },
]
const addToCart = () => {
      if (product.value) {

        console.log(product.value);
        const cartItem = {
          id: product.value.id,
          title: product.value.defaultName || product.value.name,
          price: product.value.price,
          image: productImages.value[0] || "/images/placeholder.png",
          quantity: productCount.value,
          // installation: addInstallation?.value
          //   ? installationDetails?.value
          //   : null,
        };
        cartStore.addToCart(cartItem);
        // alert(
        //   `Added ${quantity.value} ${
        //     product.value.title || product.value.defaultName
        //   } to cart${addInstallation.value ? " with installation" : ""}`
        // );
      }
    };
const getTypeRoute = (type) => {
      const typeToRoute = {
        "Сонячні Панелі": "/solar-panels",
        Батареї: "/batteries",
        "Cables, Chargers & Powerbanks": "/cables",
        Інвертори: "/inverters",
        SolarSets: "/solar-sets",
        "Система монтажу сонячних панелей": "/mounting-systems", // Changed to match your URL
        "Швидкі Зарядні Станції (DC)": "/dc-charging-stations",
        "Зарядні Станції Рівня 2 (AC)": "/ac-charging-stations",
        "Портативні/Мобільні Зарядні Пристрої": "/portable-charging-devices",
      };
      return typeToRoute[type] || "/catalogue";
    };
    const productImages = computed(() => {
      if (!product.value) return [];
      if (product.value.images) return product.value.images;
      if (product.value.image) {
        return Array.isArray(product.value.image)
          ? product.value.image
          : [product.value.image];
      }
      return ["/images/placeholder.png"];
    });
    const getProduct = () => {

        const productId = route.params.id;
        // Simulate API call or use mock data
        const foundProduct = store.getProducts.filter(
          (product) => +product.id === +productId
        )[0];

        if (foundProduct) {
          product.value = foundProduct;

          // Set selected image safely
          if (foundProduct.images && foundProduct.images.length > 0) {
            selectedImage.value = foundProduct.images[0];
          } else if (foundProduct.image) {
            selectedImage.value = Array.isArray(foundProduct.image)
              ? foundProduct.image[0]
              : foundProduct.image;
          } else {
            selectedImage.value = "/images/placeholder.png";
          }
        }

    };
    onUpdated(() => {
      getProduct();
    });
    // Fetch product on component mount
    onMounted(async () => {
      await getProduct(), { deep: true };
    });
    watch(
      () => store.getProducts,
      () => {
        getProduct();
      }
    );
</script>

<style scoped>
.product-page-container {
  max-width: 1920px;
  /* margin: 0 auto; */
  /* padding: 20px; */
  /* padding-top: 24px;  */
  /* Add padding to account for the fixed header height */
}

/* If you have a breadcrumb that needs to be visible */
.breadcrumb {
  font-size: 14px;
  margin-bottom: 20px;
  color: #5d6368;
  margin-top: 8px; /* Add some margin at the top */
  width: 100%;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #999;
}
.product-content {
  display: flex;
  gap: 40px;
}

.product-gallery {
  display: flex;
  gap: 20px;
  /* width: 50%; */
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail {
  width: 96px;
  height: 96px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail.active {
  border-color: #4392ff;
  border-radius: 10px;
}

.thumbnail img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.main-image-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #e0e0e0; */
  /* padding: 20px; */
}

.main-image {
  max-width: 100%;
  max-height: 590px;
  object-fit: contain;
}
.diviwer {
  width: 100%;
  padding: 1px;
  max-height: 1px;
  background-color: #e0e0e0;
}
.product-characteristic {
  background-color: #e8e8e8;
  border-radius: 8px;
}
.characteristics-name {
  font-weight: 400;
  font-size: 16px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  color: #8c8f9d;
}
.characteristics-description {
  font-weight: 500;
  font-size: 16px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  color: #2f2e34;
}
.button-instaletion button {
  background-color: #ffffff;
  color: #4392ff;
  border: 1px solid #4392ff;
  font-weight: 500;
  font-size: 18px;
  line-height: 135%;
  letter-spacing: 0%;
}

.social button {
  background-color: #f8f9fa;
  border-radius: 50%;
  padding: 16px;
}
.social img {
  width: 20px;
  height: auto;
}
.availability {
  font-weight: 500;
  font-size: 14px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  background-color: #2cdb000d;
  color: #42b029;
  padding: 6px 12px;
  border-radius: 1000px;
}
.code {
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #b2bac0;
}
.code span {
  color: #001e34;
}
.product-name {
  font-weight: 500;
  font-size: 48px;
  line-height: 124%;
  letter-spacing: 0%;
}
.sertification a {
  color: #4392ff;
}
.product-boxe {
  background: #f8f9fa;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 10px 14px;
  width: max-content;
}
.product-price-discount {
  font-weight: 500;
  font-size: 14px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  vertical-align: middle;
  text-decoration: line-through;
  color: #808080;
}
.discount {
  background-color: #ff003a;
  border-radius: 14px;
  color: #ffffffff;
  padding: 2px 4px;
}
.real-price {
  font-weight: 600;
  font-size: 48px;
  line-height: 124%;
  letter-spacing: 0%;
  vertical-align: middle;
}
.credit-price {
  color: #42b029;
  font-weight: 500;
  font-size: 16px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  vertical-align: middle;
}
.credit {
  font-weight: 500;
  font-size: 14px;
  line-height: 145%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #b2bac0;
}
.product-sizes {
  font-weight: 500;
  font-size: 16px;
  line-height: 115.99999999999999%;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #5d6368;
}
.product-sizes-buttons {
  font-weight: 500;
  font-size: 18px;
  line-height: 132%;
  letter-spacing: 0%;
  vertical-align: middle;
  padding: 12px 8.5px;
}
.product-sizes-buttons button {
  background: #ffffffff;
  border: 1px solid #e8e8e8;
  margin-right: 16px;
  margin-top: 8px;
}
.product-sizes-buttons button:hover {
  border-color: #4392ff;
}
.product-sizes-buttons .active {
  border-color: #4392ff;
  color: #000000;
}
.garanty h4 {
  font-weight: 500;
  font-size: 24px;
  line-height: 124%;
  letter-spacing: 0%;
  color: #2f2e34;
}
.garanty-data {
  font-weight: 500;
  font-size: 18px;
  line-height: 132%;
  letter-spacing: 0%;
  color: #5d6368;
  background: #f8f9fa;
  padding: 32px 26px;
  border-radius: 24px;
}
.payments-data h3 {
  font-weight: 500;
  font-size: 24px;
  line-height: 124%;
  letter-spacing: 0%;
  color: #2f2e34;
}
.payments-data button {
  padding: 0px;
  background: transparent;
  margin-right: 16px;
  margin-top: 16px;
}
.main-characters h3 {
  font-weight: 500;
  font-size: 32px;
  line-height: 124%;
  letter-spacing: 0%;
}
.main-characters-data {
  background: #f8f9fa;
  border-radius: 24px;
}
.characters-data span {
  font-weight: 500;
  font-size: 18px;
  line-height: 145%;
  letter-spacing: 0%;
  color: #5d6368;
  width: 60%;
}
.characters-data div {
  font-weight: 500;
  font-size: 18px;
  line-height: 145%;
  letter-spacing: 0%;
  color: #001e34;
}
.product-counter {
  border: 1px solid #4392ff;
  width: max-content;
  border-radius: 12px;
}
.product-counter input {
  width: 50px;
  height: 100%;
  padding: 10px 15px;
}
.product-counter button {
  font-size: 20px;
  color: #001e34;
  border-radius: 12px;
  background: transparent;
  padding: 0 12px;
  height: 54px;
}
.product-counter button:hover {
  border: 1px solid transparent;
}

.add-to-card-button button {
  background: #4392ff;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  /* line-height: 135%; */
  letter-spacing: 0%;
  height: 52px;
}
.about-product {
  /* position: relative; */

  overflow: hidden;
  overflow-y: auto;
}

@media (min-width: 1280px) {
  .add-to-card {
    position: absolute;
    bottom: 117px;
    left: -30px;
    z-index: 100;
  }
  .about-product {
    width: 838px;
    height: 900px;
    left: -100px;
  }
}

@media (min-width: 1440px) {
  .product-page-container {
    padding-left: 80px;
  }

  .product-containew {
    width: 734px;
  }

  .product-characteristics {
    display: flex;
    flex-wrap: wrap;
  }
  .product-characteristic {
    width: max-content;
    display: flex;
    margin-right: 16px;
  }
  .product-counter {
    /* margin-left: 54px; */
    background-color: #ffffff;
  }
  .product-counter button {
    width: 100%;
  }
}
</style>
