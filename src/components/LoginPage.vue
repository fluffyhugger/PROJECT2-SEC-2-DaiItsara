<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('/data/db.json') 
        const data = await response.json()

        const admin = data.admins.find(
          (admin) => admin.username === this.username
        )
        if (admin && admin.password === this.password) {
          localStorage.setItem('isAdminAuthenticated', this.username)
          this.$router.push('/deleting')
        } else {
          alert('Invalid username or password')
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
        alert('An error occurred. Please try again later.')
      }
    }
  },
}
</script>
<template>
  <div class="flex justify-center items-center h-screen bg-gray-900">
    <div class="bg-gray-800 shadow-lg rounded-lg p-6 w-96">
      <h1 class="text-2xl font-semibold mb-4 text-white">Login</h1>
      <div class="space-y-4">
        <div>
          <input v-model="username" type="text" placeholder="Username" class="border border-gray-700 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-teal-500 bg-gray-700 text-gray-300" />
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" class="border border-gray-700 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-teal-500 bg-gray-700 text-gray-300" />
        </div>
        <div class="flex justify-between">
          <button @click="login" class="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600">Login</button>
          
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
