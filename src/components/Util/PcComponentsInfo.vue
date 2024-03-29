<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const calledComponent = ref({})
const isLoading = ref(true)
const route = useRoute()

const itemComponent = ref(null)

// Define an async function to use await inside the setup
const fetchData = async () => {
  console.log(route.params.type)
  try {
    const result = await fetch(
      `http://localhost:5000/${route.params.type}/?id=${route.params.ID}`
    )

    if (!result.ok) {
      throw new Error('Network response was not ok')
    }

    const response = await result.json()
    calledComponent.value = response
    itemComponent.value = JSON.parse(JSON.stringify(calledComponent.value[0]))
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching item data:', error)
    // Optionally, you can set an error message or handle the error in your UI
  }
}

onBeforeMount(async () => {
  await fetchData()
})
</script>

<template>
  <section class="bg-white w-full h-full m-6 p-4">
    <div class="container" v-if="isLoading">Loading ...</div>
    <div v-else-if="itemComponent" class="container items-center mx-auto">
      <div
        class="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0"
      >
        <h2
          class="text-3xl font-bold tracking-tight text-black xl:text-4xl mb-5"
        >
          {{ itemComponent.brand }} {{ itemComponent.series }}
          {{ itemComponent.model }}
        </h2>
      </div>
      <div class="flex justify-between">
        <img
          class="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-md"
          :src="itemComponent.picture"
          :alt="itemComponent.id"
        />
        <div class="flex flex-col ml-4">
          <div class="border-2 border-black rounded-md p-2 mb-2">
            <div class="font-extrabold text-black text-center">
              {{ itemComponent.brand }} {{ itemComponent.series }}
              {{ itemComponent.model }}
            </div>
            <div class="font-extrabold text-black text-center">
              {{ itemComponent.price }} Bath
            </div>
            <RouterLink :to="'/build'">
              <button
                class="border border-orange-600 rounded-md py-4 px-5 m-5 font-extrabold text-orange-600"
              >
                Choose for Spec maker
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <ul class="list-disc list-inside ml-5">
        <div v-if="route.params.type === 'cpu'">
          <li class="font-bold">{{ itemComponent.series }}</li>
          <li class="font-bold">{{ itemComponent.socket }}</li>
          <li class="font-bold">{{ itemComponent['chipset-support'] }}</li>
        </div>
        <div v-else-if="route.params.type === 'gpu'">
          <li class="font-bold">{{ itemComponent.series }}</li>
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
        </div>
        <div v-else-if="route.params.type === 'ram'">
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent.memorytype }}</li>
        </div>
        <div v-else-if="route.params.type === 'ssd'">
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent['form-factor'] }}</li>
        </div>
        <div v-else-if="route.params.type === 'hdd'">
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent['form-factor'] }}</li>
        </div>
        <div v-else-if="route.params.type === 'psu'">
          <li class="font-bold">{{ itemComponent.series }}</li>
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
        </div>
        <div v-else-if="route.params.type === 'case'">
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent['form-factor'] }}</li>
        </div>
        <div v-else-if="route.params.type === 'cooler'">
          <li class="font-bold">{{ itemComponent.series }}</li>
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
        </div>
        <div v-else-if="route.params.type === 'monitor'">
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent['display-size'] }}</li>
        </div>
        <div v-else-if="route.params.type === 'mainboard'">
          <li class="font-bold">{{ itemComponent.model }}</li>
          <li class="font-bold">{{ itemComponent.brand }}</li>
          <li class="font-bold">{{ itemComponent.chipset }}</li>
        </div>
      </ul>
    </div>
  </section>
  <section class="bg-white w-full h-full ml-6 p-8">
    <div class="text-2xl font-bold text-black">SPECIFICATIONS</div>
    <div v-if="itemComponent">
      <div v-if="route.params.type === 'cpu'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }} {{ itemComponent.series }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Series</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.series }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Socket</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.socket }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Chipset Support
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['chipset-support'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Cores</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.cores }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Threads</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.threads }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">L2 Cache</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['l2-cache'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">L3 Cache</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['l3-cache'] }}
          </div>
        </div>
      </div>
      <div v-else-if="route.params.type === 'ram'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Type</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.memorytype }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Size</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-size'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Speed</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-speed'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Case Latency</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['cas-latency'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Voltage</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.voltage }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Color</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.color }}
          </div>
        </div>
      </div>
      <div v-else-if="route.params.type === 'gpu'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">GPUChipset</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['gpu-chipset'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Size</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-size'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">GPU Name</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['gpu-name'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">GPU Clock</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['gpu-clock'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Boost Clock</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['boost-clock'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Architecture</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.architecture }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Techonology</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.technology }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Clock</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-clock'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Memory Interface
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-interface'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Type</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-type'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Bus Interface</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['bus-interface'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Multi Gpu Support
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['multi-gpu-supports'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">DirectX</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.directx }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">OpenGl</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.opengl }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Shader Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['shader-model'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">HDMI Ports</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['hdmi-ports'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Display Ports</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['display-ports'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Power Connector
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['power-connector'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Power Requirements
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['power-requirements'] }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'ssd'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Form Factor</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['form-factor'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Capacity</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.capacity }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Interface</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.interface }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Read Write</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['read/write'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Max4k</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['max4k-random'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Memory Modules
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-modules'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Endurance (TBW)
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['endurance (tbw)'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Technology</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.technology }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Controller</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.controller }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Protocol</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.protocol }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Led Lighting</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['led-lighting'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Warranty</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.warranty }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'hdd'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Form Factor</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['form-factor'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Capacity</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.capacity }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Rotational Speed
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['rotational-speed'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Buffer</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.buffer }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'psu'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.series }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Form Factor</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['form-factor'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Maximum Power</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['maximum-power'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Modular</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.modular }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Fans</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.fans }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Certificates</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.certificates }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Input Voltage</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['input-voltage'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Input Frequency
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['input-frequency'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Dimensions</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.dimensions }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">LED Lightin</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['led-lighting'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Main Power</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['main-power'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            PCIE Connector
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['pcie-connector'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            SATA Connector
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['sata-connector'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            MOLEX Connector
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['molex-connector'] }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'case'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Form Factor</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['form-factor'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Mainboard Support
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['mainboard-support'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Material</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.material }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Color</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.color }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Weight</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.weight }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Dimension</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.dimension }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">i/o-ports</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['i/o-ports'][0] }},
            {{ itemComponent['i/o-ports'][1] }},
            {{ itemComponent['i/o-ports'][2] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Fan Support</div>
          <div class="col-span-2 p-3 border-solid border-2">
            Front :
            {{ itemComponent['cooling-support']['fan-support']['front'] }}, Top
            : {{ itemComponent['cooling-support']['fan-support']['top'] }}, Rear
            : {{ itemComponent['cooling-support']['fan-support']['rear'] }},
            Side :
            {{ itemComponent['cooling-support']['fan-support']['side'] }},
            Bottom :
            {{ itemComponent['cooling-support']['fan-support']['bottom'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Radiator Support
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            Front :
            {{ itemComponent['cooling-support']['radiator-support']['front'] }},
            Top :
            {{ itemComponent['cooling-support']['radiator-support']['top'] }},
            Rear :
            {{ itemComponent['cooling-support']['radiator-support']['rear'] }},
            Side :
            {{ itemComponent['cooling-support']['radiator-support']['side'] }},
            Bottom :
            {{ itemComponent['cooling-support']['radiator-support']['bottom'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">LED Lighting</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['led-lighting'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Max Cpu Coolers Height
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['max-cpu-coolers-height'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Max Vga Length
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['max-vga-length'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Warranty</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.warranty }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'monitor'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }} {{ itemComponent.series }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Series</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.series }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Display Size</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['display-size'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Monitor Type</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['monitor-type'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Panel Type</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['panel-type'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Max Resolution
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['max-resolution'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Aspect Ratio</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['aspect-ratio'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Refresh Rate</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['refresh-rate'] }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'mainboard'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">chipset</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.chipset }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">CPU Socket</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['cpu-socket'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">CPU Support</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['cpu-support'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Slots</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-slots'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Memory Max</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-max'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Memory Support
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['memory-support'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Onboard Graphics
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['onboard-graphics'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Audio Chipset</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['audio-chipset'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Audio Channels
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['audio-channels'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Lan Chipset</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['lan-chipset'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Lan Speed</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['lan-speed'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Wireless Lan</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['wireless-lan'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Bluetooth</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['bluetooth'] }}
          </div>
        </div>
      </div>
      <div v-if="route.params.type === 'cooler'">
        <div class="mt-4 font-extrabold text-black">
          {{ itemComponent.brand }} {{ itemComponent.series }}
          {{ itemComponent.model }}
        </div>
        <div class="mt-4 font-extrabold text-black mb-4">Model</div>
        <div class="grid grid-cols-3">
          <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.brand }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Series</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.series }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.model }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Price</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent.price }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Form Factor</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['form-factor'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Socket Support Intel
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['socket-support']['intel'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Socket Support AMD
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['socket-support']['amd'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Radiator Dimension
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['radiator-dimension'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">
            Radiator Materials
          </div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['radiator-material'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">Fan Built In</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['fan-built-in'] }}
          </div>
          <div class="font-bold bg-slate-300 p-3 text-black">LED Lighting</div>
          <div class="col-span-2 p-3 border-solid border-2">
            {{ itemComponent['led-lighting'] }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
