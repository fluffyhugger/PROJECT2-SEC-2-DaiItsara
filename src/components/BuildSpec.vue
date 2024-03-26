<script setup>
import { onMounted, ref } from "vue"
import ItemsCard from "./Util/ItemsCard.vue"
const itemList = ref([])
const isLoading = ref(true)
const selectedOption = ref("cpu")

onMounted(async () => {
  await fetchData()
})

const fetchData = async () => {
  isLoading.value = true
  const result = await fetch(`http://localhost:5000/${selectedOption.value}`)
  const response = await result.json()
  itemList.value = response
  isLoading.value = false
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
    <div>
      <h1>Your List:</h1>
      <button
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Spec
      </button>
    </div>
  </div>
</template>

<style scoped></style>
