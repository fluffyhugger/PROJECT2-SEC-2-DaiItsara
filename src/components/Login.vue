<script setup>
import router from '@/routes';
import { ref } from 'vue';
const password = ref('');
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-850">
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 w-96">
      <h1 class="text-2xl font-semibold mb-4 text-white">Login</h1>
      <div class="space-y-4">
        <div>
          <label for="username" class="block text-gray-300 font-medium">Username</label>
          <input
            id="username"
            type="text"
            class="border border-gray-700 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-teal-500 bg-gray-700 text-gray-300"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-300 font-medium">Password</label>
          <input
          v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="border border-gray-700 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-teal-500 bg-gray-700 text-gray-300"
          />
        </div>
        <div class="flex justify-between">
          <button
            class="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
          >
            Login
          </button>
          <button
            class="text-gray-300 py-2 px-4 rounded-md hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <router-link to="/">
                Continue as guest
              </router-link>            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  border-color: #46ddd9;
}
</style>
