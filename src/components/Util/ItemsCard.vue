<script setup>
defineProps({
  cpu: Object,
})
</script>

<template>
  <div
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Image section! -->
    <div class="flex justify-center pt-3">
      <img class="rounded-t-lg" :src="cpu.Picture" :alt="cpu.Series" />
    </div>
    <div class="p-5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ cpu.ID }} {{ cpu.Cores }} {{ cpu.Threads }}
      </h5>
      <span class="mr-4"> {{ cpu.Price }} Baht</span>
    </div>
  </div>
</template>

<style scoped></style>
