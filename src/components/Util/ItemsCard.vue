<script setup>
import { defineProps } from "vue"

const props = defineProps({
  item: Object,
  listName: String,
})

const addToSpec = async (listName, component) => {
  const result = await fetch("http://localhost:5000/pc-build")
  let response = await result.json()

  // Prompt user for builder name
  const builderName = window.prompt("Enter builder name:")
  if (!builderName) {
    alert("Builder name is required!")
    return
  }

  // Generate a random builder ID
  const builderId = Math.floor(Math.random() * 1000) + 1

  // Extract the required fields from the component
  const { brand, series, model, picture, price } = component

  // Add the component as a new object to the pc-build array
  const newBuild = {
    "builder-id": builderId,
    "builder-name": builderName,
    "build-date": new Date().toISOString(),
    [listName]: {
      name: `${brand} ${series} ${model}`,
      "image-url": picture,
      price: price,
    },
  }

  response.push(newBuild)

  await fetch("http://localhost:5000/pc-build", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "pc-build": response }),
  })

  alert(`${brand} ${series} ${model} added to spec!`)
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
