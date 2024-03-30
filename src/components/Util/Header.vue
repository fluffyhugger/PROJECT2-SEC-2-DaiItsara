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
            <summary class="hover:text-neon-blue text-neon-blue">ARTICLE</summary>
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
.menu li a {
  color: #a0aec0;
}

.menu li a:hover {
  color: #46ddd9;
}
.dropdown-content {
  z-index: 10;
}
.relative {
  z-index: 5;
}
.btn {
  background-color: #46ddd9;
  color: #304456;
}
.btn:hover {
  background-color: #304456;
  color: #46ddd9;
}
summary.text-neon-blue {
  color: #46ddd9;
}
</style>
