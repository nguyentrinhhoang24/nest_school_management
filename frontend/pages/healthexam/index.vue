<template>
    <div class="healthexam-page">
        <h1>List health exam
            <nuxt-link to="/healthexam/createhealthexam">+ Add New</nuxt-link>
        </h1>
        <div class="branch">
          <select v-model="branch_id" id="branch">
            <option value="" disabled>Select branch</option>
            <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
            </option>
          </select>
        </div>
        <div v-if="branchs && branchs.length > 0">
            <table>
                <thead>
                    <tr>
                      <th>Class</th>
                      <th>Date</th>
                      <th>Note</th>
                      <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="healthexam in healthexams" :key="healthexam.id">
                      <td>{{healthexam.className}}</td>
                      <td>{{ formatDate(healthexam.date) }}</td>
                      <td>{{ healthexam.note }}</td>
                      <td>
                          <nuxt-link :to="`/healthexam/detail/${healthexam._id}`" class="view-button" title="View health infomation of students">View</nuxt-link>
                          <nuxt-link :to="`/healthexam/updatehealthexam/${healthexam._id}`" class="edit-button">Edit</nuxt-link>
                          <button type="button" class="delete-button" @click="deleteHealth(healthexam._id)">Delete</button>
                      </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});
const branchs  = ref([]);
const branch_id = ref('');
const healthexams = ref([]);
const className = ref('');
const class_id = ref('');
const error = ref('');
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('token is missing');
      return;
    }
    const res = await $fetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branchs.value = [];
      return;
    }
    branchs.value = res || [];
    console.log('fetch branch:', branchs.value);

    if(branchs.value.length > 0) {
      branch_id.value = branchs.value[0]._id;
    }
  } catch (error) {
    console.error('error fetch branch:', error);
  }
}

const getByBranch = async (branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/healthexam/branchid/${branch_id}`);
    const rawHealthExams = res || [];
    healthexams.value = await Promise.all(
      rawHealthExams.map(async (healthexam) => {
        try {
          // Lấy thông tin lớp theo class_id
          const { data: classData } = await useFetch(`http://localhost:5000/class/${healthexam.class_id}`);
          return {
            ...healthexam,
            className: classData.value ? classData.value.name : 'Unknown', // Gán tên lớp
          };
        } catch (error) {
          console.error(`Error fetching class for health exam ${healthexam._id}:`, error);
          return {
            ...healthexam,
            className: 'Unknown',
          };
        }
      })
    );
    console.log('Fetch health exams with class names:', healthexams.value);
  } catch (error) {
    console.error('Error fetching health exams:', error);
  }
};


const deleteHealth = async (id) => {
  try {
    await useFetch(`http://localhost:5000/healthexam/${id}`, {method: 'DELETE',});
    healthexams.value = healthexams.value.filter((healthexam) => healthexam.id !== id);
    await getByBranch(branch_id.value);
    alert('delete health examination successfully');
  } catch (error) {
    console.error('Error deleting healthexam:', error);
  }
};

watch(branch_id, getByBranch);

onMounted(() => {
  getBranchs();
});

</script>

<style scoped>
.healthexam-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.healthexam-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.healthexam-page h1 a {
  background-color: #28a745; /* Màu xanh lá */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.healthexam-page h1 nuxt-link:hover {
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

.edit-button {
  background-color: #ffc107; /* Màu vàng */
  margin-left: 10px;
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

.class-page a {
  color: #002751;
  text-decoration: none;
}

.class-page a:hover {
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

.view-button {
  display: inline-block;
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
  background-color: #007bff; /* Màu xanh dương */
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.view-button:hover {
  background-color: #0056b3; /* Màu xanh dương đậm khi hover */
  transform: translateY(-2px); /* Hiệu ứng nâng khi hover */
}

</style>
