<template>
    <div>
      <div class="flex items-center justify-between p-4 bg-teal-200">
        <h1 class="text-xl font-bold">Edit spec</h1>

      </div>
  
      <div class="p-4">
        <select
          v-model="selectedOption"
          @change="fetchData"
          name="specTypes"
          id="specTypes"
          class="block w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-400"
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
        <h2 class="text-xl font-bold mt-4 mb-4">
          Select your {{ selectedOption.toUpperCase() }}
        </h2>
  
        <select
          v-if="selectedOption === 'cpu' || selectedOption === 'mainboard'"
          v-model="selectedCPUBrand"
        >
          <h2 class="text-l font-bold mt-4 mb-4">CPU Socket</h2>
          <option value="">All</option>
          <option value="AMD">AMD AM</option>
          <option value="Intel">Intel LGA</option>
        </select>
  
        <!-- Loading indicator -->
        <div class="max-w-sm mx-auto my-4" v-if="isLoading">
          <span class="text-2xl font-bold text-indigo-700">Loading...</span>
        </div>
  
        <!-- Grid layout for displaying fetched items -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4" v-else>
          <!-- Items fetched from API -->
          <ProductList
            v-for="item in itemList"
            :key="item.id"
            :item="item"
            :listName="selectedOption"
          ></ProductList>
            <div>
                <label class="btn" >
                    Add Product
                </label>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from 'vue'
  import ProductList from './Util/ProductList.vue'

  
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
  // Define reactive variable to hold selected CPU brand
  const selectedCPUBrand = ref('')
  
  // Function to fetch data from API based on selected option
  const fetchData = async () => {
    isLoading.value = true
    const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
    const response = await result.json()
  
    if (selectedOption.value === 'mainboard') {
      let filteredMainboards = response
  
      // Filter mainboard items based on selected CPU brand
      if (selectedCPUBrand.value === 'AMD') {
        filteredMainboards = response.filter((mainboard) => {
          return mainboard['cpu-socket'].startsWith('AMD')
        })
      } else if (selectedCPUBrand.value === 'Intel') {
        filteredMainboards = response.filter((mainboard) => {
          return mainboard['cpu-socket'].startsWith('INTEL')
        })
      }
  
      itemList.value = filteredMainboards
    } else if (selectedOption.value === 'cpu') {
      // Filter CPU items based on selected CPU brand
      if (
        selectedCPUBrand.value === 'AMD' ||
        selectedCPUBrand.value === 'Intel'
      ) {
        itemList.value = response.filter((cpu) => {
          // Filter CPUs based on selected brand
          return cpu.brand.toLowerCase() === selectedCPUBrand.value.toLowerCase()
        })
      } else {
        itemList.value = response // Show all CPUs if brand is not selected or unknown
      }
    } else {
      itemList.value = response // For other options, show all items
    }
  
    isLoading.value = false
  }
  
  watch(selectedCPUBrand, () => {
    fetchData()
  })
  
  // Fetch initial data when component is mounted
  onMounted(async () => {
    await fetchData()
  })
  

  </script>
  
  <style scoped>
  .cart-icon-wrapper {
    background-color: #fdfb88;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Transition effect for smooth color change */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Box shadow for depth effect */
  }
  
  .cart-icon-wrapper:hover {
    background-color: #18ccae;
  }
  
  .cart-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 255, 221, 0.2));
  }
  
  .price {
    background-color: #46ddd9; /* Background color */
    color: white; /* Text color */
    padding: 4px 8px; /* Padding */
    border-radius: 4px; /* Border radius */
  }
  </style>
  