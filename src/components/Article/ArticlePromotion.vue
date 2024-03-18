<script setup>
import { ref } from "vue"

const itemsToShow = ref(4) // Initial number of items to show
const totalItems = 8 // Total number of items available
const loadMore = () => {
  itemsToShow.value += 4 // Increment by desired number of items to show
}
</script>
<template>
  <div class="grid grid-cols-7 gap-2 mt-16 ml-16">
    <div class="bg-white col-span-3 row-span-1">
      <RouterLink to="new/meow">
        <div class="image-container">
          <img alt="" class="image-style" style="height: 450px" />
          <div class="image-overlay">
            <div class="image-text text-orange-400 font-extrabold text-9xl">
              This Information is coming soon.....
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="bg-white col-span-2 row-span-1">
      <RouterLink to="new/redmi">
        <div class="image-container">
          <img alt="" class="image-style" style="height: 450px" />
          <div class="image-overlay">
            <div class="image-text text-red-800 font-extrabold text-9xl">
              This Information is coming soon.....
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="col-span-2">
      <div class="image-container">
        <img alt="" class="image-style" style="height: 250px; width: 300px" />
        <div class="image-overlay" style="width: 75%">
          <div class="image-text text-green-600 font-extrabold text-9xl">
            This Information is coming soon.....
          </div>
        </div>
      </div>
      <div class="image-container">
        <img alt="" class="image-style" style="height: 200px; width: 300px" />
        <div class="image-overlay" style="width: 76%">
          <div class="image-text text-white font-extrabold text-9xl">
            This Information is coming soon.....
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="flex ml-32 h-30 mt-12">
      <img src="../../assets/news/geforceRtx.jpg" class="w-64 h-40" />
      <div class="mt-5">
        <h1 class="font-bold text-orange-500 ml-10">???????????</h1>
        <h1 class="font-extrabold text-black ml-10 mt-3 text-xl w-1/2">
          ???????????????????????????????????????????????????????
        </h1>
        <h1 class="ml-10 mt-3 font-bold text-sm">???????????</h1>
      </div>
    </div>
    <div class="flex ml-32 h-30 mt-12">
      <img src="../../assets/news/geforceRtx.jpg" class="w-64 h-40" />
      <div class="mt-5">
        <h1 class="font-bold text-orange-500 ml-10">???????????</h1>
        <h1 class="font-extrabold text-black ml-10 mt-3 text-xl w-1/2">
          ???????????????????????????????????????????????????????
        </h1>
        <h1 class="ml-10 mt-3 font-bold text-sm">???????????</h1>
      </div>
    </div>
    <div>
      <!-- Render items based on itemsToShow -->
      <div
        v-for="index in itemsToShow"
        :key="index"
        class="flex ml-32 h-30 mt-12"
      >
        <img class="w-64 h-40" />
        <div class="mt-5">
          <h1 class="font-bold text-orange-500 ml-10">?????????</h1>
          <h1 class="font-extrabold text-black ml-10 mt-3 text-xl w-1/2">
            ????????????????????????????????????????
          </h1>
          <h1 class="ml-10 mt-3 font-bold text-sm">????????????????</h1>
        </div>
      </div>
      <!-- Render the "Load More" button if there are more items to show -->
      <div v-if="itemsToShow < totalItems" class="flex justify-center mt-5">
        <button
          @click="loadMore"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-32 rounded"
        >
          More Posts
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.gap-2 {
  gap: 0.5rem;
}

.grid-rows-2 {
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.mt-16 {
  margin-top: 4rem;
}

.ml-10 {
  margin-left: 2.5rem;
}

.bg-white {
  background-color: white;
}

.col-span-3 {
  grid-column: span 3;
}

.col-span-2 {
  grid-column: span 2;
}

.row-span-1 {
  grid-row: span 1;
}

/* Animation and Text */
.image-container {
  position: relative;
  overflow: hidden;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Text Style */
.image-text {
  text-align: center;
  font-size: 1.2rem;
}

/* Image Style */
.image-style {
  width: 100%;
  height: auto;
}
</style>
