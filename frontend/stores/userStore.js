import { defineStore  } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    email: null,
    role: [],
  }),
  actions: {
    login(token, email, role) {
      this.token = token;
      this.email = email;
      this.role = role;
      localStorage.setItem('token', token);
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('role', JSON.stringify(role));
    },
    logout(){
      this.token = null;
      this.email = null;
      this.role = [];
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    },
    loadToken() {
      const savedToken = localStorage.getItem('token');
      const savedRole = localStorage.getItem('role');
      const savedEmail = localStorage.getItem('email');
      if (savedToken) {
        this.token = savedToken; // Khôi phục token
      }
      if (savedRole) {
        this.role = JSON.parse(savedRole); // Phục hồi role từ JSON
      }
      if (savedEmail) {
        this.email = JSON.parse(savedEmail); // Phục hồi email từ JSON
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
        this.email = user.email;
        this.token = token;
        this.role = user.role;
      } catch (err) {
        console.error('Error fetching user:', err);
        this.logout();
      }
    },
  },
});
