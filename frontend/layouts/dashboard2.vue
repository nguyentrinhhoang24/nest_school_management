<template>
  <div class="dashboard-layout">
    <header class="header">
    <h1>Super Admin Dashboard</h1>
      <span v-if="userEmail">
            Hello {{ userEmail }}
          <button @click="logout">Logout</button>
          </span>
    </header>
    <div class="dashboard">
      <aside class="sidebar">
        <h2> Super Admin Dashboard</h2>
        <ul>
          <li>
            <span>Portal</span>
            <ul>
              <li><NuxtLink to="/album">Album</NuxtLink></li>
            </ul>
          </li>
          <li>
            <span>Fee Collection</span>
            <ul>
              <li><NuxtLink to="/feeitem">Fee Item</NuxtLink></li>
              <li><NuxtLink to="/invoice">Invoice</NuxtLink></li>
            </ul>
          </li>
          <li>
            <span>Academy</span>
            <ul>
                <li><NuxtLink to="/school">School</NuxtLink></li>
              <li><NuxtLink to="/branch">Branch</NuxtLink></li>
              <li><NuxtLink to="/class">Class</NuxtLink></li>
              <li><NuxtLink to="/classgroup">Class Group</NuxtLink></li>
              <li><NuxtLink to="/healthexam">Health examination</NuxtLink></li>
              <li><NuxtLink to="/session">Session</NuxtLink></li>
              <li><NuxtLink to="/subject">Subject</NuxtLink></li>
              <li><NuxtLink to="/student">Student</NuxtLink></li>
            </ul>
          </li>
          <li>
            <span>User</span>
            <ul>
              <li><NuxtLink to="/auth/adduser">Add user</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </aside>
      <main class="content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const navigateTo = (menu) => {
  console.log(`${menu} clicked`);
};

const router = useRouter();

const userStore = useUserStore();
const isLoggedIn = computed(() => !userStore.token);
const userEmail = computed(() => userStore.email);
const logout = () => {
  userStore.logout();
  router.push('/auth/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Chiều cao toàn màn hình */
  font-family: Arial, sans-serif;
  background-color: #f7f9fc; /* Màu nền tổng thể nhạt */
}

.header {
  background-color: rgb(47, 47, 47);
  color: #fff;
  padding: 15px 20px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
}

.dashboard {
  display: flex;
  flex: 1; /* Đảm bảo phần còn lại chiếm toàn bộ màn hình trừ header */
  overflow: hidden; /* Ẩn phần tràn */
}

.sidebar {
  width: 250px;
  background-color: #343a40; /* Màu xám đậm */
  color: #ffffff;
  padding: 20px;
  overflow-y: auto; /* Cho phép cuộn nếu nội dung vượt quá chiều cao */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #ffc107; /* Màu vàng nổi bật */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin-bottom: 15px;
}

.sidebar ul li a {
  display: block;
  text-decoration: none;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  background-color: #17293a; /* Màu xám nhạt hơn */
  transition: background-color 0.3s, transform 0.2s;
}

.sidebar ul li a:hover {
  color: #000000;
  background-color: #fdfd96; /* Màu xanh sáng hơn */
  transform: translateX(5px); /* Hiệu ứng di chuyển nhẹ */
}

.sidebar ul li ul {
  margin-left: 15px;
  margin-top: 10px;
}

.sidebar ul li ul li a {
  font-size: 14px;
  background-color: #6c757d; /* Màu xám trung gian */
}

.sidebar ul li ul li a:hover {
  background-color: #aacaf6;
}

.content {
  flex: 1; /* Để nội dung mở rộng đầy đủ không gian còn lại */
  padding: 20px;
  overflow-y: auto;
  background-color: #ffffff; /* Màu nền trắng cho nội dung chính */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* Hiệu ứng nổi nhẹ */
}
</style>
