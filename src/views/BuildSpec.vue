<script setup>
import {ref, onMounted} from 'vue';
import BuildSpecUI from '../components/BuildSpecUI.vue'


const cpuList = ref([])
const ramList = ref([])
const gpuList = ref([])
const selectedOption = ref('cpu')

onMounted(()=>{
fetch('http://localhost:3000/cpu')
.then((response)=> response.json())
.then(apiCpu =>{
    cpuList.value = apiCpu
  })
})
onMounted(()=>{
fetch('http://localhost:3000/ram')
.then((response)=> response.json())
.then(apiRam =>{
    ramList.value = apiRam
  })
})
onMounted(()=>{
fetch('http://localhost:3000/gpu')
.then((response)=> response.json())
.then(apiGpu =>{
    gpuList.value = apiGpu
  })
})

</script>
<template>
  <div>
  <select v-model="selectedOption" name="specTypes" id="specTypes">
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
  <div class="grid grid-col-3 gap-4">
    <BuildSpecUI v-if="selectedOption === 'cpu'" v-for="cpu in cpuList" :key="cpu.id" :cpu="cpu" />
    <BuildSpecUI v-if="selectedOption === 'ram'" v-for="ram in ramList" :key="ram.id" :ram="ram" />
    <BuildSpecUI v-if="selectedOption === 'gpu'" v-for="gpu in gpuList" :key="gpu.id" :gpu="gpu" />
  </div>
  </div>
</template>

<style scoped></style>
