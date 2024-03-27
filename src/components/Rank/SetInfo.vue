<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { TotalPrice } from './enum'

import update from '@/components/Rank/update/update.vue'
const router = useRouter()
const productId = router.currentRoute.value.params.id
let product = ref(null)
const isLoading = ref(true)
let component
const componentTypes = [
  'cpu',
  'ram',
  'gpu',
  'ssd',
  'hdd',
  'psu',
  'case',
  'monitor',
  'mainboard',
  'cooler',
]

onMounted(async () => {
  try {
    const result = await fetch(`http://localhost:5000/pc-build`)
    const responses = await result.json()
    product.value = responses.filter(
      (response) => response['builder-id'].toString() === productId
    )
    const prices = Object.keys(product.value[0])
      .filter((key) => componentTypes.includes(key)) // Filter out non-component keys
      .map((key) => product.value[0][key].price) // Map to the price of each component
    product.value[0]['total-price'] = TotalPrice(...prices) // Calculate total price
    isLoading.value = false
    product.value = product.value[0]
    console.log(product.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <update/>
  <div class="grid-container" v-if="!isLoading">
    <img :src="product['cpu'] ? product['cpu']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['ram'] ? product['ram']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['gpu'] ? product['gpu']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['ssd'] ? product['ssd']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['hdd'] ? product['hdd']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['psu'] ? product['psu']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['case'] ? product['case']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['monitor'] ? product['monitor']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['mainboard'] ? product['mainboard']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <img :src="product['cooler'] ? product['cooler']['image-url'] : ''" :alt="product.name"
      style="max-width: 200px; max-height: 200px" class="grid-item" />
    <div class="grid-info grid-item">
      <p>
        CPU name:{{ product['cpu'] ? product['cpu']['name'] : '-' }} price
        {{ product['cpu'] ? product['cpu']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        Ram name:{{ product['ram'] ? product['ram']['name'] : '-' }} price
        {{ product['ram'] ? product['ram']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        GPU name:{{ product['gpu'] ? product['gpu']['name'] : '-' }} price
        {{ product['gpu'] ? product['gpu']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        SSD name:{{ product['ssd'] ? product['ssd']['name'] : '-' }} price
        {{ product['ssd'] ? product['ssd']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        HDD name:{{ product['hdd'] ? product['hdd']['name'] : '-' }} price
        {{ product['hdd'] ? product['hdd']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        PSU name:{{ product['psu'] ? product['psu']['name'] : '-' }} price
        {{ product['psu'] ? product['psu']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        CASE name:{{ product['case'] ? product['case']['name'] : '-' }} price
        {{ product['case'] ? product['case']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        MONITOR name:{{ product['monitor'] ? product['monitor']['name'] : '-' }}
        price
        {{ product['monitor'] ? product['monitor']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        MAINBOARD name:{{
        product['mainboard'] ? product['mainboard']['name'] : '-'
        }}
        price
        {{ product['mainboard'] ? product['mainboard']['price'] : '-' }}
      </p>
      <br />
      <!-- เว้นบรรทัดด้วยแท็ก <br> -->
      <p>
        COOLER name:{{ product['cooler'] ? product['cooler']['name'] : '-' }}
        price
        {{ product['cooler'] ? product['cooler']['price'] : '-' }}
      </p>
      <br />
      <p>Total Price: {{ product['total-price'] }}</p>
    </div>
  </div>
</template>

<style scoped>
.grid-info {
  width: 300;
  grid-column: 4 / 5;
  /* Position on the 4th column */
  grid-row: 1 / span 3;
  /* Span 3 rows */
}

.grid-item {
  background-color: #f0f0f0;
  /* Add background color for grid items */
  padding: 20px;
  /* Add padding for spacing within grid items */
  border-radius: 5px;
  /* Add border radius for rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add box shadow for depth */
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  margin: 0 auto;
  /* Center the grid horizontally */
}
</style>
