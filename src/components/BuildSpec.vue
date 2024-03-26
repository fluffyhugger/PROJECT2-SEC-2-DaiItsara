<script setup>
import { onMounted, ref } from 'vue'
import ItemsCard from './Util/ItemsCard.vue'

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

// Function to fetch data from API based on selected option
const fetchData = async () => {
  isLoading.value = true
  const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
  const response = await result.json()
  itemList.value = response
  isLoading.value = false
}

// Function to post data to JSON server
const postData = async () => {
  const data = {
    'builder-id': builderId,
    'builder-name': builderName,
    'build-date': buildDate,
    ...cart,
  }
  try {
    const response = await fetch('http://localhost:5000/pc-build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      console.log('Data posted successfully')
      // Optionally, you can clear localStorage after posting the data
      localStorage.removeItem('builderId')
      localStorage.removeItem('builderName')
      localStorage.removeItem('buildDate')
      localStorage.removeItem('cart')
    } else {
      console.error('Failed to post data')
    }
  } catch (error) {
    console.error('Error posting data:', error)
  }
}

onMounted(async () => {
  await fetchData() // Fetch initial data when component is mounted
})
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
  <div class="max-w-sm mx-auto" v-if="isLoading">
    <span class="text-2xl font-bold text-indigo-700">Loading...</span>
  </div>
  <div class="grid grid-cols-3 gap-4" v-else>
    <ItemsCard
      v-for="item in itemList"
      :key="item.id"
      :item="item"
      :listName="selectedOption"
    ></ItemsCard>
    <!-- Conditional rendering for CPU -->
    {{ builderId }}
    {{ builderName }}
    {{ buildDate }}
    <h1 v-if="cart.cpu">CPU: {{ cart.cpu.name }}</h1>
    <!-- Conditional rendering for RAM -->
    <h1 v-if="cart.ram">RAM: {{ cart.ram.name }}</h1>
    <!-- Conditional rendering for SSD -->
    <h1 v-if="cart.ssd">SSD: {{ cart.ssd.name }}</h1>
    <!-- Conditional rendering for HDD -->
    <h1 v-if="cart.hdd">HDD: {{ cart.hdd.name }}</h1>
    <!-- Conditional rendering for PSU -->
    <h1 v-if="cart.psu">PSU: {{ cart.psu.name }}</h1>
    <!-- Conditional rendering for Monitor -->
    <h1 v-if="cart.monitor">Monitor: {{ cart.monitor.name }}</h1>
    <!-- Conditional rendering for Mainboard -->
    <h1 v-if="cart.mainboard">Mainboard: {{ cart.mainboard.name }}</h1>
    <!-- Conditional rendering for Cooler -->
    <h1 v-if="cart.cooler">Cooler: {{ cart.cooler.name }}</h1>

    <!-- Button to confirm build spec -->
    <button
      @click="postData"
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded"
    >
      Confirm Build Spec
    </button>
  </div>
</template>

<style scoped></style>
