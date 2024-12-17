<template>
  <div class="dashboard">
    <div class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <a @click.prevent="navigateTo('portal')" href="#">Portal</a>
          <ul>
            
            <li><NuxtLink to="/album">Album</NuxtLink></li>
          </ul>
        </li>
        <li>
          <a @click.prevent="navigateTo('academy')" href="#">Academy</a>
          <ul>
            <li><NuxtLink to="/class">Class</NuxtLink></li>
            <li><NuxtLink to="/classgroup">Class Group</NuxtLink></li>
            <li><NuxtLink to="/healthexam">Health examination</NuxtLink></li>
            <li><NuxtLink to="/session">Session</NuxtLink></li>
            <li><NuxtLink to="/subject">Subject</NuxtLink></li>
          </ul>
        </li>
      </ul>
      <button @click="logout">Logout</button>
    </div>
    
    <div class="content">
      <!-- Your main content will be here -->
    </div>
  </div>
</template>

<script setup>
import { useCookie } from '#app';
import { useRouter } from 'vue-router';

const router = useRouter();
const tokenCookie = useCookie('auth_token');

const logout = () => {
  tokenCookie.value = null; // Xóa cookie
  router.push('/auth/login'); // Điều hướng về trang đăng nhập
};

const navigateTo = (menu) => {
  // Logic for highlighting or navigating in the sidebar if necessary
  console.log(`${menu} clicked`);
};
</script>

<style scoped>
.dashboard {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  height: 100vh;
  position: fixed;
}

.sidebar h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  color: #ecf0f1;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 15px;
}

.sidebar ul li a {
  text-decoration: none;
  font-size: 18px;
  color: #ecf0f1;
  display: block;
  padding: 10px;
  background-color: #34495e;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover {
  background-color: #16a085;
}

.sidebar ul li ul {
  margin-left: 20px;
}

.sidebar ul li ul li {
  margin-bottom: 10px;
}

.sidebar ul li ul li a {
  background-color: #1abc9c;
  padding: 8px;
  border-radius: 3px;
}

.sidebar ul li ul li a:hover {
  background-color: #16a085;
}

.content {
  margin-left: 270px;
  padding: 20px;
  flex-grow: 1;
  background-color: #ecf0f1;
  height: 100vh;
  overflow-y: auto;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 20px;
  width: 100%;
}

button:hover {
  background-color: #c0392b;
}

</style>
