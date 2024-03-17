<script setup>
import Header from "./views/Header.vue"
import Footer from "./views/Footer.vue";
</script>

<template>
  <div id="app" class="max-w-7xl mx-auto">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
