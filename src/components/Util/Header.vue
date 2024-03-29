<!-- <template>
  <header class="bg-gradient-to-b from-black to-neon-blue text-white py-4 shadow-header">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/" class="hover:text-neon-blue">
          <h1 class="text-3xl font-bold ml-2 hover:text-neon-blue transition-colors">
            DAIITSARA PC
          </h1>
        </router-link>
      </div>
      <nav class="space-x-6">
        <router-link to="/build" class="hover:text-neon-blue">PC Build</router-link>
        <router-link to="/ranking" class="hover:text-neon-blue">Top PC Ranking</router-link>
        <details class="dropdown">
          <summary class="hover:text-neon-blue">Articles</summary>
          <ul class="p-2 dropdown-content">
            <li v-for="articleType in articleTypes" :key="articleType">
              <router-link :to="`/${articleType}`" class="hover:text-neon-blue">{{ articleType }}</router-link>
            </li>
          </ul>
        </details>
        <router-link to="/contact"
          class="px-4 py-2 rounded-full bg-neon-blue hover:bg-blue-600 text-white font-semibold hover:shadow-lg transition duration-300">Contact
          Us</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
const articleTypes = ["news", "promotion", "howto", "tipstrick"];
</script>

<style scoped>
/* Header Styles */
header {
  background: linear-gradient(to right, #1d1d1d, #2272ff);
  /* Gradient background */
}

/* Logo Styles */
h1 {
  font-size: 2.5rem;
  /* Larger font size */
}

h1:hover {
  color: #2272ff;
  /* Neon blue color on hover */
}

/* Dropdown Styles */
.dropdown-content {
  background-color: #1d1d1d;
  /* Black background */
  border: 1px solid #1d1d1d;
  /* Black border */
  padding: 5px;
  position: absolute;
  top: 100%;
  /* Position the dropdown below the summary */
  left: 0;
  z-index: 10;
  /* Ensure the dropdown is above other elements */
  opacity: 0;
  /* Initially hide the dropdown */
  transition: opacity 0.3s ease;
  /* Smooth opacity transition */
}

.dropdown.open .dropdown-content {
  opacity: 1;
  /* Make the dropdown visible when open */
}

.dropdown-content li {
  list-style-type: none;
}

.dropdown-content li a {
  display: block;
  padding: 5px;
  transition: color 0.3s ease;
  /* Smooth color transition */
}

.dropdown-content li a:hover {
  color: #2272ff;
  /* Neon blue color on hover */
}

/* Neon Blue Color */
.text-neon-blue {
  color: #2272ff;
}

.hover\:text-neon-blue:hover {
  color: #2272ff;
}

.bg-neon-blue {
  background-color: #2272ff;
}

.hover\:bg-neon-blue:hover {
  background-color: #2272ff;
}

/* Header Shadow */
.shadow-header {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Apply drop shadow */
}
</style> -->
<script setup>
import { RouterLink } from "vue-router";
const articleTypes = ["news", "promotion", "howto", "tipstrick"];
</script>

<template>
  <div class="navbar p-5">
    <div class="navbar-start">
      <router-link to="/" class="text-xl font-semibold font-sans"
        :class="{ 'text-neon-blue': $route.path === '/' }">DAIITSARA PC</router-link>
      <img src="" alt="" sizes="" srcset="">
    </div>
    <div class="navbar-center hidden lg:flex ">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/build" class="hover:text-neon-blue"
            :class="{ 'text-neon-blue font-bold': $route.path === '/build' }">BUILD</router-link></li>
        <li><router-link to="/" class="hover:text-neon-blue"
            :class="{ 'text-neon-blue font-bold': $route.path === '/' }">HOME</router-link></li>
        <li class="relative">
          <details>
            <summary class="hover:text-neon-blue">Article</summary>
            <ul class="p-2 dropdown-content">
              <li v-for="articleType in articleTypes" :key="articleType">
                <router-link :to="`/${articleType}`" class="hover:text-neon-blue"
                  :class="{ 'text-neon-blue font-bold': $route.path.includes(articleType) }">{{ articleType
                  }}</router-link>
              </li>
            </ul>
          </details>
        </li>
        <li><router-link to="/ranking" class="hover:text-neon-blue"
            :class="{ 'text-neon-blue font-bold': $route.path === '/ranking' }">RANKING</router-link></li>
      </ul>
    </div>
    <div class="navbar-end">
      <router-link to="/contact" class="btn hover:bg-neon-blue"
        :class="{ 'bg-neon-blue text-white': $route.path === '/contact', 'hover:bg-white text-neon-blue': $route.path !== '/contact', 'text-neon-blue font-bold': $route.path === '/contact' }">CONTACT</router-link>
    </div>
  </div>
</template>

<style scoped>
.dropdown-content {
  z-index: 10;
}

.relative {
  z-index: 5;
}

.text-neon-blue {
  color: #304456;
  /* Light gray */
}

.hover:text-neon-blue:hover {
  color: #46ddd9;
  /* Neon blue on hover */
}

.btn {
  background-color: #46ddd9;
  /* Neon blue */
  color: #304456;
  /* Light gray */
}

.btn:hover {
  background-color: #304456;
  /* Light gray on hover */
  color: #46ddd9;
  /* Neon blue text on hover */
}
</style>
