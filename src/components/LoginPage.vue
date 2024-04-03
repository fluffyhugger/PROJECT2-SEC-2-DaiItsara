<template>
  <div class="login-container">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

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
        const response = await fetch('/data/db.json') // Adjust the path here
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
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  display: block;
  margin-bottom: 10px;
}

button {
  display: block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
