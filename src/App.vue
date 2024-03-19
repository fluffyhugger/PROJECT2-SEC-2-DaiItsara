<script setup>
import Header from "./components/Util/Header.vue"
// import Footer from "./components/Util/Footer.vue"
</script>

<template>
  <div id="app">
    <Header />
    <div class="max-w-7xl mx-auto">
      <RouterView />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<style scoped></style>
