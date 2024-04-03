export default {
    currentUser: null,
    initialize() {
        // Initialize currentUser as guest user by default
        this.currentUser = { username: 'guest', role: 'guest' };
      },
    login(username, password) {
      // Perform authentication logic (e.g., validate credentials against a database)
      // If authentication is successful, set the currentUser
      if (username === 'admin' && password === 'admin') {
        this.currentUser = { username: 'admin', role: 'admin' };
        return true;
      } else if (username === 'guest' && password === '') {
        this.currentUser = { username: 'guest', role: 'guest' };
        return true;
      }
      return false; // Authentication failed
    },
    logout() {
      this.currentUser = null;
    },
    isAuthenticated() {
      return !!this.currentUser;
    },
    getCurrentUser() {
      return this.currentUser;
    },
    isAdmin() {
      return this.currentUser && this.currentUser.role === 'admin';
    }
  };