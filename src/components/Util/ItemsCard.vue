<script setup>
import {  ref, onMounted } from 'vue'

const props = defineProps({
  item: Object,
  listName: String,
})

const emit = defineEmits(["itemAddedToCart"])

const cart = ref(JSON.parse(localStorage.getItem("cart")) || {})

let builderName = ""

// Prompt user for builder name when component is mounted
onMounted(() => {
  builderName = localStorage.getItem("builderName") || ""
  if (!builderName) {
    builderName = window.prompt("Enter builder name:")
    if (!builderName) {
      alert("Builder name is required!")
    } else {
      localStorage.setItem("builderName", builderName)
    }
  }
})

const addToSpec = (listName, component) => {
  const builderId = Math.floor(Math.random() * 1000) + 1
  // Generate a random builder ID
  localStorage.setItem("builderId", builderId)
  let buildDate = new Date().toISOString()

  // Convert the Date object to a string in the specified format
  buildDate = buildDate.substring(0, 10) + "T" + buildDate.substring(11, 19)
  localStorage.setItem("buildDate", buildDate)

  // Extract the required fields from the component
  const { id, brand, series, model, picture, price } = component
  const newItem = {
    name: `${brand}${series ? ` ${series}` : ""} ${model}`,
    "image-url": picture,
    price: price,
  }

  // Add the component to the cart based on the listName
  switch (listName) {
    case "cpu":
      cart.value.cpu = newItem
      break
    case "ram":
      cart.value.ram = newItem
      break
    case "gpu":
      cart.value.gpu = newItem
      break
    case "ssd":
      cart.value.ssd = newItem
      break
    case "hdd":
      cart.value.hdd = newItem
      break
    case "psu":
      cart.value.psu = newItem
      break
    case "case":
      cart.value.case = newItem
      break
    case "monitor":
      cart.value.monitor = newItem
      break
    case "mainboard":
      cart.value.mainboard = newItem
      break
    case "cooler":
      cart.value.cooler = newItem
      break
    default:
      console.error("Invalid listName:", listName)
  }
  // Update localStorage with the updated cart data
  localStorage.setItem("cart", JSON.stringify(cart.value))
  emit("itemAddedToCart", true)
  alert("Component added to cart!")
}
</script>

<template>
  <div
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Image section! -->
    <div class="flex justify-center pt-3">
      <img class="rounded-t-lg" :src="item.picture" :alt="item.series" />
    </div>
    <div class="p-5">
      <RouterLink :to="`/build/${listName}/${item.id}`">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.brand }} {{ item.series }} {{ item.model }}
        </h5>
      </RouterLink>
      <span class="mr-4"> {{ item.price }} Baht</span>
      <button
        @click="addToSpec(listName, item)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Spec
      </button>
    </div>
  </div>
</template>

<style scoped></style>
