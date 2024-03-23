<script setup>
import TopRank from "./TopRank.vue";
import RankTable from "./RankTable.vue"
import { ref } from 'vue';
let selectedOption = ref('overall');
</script>

<template>
  <div class="relative m-12 bg-transparent backdrop-blur-md shadow-lg p-5">
    <h1 class="text-3xl font-bold tracking-wide ">
      PC RANKING
    </h1>
    <TopRank  v-model:selectedOption="selectedOption"/>
    <RankTable :selectedOption="selectedOption" />
  </div>
</template>

<style scoped>

</style>
