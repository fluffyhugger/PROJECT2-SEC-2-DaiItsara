<style scoped>
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}

.bg-gray-200 {
  background-color: #f3f4f6;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>

<template>
  <div class="container mx-auto py-12 text-center">
    <h1 class="text-4xl font-bold mb-8">Contact Us - DAIITSARAPC</h1>
    <div class="bg-gray-200 rounded-lg shadow-md p-8 mx-auto max-w-lg">
      <p class="text-lg mb-4">Please feel free to contact us:</p>
      <div class="flex justify-center items-center space-x-2">
        <p class="text-lg">Email: contact@daiitsarapc.com</p>
      </div>
      <div class="flex justify-center items-center space-x-2 mt-4">
        <p class="text-lg">Phone: +66 123456789</p>
      </div>
      <div class="flex justify-center items-center space-x-4 mt-4">
        <img
          src="../assets/facebook.svg"
          alt="Facebook"
          class="w-6 h-6 hover:cursor-pointer"
        />
        <img
          src="../assets/instagram.svg"
          alt="Instagram"
          class="w-6 h-6 hover:cursor-pointer"
        />
      </div>
      <div class="flex justify-center items-center space-x-4 mt-4">
        <img src="../assets/map.png" alt="" style="width: 100%" />
      </div>
    </div>
  </div>
</template>
