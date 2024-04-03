<template>
  <div class="theme font-semibold text-3xl">Welcome To DAIITSARA PC</div>
  <br>
  <div class="text-5xl font-semibold text-white">
    Let's Build PC!!!
  </div>
  <div class="flex justify-center items-center h-screen">
  
    <router-link to="/build">
    <button  class="btn btn-large hover:text-teal-500 bg-teal-500 text-blue-950 font-semibold text-lg flex justify-center items-center transition-transform transform hover:translate-x-2 hover:translate-y-2">
        Start Build!
    </button>
  </router-link>
  </div>
</template>

<style scoped>
.theme {
  background-color: #34495e;
  color: #ffffff;
  padding: 10px;
  text-align: center;
}
.btn-large {
  padding: 50px 30px ; /* Increase padding for larger button */
  font-size: 52px; /* Increase font size for larger button */
}
</style>