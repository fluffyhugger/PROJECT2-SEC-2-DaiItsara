<script setup>

</script>

<template>
  <div class="w-1/2 p-20 bg-slate-500 shadow-lg space-y-2">
    <h1 class="font-semibold text-xl text-white">Login</h1>
    <div class="flex flex-col space-y-2">
      <div>
        <label class="text-white">Username: </label>
        <input
          class="border border-gray-200 rounded-md px-3 py-0.5 outline-none"
          type="text"
        />
      </div>
      <div>
        <label class="text-white">Password: </label>
        <input
          class="border border-gray-200 rounded-md px-3 py-0.5 outline-none"
          type="text"
        />
      </div>
      <div class="flex space-x-2">
        <button
          class="bg-blue-950  rounded-md hover:bg-teal-500 hover:text-blue-950 px-2 py-0.5 text-teal-500"
        >
          OK
        </button>
        <button
          class="bg-blue-950  rounded-md hover:bg-teal-500 hover:text-blue-950 px-2 py-0.5 text-teal-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
