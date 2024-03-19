<script setup>
import Header from "../Util/Header.vue";
import TopRank from "./TopRank.vue";
</script>

<template>
  <div class="bg-gray-100 dark:bg-slate-800 p-4 md:p-12">
    <h1 class="text-3xl md:text-3xl font-bold  text-gray-900 dark:text-white mb-8">Ranking Spec</h1>
    <TopRank />
  </div>
</template>

<style scoped>
/* Adjusting padding for different screen sizes */
@media (min-width: 768px) {
  .bg-gray-100 {
    padding: 24px;
  }
}
</style>
