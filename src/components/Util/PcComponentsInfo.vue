<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const calledComponent = ref({})
const isLoading = ref(true)
const route = useRoute()

const CpuComponent = ref(null)

// Define an async function to use await inside the setup
const fetchData = async () => {
  try {
    const result = await fetch(
      `http://localhost:5000/cpu/?ID=${route.params.ID}`
    )

    if (!result.ok) {
      throw new Error('Network response was not ok')
    }

    const response = await result.json()
    calledComponent.value = response
    CpuComponent.value = JSON.parse(JSON.stringify(calledComponent.value[0]))
    console.log(CpuComponent.value.ID)
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching CPU data:', error)
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
    <div v-else class="container items-center mx-auto">
      <div
        class="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0"
      >
        <h2
          class="text-3xl font-bold tracking-tight text-black xl:text-4xl mb-5"
        >
          {{ CpuComponent.Brand }} {{ CpuComponent.Series }}
          {{ CpuComponent.Model }}
        </h2>
      </div>
      <div class="flex justify-between">
        <img
          class="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-md"
          :src="CpuComponent.Picture"
          :alt="CpuComponent.ID"
        />
        <div class="flex flex-col ml-4">
          <!-- Removed justify-between -->
          <div class="border-2 border-black rounded-md p-2 mb-2">
            <!-- Added border, rounded, padding, and margin bottom -->
            <div class="font-extrabold text-black text-center">
              {{ CpuComponent.Brand }} {{ CpuComponent.Series }}
              {{ CpuComponent.Model }}
            </div>
            <div class="font-extrabold text-black text-center">
              {{ CpuComponent.Price }} Bath
            </div>
            <RouterLink :to="'/build'">
              <button
                class="border border-orange-600 rounded-md py-4 px-5 m-5 font-extrabold text-orange-600"
              >
                <!-- Added button styling -->
                Choose for Spec maker
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <ul class="list-disc list-inside ml-5">
        <li class="font-bold">{{ CpuComponent.Series }}</li>
        <li class="font-bold">{{ CpuComponent.Socket }}</li>
        <li class="font-bold">{{ CpuComponent.ChipsetSupport }}</li>
      </ul>
    </div>
  </section>
  <section class="bg-white w-full h-full ml-6 p-8">
    <div class="text-2xl font-bold text-black">SPECIFICATIONS</div>
    <div class="mt-4 font-extrabold text-black">
      {{ CpuComponent.Brand }} {{ CpuComponent.Series }}
      {{ CpuComponent.Model }}
    </div>
    <div class="mt-4 font-extrabold text-black mb-4">Model</div>
    <div class="grid grid-cols-3">
      <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Brand }}
      </div>
      <div class="font-bold bg-slate-300 p-3 text-black">Series</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Series }}
      </div>
      <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Model }}
      </div>
    </div>
    <!-- <div class="text-2xl font-bold text-black mt-4 mb-4">SPECIFICATIONS</div>
    <div class="grid grid-cols-3">
      <div class="font-bold bg-slate-300 p-3 text-black">Brand</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Brand }}
      </div>
      <div class="font-bold bg-slate-300 p-3 text-black">Series</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Series }}
      </div>
      <div class="font-bold bg-slate-300 p-3 text-black">Model</div>
      <div class="col-span-2 p-3 border-solid border-2">
        {{ CpuComponent.Model }}
      </div>
    </div> -->
  </section>
</template>

<style scoped></style>
