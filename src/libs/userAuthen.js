export default {
  currentUser: null,
  initialize() {
    this.currentUser = { username: 'guest', role: 'guest' }
  },
  login(username, password) {
    if (username === 'admin' && password === 'admin') {
      this.currentUser = { username: 'admin', role: 'admin' }
      return true
    } else if (username === 'guest' && password === '') {
      this.currentUser = { username: 'guest', role: 'guest' }
      return true
    }
    return false
  },
  logout() {
    this.currentUser = null
  },
  isAuthenticated() {
    return !!this.currentUser
  },
  getCurrentUser() {
    return this.currentUser
  },
  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin'
  },
}
