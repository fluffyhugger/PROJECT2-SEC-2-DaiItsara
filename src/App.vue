<script setup>
import Header from './components/Util/Header.vue'
import Footer from './components/Util/Footer.vue'
</script>

<template>
  <div id="app">
    <Header></Header>
    <div>
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
