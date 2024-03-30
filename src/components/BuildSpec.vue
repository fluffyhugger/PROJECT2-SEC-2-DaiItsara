<script setup>
import { onMounted, ref } from 'vue'
import ItemsCard from './Util/ItemsCard.vue'
import CartPopup from './Util/CartPopup.vue'

// Define reactive variables to hold builder information and cart data from localStorage
let builderId = localStorage.getItem('builderId') || ''
let builderName = localStorage.getItem('builderName') || ''
let buildDate = localStorage.getItem('buildDate') || ''
let cart = JSON.parse(localStorage.getItem('cart')) || {}

// Define reactive variable to hold itemList data fetched from API
const itemList = ref([])
// Define reactive variable to track loading state
const isLoading = ref(true)
// Define reactive variable to track selected option
const selectedOption = ref('cpu')
// Define reactive variable to control visibility of cart items
const showCartPopup = ref(false)

// Function to fetch data from API based on selected option
const fetchData = async () => {
  isLoading.value = true
  const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
  const response = await result.json()
  itemList.value = response
  isLoading.value = false
}


onMounted(async () => {
  await fetchData() // Fetch initial data when component is mounted
})

// Sync Data In localStorage by not need to refresh
const syncCartData = () => {
  cart = JSON.parse(localStorage.getItem('cart')) || {}
  builderName = localStorage.getItem('builderName') || '' // Update builderName from local storage
}
// Call syncCartData when the component is mounted


const toggleShowCartPopup = () => {
  showCartPopup.value = !showCartPopup.value
  syncCartData()
}
</script>

<template>
  <h1>Build spec</h1>
  <h1>{{ selectedOption }}</h1>
  <select
    v-model="selectedOption"
    @change="fetchData"
    name="specTypes"
    id="specTypes"
  >
    <option value="cpu">CPU</option>
    <option value="ram">Memory</option>
    <option value="gpu">Graphic Card</option>
    <option value="ssd">Solid State Drive</option>
    <option value="hdd">Hard Disk</option>
    <option value="psu">Power Supply</option>
    <option value="case">Case</option>
    <option value="monitor">Monitor</option>
    <option value="mainboard">Mainboard</option>
    <option value="cooler">Cooler</option>
  </select>
  <!-- Loading indicator -->
  <div class="max-w-sm mx-auto" v-if="isLoading">
    <span class="text-2xl font-bold text-indigo-700">Loading...</span>
  </div>
  <!-- Grid layout for displaying fetched items -->
  <div class="grid grid-cols-3 gap-4" v-else>
    <!-- Items fetched from API -->
    <ItemsCard
      v-for="item in itemList"
      :key="item.id"
      :item="item"
      :listName="selectedOption"
    ></ItemsCard>
    <!-- Button to show cart pop-up -->
    <button
      @click="toggleShowCartPopup"
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
    >
      Show Cart
    </button>

    <!-- Cart pop-up using teleport -->
    <teleport to="body">
      <CartPopup
        v-if="showCartPopup"
        :cart="cart"
        :builderName="builderName"
        @close="showCartPopup = false"
      />
    </teleport>
    <!-- Button to confirm build spec ****************MOVE TO CartPopup**********-->
    <!-- <button
      @click="postData"
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
    >
      Confirm Build Spec
    </button>-->
  </div>
</template>

<style scoped></style>
