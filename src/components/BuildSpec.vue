<script setup>
import { onMounted, ref, watch } from 'vue'
import ItemsCard from './Util/ItemsCard.vue'
import CartPopup from './Util/CartPopup.vue'

let builderId = localStorage.getItem('builderId') || ''
let builderName = localStorage.getItem('builderName') || ''
let buildDate = localStorage.getItem('buildDate') || ''
let cart = JSON.parse(localStorage.getItem('cart')) || {}

const itemList = ref([])
const isLoading = ref(true)
const selectedOption = ref('cpu')
const showCartPopup = ref(false)
const selectedCPUBrand = ref('')

const fetchData = async () => {
  isLoading.value = true
  const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
  const response = await result.json()

  if (selectedOption.value === 'mainboard') {
    let filteredMainboards = response

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
    if (
      selectedCPUBrand.value === 'AMD' ||
      selectedCPUBrand.value === 'Intel'
    ) {
      itemList.value = response.filter((cpu) => {
        return cpu.brand.toLowerCase() === selectedCPUBrand.value.toLowerCase()
      })
    } else {
      itemList.value = response
    }
  } else {
    itemList.value = response
  }

  isLoading.value = false
}

watch(selectedCPUBrand, () => {
  fetchData()
})

onMounted(async () => {
  await fetchData()
})

const syncCartData = () => {
  cart = JSON.parse(localStorage.getItem('cart')) || {}
  builderName = localStorage.getItem('builderName') || ''
}

const toggleShowCartPopup = () => {
  showCartPopup.value = !showCartPopup.value
  syncCartData()
}

const updateCart = (updatedCart) => {
  showCartPopup.value = !showCartPopup.value
}
</script>
<template>
  <div>
    <div class="flex items-center justify-between p-4 bg-teal-200">
      <h1 class="text-xl font-bold">Build spec</h1>

      <div class="relative">
        <div class="cart-icon-wrapper" @click="toggleShowCartPopup">
          <img
            src="../assets/shopping-cart.png"
            alt="Shopping Cart"
            class="cursor-pointer cart-icon"
            :style="{ width: '45px', height: '45px' }"
          />
        </div>
        <teleport to="body">
          <CartPopup
            v-if="showCartPopup"
            :cart="cart"
            :builderName="builderName"
            @close="showCartPopup = false"
            @update-cart="updateCart"
          />
        </teleport>
      </div>
    </div>

    <div class="p-4">
      <h2 class="text-xl font-bold mt-4 mb-4">
        Select your {{ selectedOption.toUpperCase() }}
      </h2>
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

      <h4
        v-if="selectedOption === 'cpu' || selectedOption === 'mainboard'"
        class="text-l font-bold mt-4 mb-4"
      >
        Select your {{ selectedOption.toUpperCase() }} Socket
      </h4>
      <select
        v-if="selectedOption === 'cpu' || selectedOption === 'mainboard'"
        v-model="selectedCPUBrand"
        class="block w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-400"
      >
        <option value="">All</option>
        <option value="AMD">AMD AM</option>
        <option value="Intel">Intel LGA</option>
      </select>

      <br />
      <div class="max-w-sm mx-auto my-4" v-if="isLoading">
        <span class="text-2xl font-bold text-indigo-700">Loading...</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" v-else>
        <ItemsCard
          v-for="item in itemList"
          :key="item.id"
          :item="item"
          :listName="selectedOption"
          class="w-full"
        ></ItemsCard>
      </div>
    </div>
  </div>
</template>

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
  transition: background-color 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-icon-wrapper:hover {
  background-color: #18ccae;
}

.cart-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 255, 221, 0.2));
}

.price {
  background-color: #46ddd9;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

select {
  appearance: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:focus {
  outline: none;
  border-color: #46ddd9;
}

option {
  padding: 0.5rem 1rem;
}

.max-w-sm {
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.text-indigo-700 {
  color: #4f46e5;
}
</style>
