import { defineStore  } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    name: null,
  }),
  actions: {
    login(token, name) {
      this.token = token;
      this.name = name;
    },
    logout(){
      this.token = null;
      this.name = null;
      localStorage.removeItem('token');
    },
    loadToken() {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        this.token = savedToken; // Khôi phục token
      }
    },
    async getUser() {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const user = await $fetch('http://localhost:5000/auth/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        this.name = user.name;
        this.token = token;
      } catch (err) {
        console.error('Error fetching user:', err);
        this.logout();
      }
    },
  },
});
