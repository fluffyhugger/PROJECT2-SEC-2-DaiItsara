<script setup>
import Header from "../Util/Header.vue";
import TopRank from "./TopRank.vue";
</script>

<template>
  <TopRank />
</template>

<style scoped>
/* Adjusting padding for different screen sizes */
@media (min-width: 768px) {
  .bg-gray-100 {
    padding: 24px;
  }
}
</style>
