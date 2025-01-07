<template>
    <div class="branch-page">
        <h1>List Branch
            <nuxt-link to="/branch/createbranch">+ Add New</nuxt-link>
        </h1>

        <div v-if="branchs && branchs.length > 0" >
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="branch in branchs" :key="branch.id">
                        <td>{{ branch.code }}</td>
                        <td>{{ branch.name }}</td>
                        <td>{{ branch.address }}</td>
                        <td>{{ branch.status }}</td>
                        <td>
                            <nuxt-link :to="`/branch/updatebranch/${branch._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deletebranch(branch._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
          <p>No branches available. Please add one.</p>
        </div>
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});
const branchs = ref([]);

const getbranch = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await $fetch('http://localhost:5000/branch/by-school', {
          method: 'GET', 
          headers: { 
              'Authorization': `Bearer ${token}` 
          },
      });
      branchs.value = res;
      console.log('fetch branchs:', branchs.value);
    } catch (error) {
      console.error('Catch fetching branch:', error);
      branchs.value = [];
    }
};

const deletebranch = async (id) => {
  try {
    await useFetch(`http://localhost:5000/branch/${id}`, {method: 'DELETE',});
    branchs.value = branchs.value.filter((branch) => branch.id !== id);
    await getbranch();
    alert('Branch deleted successfully');
  } catch (error) {
    console.error('Error deleting branch:', error);
  }
};

onMounted(() => {
  getbranch();

});
</script>

<style scoped>
.branch-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.branch-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.branch-page h1 a {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.branch-page h1 a:hover {
  background-color: #218838; /* Màu xanh lá đậm hơn khi hover */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
}

thead th {
  background-color: #002751;
  color: #fff;
  text-align: left;
  padding: 12px;
  font-size: 16px;
  border-bottom: 2px solid #ddd;
}

tbody td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

tbody tr:hover {
  background-color: #f1f1f1; /* Highlight hàng khi hover */
}

.index-button,
.edit-button,
.delete-button {
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.index-button {
  background-color: #17a2b8; /* Màu xanh dương nhạt */
  color: #fff;
}

.index-button:hover {
  background-color: #138496;
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}

.edit-button {
  background-color: #ffc107; /* Màu vàng */
  color: #fff;
}

.edit-button:hover {
  background-color: #e0a800;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #dc3545; /* Màu đỏ */
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.branch-page a {
  color: #002751;
  text-decoration: none;
}

.branch-page a:hover {
  text-decoration: underline;
}

.nuxt-link {
  margin-top: 20px;
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

</style>