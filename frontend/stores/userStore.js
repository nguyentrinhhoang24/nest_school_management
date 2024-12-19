import { defineStore  } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    email: null,
  }),
  actions: {
    login(token, email) {
      this.token = token;
      this.email = email;
    },
    logout(){
      this.token = null;
      this.email = null;
      localStorage.removeItem('token');
    },
    async getUser() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const user = await $fetch('http://localhost:5000/auth/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        this.email = user.email;
        this.token = token;
      } catch (err) {
        console.error('Error fetching user:', err);
        this.logout();
      }
    },
  },
});
