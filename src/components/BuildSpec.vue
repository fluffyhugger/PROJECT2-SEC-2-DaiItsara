<script setup>
import { onMounted, ref } from "vue"
import ItemsCard from "./Util/ItemsCard.vue"
const cpuList = ref([])
onMounted(() => {
  fetch("http://localhost:5000/cpu")
    .then((response) => response.json())
    .then((apiCPU) => {
      cpuList.value = apiCPU
    })
})
</script>
<template>
  <h1>Build spec</h1>
  <h1>CPU</h1>
  <div class="grid grid-cols-3 gap-4">
    <ItemsCard v-for="cpu in cpuList" :key="cpu.ID" :cpu="cpu"></ItemsCard>
  </div>
</template>

<style scoped></style>
