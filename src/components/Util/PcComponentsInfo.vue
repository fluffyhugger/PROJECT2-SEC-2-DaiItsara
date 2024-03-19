<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const calledComponent = ref({})
const isLoading = ref(true)
const route = useRoute()

onMounted(async () => {
  const result = await fetch(`http://localhost:5000/cpu/${route.params.ID}`)
  const response = await result.json()
  // console.log(response)
  calledComponent.value = response
  console.log(calledComponent.value)
  isLoading.value = false
})
</script>

<template>
  <h1>{{ $route.params.ID }}Components Info</h1>
  <section class="bg-white dark:bg-gray-900 m-6 p-4">
    <div class="container" v-if="isLoading">Loading ...</div>
    <div
      v-else
      class="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row"
    >
      <h3>params : {{ $route.params.ID }}</h3>
      <div class="flex justify-center xl:w-1/2">
        <img
          class="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-md"
          :src="calledComponent.Picture"
          :alt="calledComponent.ID"
        />
      </div>

      <div
        class="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0"
      >
        <h2
          class="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl dark:text-white"
        >
          {{ calledComponent.Brand }} {{ calledComponent.Series }}
          {{ calledComponent.Model }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
