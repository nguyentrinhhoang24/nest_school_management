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
                <ul @click="toggleIndexSchoolForm">List school</ul>
              </li>
              <li>
                <ul @click="toggleIndexUserForm">List user</ul>
              </li>
              <li>
                <ul @click="toggleCreateSchoolForm">Create School</ul>
              </li>
              <li>
                <ul @click="toggleCreateSchoolAdminForm">Add School Admin</ul>
              </li>
        </ul>
      </aside>
      <main class="content">
        <NuxtPage />
        <IndexUser v-if="isIndexUser"/>
        <IndexSchool v-if="isIndexSchoolList"/>
        <FormCreateSchool v-if="isCreateSchoolVisible" />
        <AddSchoolAdmin v-if="isCreateSchoolAdminVisible" />
      </main>
    </div>
  </div>
</template>

<script setup>
import FormCreateSchool from '~/components/FormCreateSchool.vue';
import AddSchoolAdmin from '~/components/AddSchoolAdmin.vue';
import IndexSchool from '~/components/superadmin/IndexSchool.vue';
import IndexUser from '~/components/superadmin/IndexUser.vue';
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
// Trạng thái để điều khiển việc hiển thị form
const isCreateSchoolVisible = ref(false);
const isCreateSchoolAdminVisible = ref(false);
const isIndexSchoolList = ref(false);
const isIndexUser = ref(false);

// Hàm để toggle form tạo trường
const toggleCreateSchoolForm = () => {
  isCreateSchoolVisible.value = !isCreateSchoolVisible.value;
  // Ẩn form tạo School Admin nếu có
  isCreateSchoolAdminVisible.value = false;
};

// Hàm để toggle form tạo School Admin
const toggleCreateSchoolAdminForm = () => {
  isCreateSchoolAdminVisible.value = !isCreateSchoolAdminVisible.value;
  // Ẩn form tạo trường nếu có
  isCreateSchoolVisible.value = false;
};

const toggleIndexSchoolForm = () => {
  isIndexSchoolList.value = !isIndexSchoolList.value;
  isCreateSchoolVisible.value = false;
  isCreateSchoolAdminVisible.value = false;
};

const toggleIndexUserForm = () => {
  isIndexUser.value = !isIndexUser.value;
  isCreateSchoolVisible.value = false;
  isCreateSchoolAdminVisible.value = false;
  isIndexSchoolList.value = false;
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  font-family: Arial, sans-serif;
  background-color: #f4f6f9; 
}

.header {
  background-color: #303030;
  color: #ffffff;
  padding: 1rem 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  font-weight: bold;
}

.dashboard {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #ffffff;
  padding: 1.5rem;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e67e22;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 1rem;
}

.sidebar ul li ul {
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 4px;
  background-color: #34495e;
  color: #ffffff;
  transition: background-color 0.3s;
}

.sidebar ul li ul:hover {
  background-color: #1abc9c;
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>
