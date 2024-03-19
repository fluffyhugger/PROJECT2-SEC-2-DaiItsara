<script setup>
import { onMounted, ref } from "vue"
import ItemsCard from "./Util/ItemsCard.vue"
const cpuList = ref([])
const isLoading = ref(true)
onMounted(async () => {
  const result = await fetch("http://localhost:5000/cpu")
  const response = await result.json()
  cpuList.value = response
  isLoading.value = false
})
</script>
<template>
  <h1>Build spec</h1>
  <h1>CPU</h1>
  <div class="max-w-sm mx-auto" v-if="isLoading">
    <span class="text-2xl font-bold text-indigo-700">Loading...</span>
  </div>
  <div class="grid grid-cols-3 gap-4" v-else>
    <ItemsCard v-for="cpu in cpuList" :key="cpu.ID" :cpu="cpu"></ItemsCard>
  </div>
</template>

<style scoped></style>
