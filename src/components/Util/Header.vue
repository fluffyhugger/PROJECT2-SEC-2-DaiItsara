<template>
  <header>
    <div class="flex">
      <RouterLink to="/">
        <h1 class="text-3xl font-bold :hover cursor-pointer">PC BUILDER</h1>
      </RouterLink>
      <details class="dropdown ml-10 pt-2">
        <summary class="m-1 font-bold">Custom Spec</summary>
        <ul
          class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li><RouterLink to="/build">Modified Your PC</RouterLink></li>
          <li><RouterLink to="/ranking">Top PC Ranking </RouterLink></li>
        </ul>
      </details>
      <details class="dropdown ml-10 pt-2">
        <summary class="m-1 font-bold">Articles</summary>
        <ul
          class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li><RouterLink to="/news">News</RouterLink></li>
          <li><RouterLink to="/promotion">Promotion</RouterLink></li>
          <li><RouterLink to="/howto">How to</RouterLink></li>
          <li><RouterLink to="/tiptrick">Tips & Tricks</RouterLink></li>
        </ul>
      </details>
      <div class="ml-10 pt-3">
        <RouterLink to="/contact" class="m-1 font-bold :hover cursor-pointer"
          >Contacts Us</RouterLink
        >
      </div>
      <!-- <div
        v-if="userLoggedIn"
        class="mt-3 ml-auto flex items-center h-5 hover:cursor-pointer"
        @click="logout"
      >
        <img src="../assets/door.png" alt="" class="size-10 mb-2" />
      </div>
      <div v-else class="mt-3 ml-auto">
        <RouterLink class="hover:cursor-pointer" to="/login">Login</RouterLink>
      </div> -->
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>

<style scoped>
header {
  background-color: #ffff;
  color: #727171;
  padding: 10px;
  text-align: center;
}
</style>
