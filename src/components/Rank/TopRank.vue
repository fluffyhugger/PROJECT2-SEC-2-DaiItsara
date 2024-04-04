<script setup>
import { ref, onMounted, watch } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getComponentProperty } from "./enum"
import { SortBy } from "./enum";

library.add(faChevronLeft, faChevronRight);

let autoSlideInterval;
const containerRef = ref(null);
let scrollDirection = 1;
const props = defineProps({
  selectedOption: String,
  products: Array,
  isLoading: Boolean
});

const emit = defineEmits(['update:selectedOption']);
const selectedOption = ref(props.selectedOption);

watch(selectedOption, (newValue) => {
  emit('update:selectedOption', newValue);
});

const slide = (direction) => {
  const container = containerRef.value;
  if (container) {
    const scrollAmount = direction * (container.offsetWidth / 2);
    const targetScroll = container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }
};


const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slide(scrollDirection);
  }, 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};
const handleScroll = () => {
  const container = containerRef.value;
  if (container) {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft === maxScrollLeft && scrollDirection === 1) {
      scrollDirection = -1;
    } else if (container.scrollLeft === 0 && scrollDirection === -1) {
      scrollDirection = 1;
    }
  }
};
onMounted(() => {
  startAutoSlide();
  containerRef.value.addEventListener("scroll", handleScroll);
});
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};
</script>
<template>
  <div class="top-container pt-5">
    <div class="head-toprank-container">
      <div class="head-toprank pl-11">
        <h1 class="top-ranking">TOP RANKING </h1>
        <br />
        <div class="dropdown-container">
          <select v-model="selectedOption" name="sort" id="rank" class="dropdown">
            <option v-for="(value, key) in SortBy" :value="value" :key="key">{{ key }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="controls-container">
      <div class="control left" @click="stopAutoSlide(); slide(-1); startAutoSlide();">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <div class="top">
        <div class="container" @mouseenter="stopAutoSlide()" @mouseleave="startAutoSlide()" ref="containerRef">
          <div v-for="product in props.products.slice(0, 3)" :key="product.id" class="card">
            <figure>
              <div class="image-container">
                <img :src="getComponentProperty(product, 'case', 'image-url')" alt="" />
              </div>
            </figure>
            <div class="card-body">
              <h2 class="card-title"> builder name : {{ product['builder-name'] }}</h2>
              <div v-if="selectedOption === SortBy.Price">
                price : {{ product['total-price'] }}
              </div>
              <div v-else-if="selectedOption === SortBy.Latest">
                build-date : {{ formatDate(new Date(product['build-date'])) }}
              </div>
              <div class="card-actions justify-end">
                <router-link :to="`/ranking/pcset-info/${product['builder-id']}`">xxxxxx</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="control right" @click="stopAutoSlide(); slide(1); startAutoSlide();">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </div>
  </div>
</template>
<style scoped>
@keyframes hoverEffect {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1.05);
  }
}

select {
  color: black;
  background-color: transparent;
}



.top-ranking {
  margin-right: 1rem;
  font-size: larger;
  text-align: center;
}

.dropdown-container {
  margin-right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0.5rem;
}

.head-toprank {
  margin-right: 1rem;
}

.top-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  display: flex;
  overflow-x: auto;
  padding: 20px 40px 50px 100px;
  /* Adjust padding */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  position: relative;
  max-width: 100%;
  /* Ensure container doesn't exceed parent width */
}

.container::-webkit-scrollbar {
  width: 8px;
}

.container::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.card {
  flex: 0 0 auto;
  width: auto;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease, opacity 0.3s ease, z-index 0s linear 0.3s;
}

.card:hover {
  animation-name: hoverEffect;

  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  z-index: 2;
}

.control {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 12px;
  padding: 2.5px;
}

.left {
  margin-right: 10px;
}

.right {
  margin-left: 10px;
}

.card:hover {
  transform: translateY(-5px);
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 5px;
  }

  .card {
    max-width: 200px;
  }
}

.image-container {
  max-width: 20vw;
}

.head-toprank-container {
  margin-right: 1rem;
}

.controls-container {
  display: flex;
  align-items: center;
}

.controls-container>.control {
  margin: 0 0.5rem;
}
</style>