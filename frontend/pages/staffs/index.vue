<template>
    <div class="staff-page">
        <h1>List staff
            <nuxt-link to="/staffs/createstaff">+ Add new</nuxt-link>
        </h1>
        <div class="branch">
            <select v-model="branch_id" id="branch">
                <option value="" disabled>Select branch</option>
                <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                    {{ branch.name }}
                </option>
            </select>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <!-- <th>Role</th> -->
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in staff" :key="item._id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.birthday }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.email }}</td>
                        <!-- <td>{{ item.role }}</td> -->
                        <td>{{ item.status }}</td>
                        <td>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const staff = ref([]);
const branchs = ref([]);
const branch_id = ref('');
const error = ref('');

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('token is missing');
      return;
    }
    const { data } = await useFetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branchs.value = [];
      return;
    }
    branchs.value = data.value || [];
    console.log('fetch branch:', branchs.value);
  } catch (error) {
    console.log('error fetch branch:', error.message);
  }
}

const getAllStaff = async (branch_id) => {
  try {
    const url = `http://localhost:5000/auth/by-branch/${branch_id}?roles=teacher, driver`;
    const { data } = await useFetch(url);
    staff.value = data.value || [];
    console.log('fetch staff in branch: ',staff.value);
  } catch (error) {
    console.log('error fetch staff: ', error);
  }
}

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/auth/${id}`, {method: 'DELETE',});
    staff.value = staff.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting staff:', error);
  }
};

watch(branch_id, () => {
  if (branch_id.value) {
    getAllStaff(branch_id.value);
  }
});

onMounted(() => {
  getBranchs();
});

</script>

<style scoped>
.staff-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.staff-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.staff-page h1 a {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.staff-page h1 a:hover {
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

.staff-page a {
  color: #002751;
  text-decoration: none;
}

.staff-page a:hover {
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
