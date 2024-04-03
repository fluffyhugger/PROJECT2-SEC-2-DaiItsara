<script setup>
import ArticleNew from './articles/ArticleNew.vue';
import Login from './Login.vue';
import { ref } from 'vue';

</script>
<template>
  <div class="theme font-semibold text-3xl">Welcome To DAIITSARA PC</div>
    <button class="btn hover:text-teal-500 bg-teal-500 text-blue-950 font-semibold text-lg">
      <router-link to="/login">
        Login
      </router-link>
    </button>
  <div>
    
  </div>

</template>

<style scoped>
.theme{
  background-color: #34495e;
  color: #ffffff;
  padding: 10px;
  text-align: center;
}
</style>
