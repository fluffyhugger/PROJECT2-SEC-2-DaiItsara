<script setup>
defineProps({
  item: Object,
  listName: String,
})
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
    </div>
  </div>
</template>

<style scoped></style>
