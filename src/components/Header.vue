<template>
  <header>
    <div class="flex">
      <h1 class="text-3xl font-bold">PC BUILDER</h1>
      <details class="dropdown ml-10 pt-2">
        <summary class="m-1">Custom Spec</summary>
        <ul
          class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li><a href="">Modified Your PC</a></li>
          <li><a href="">Top PC Ranking </a></li>
        </ul>
      </details>
      <details class="dropdown ml-10 pt-2">
        <summary class="m-1">Articles</summary>
        <ul
          class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li><a>News</a></li>
          <li><a>Promotion</a></li>
          <li><a>How to</a></li>
          <li><a>Tips &</a></li>
        </ul>
      </details>
      <div
        v-if="userLoggedIn"
        class="mt-3 ml-auto flex items-center h-5 hover:cursor-pointer"
        @click="logout"
      >
        <img src="../assets/door.png" alt="" class="size-10 mb-2" />
      </div>
      <div v-else class="mt-3 ml-auto">
        <a class="hover:cursor-pointer" to="/login">Login</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

let userLoggedIn = ref(false)

const logout = () => {
  userLoggedIn.value = false
}
</script>

<style scoped>
/* Header styles */
header {
  background-color: #ffff;
  color: #727171;
  padding: 10px;
  text-align: center;
}
</style>
