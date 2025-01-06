<template>
    <div>
    <h1>Create health</h1>
    <form @submit.prevent="handleSubmit">
      <div class="branch">
        <select v-model="form.branch_id" id="branch" @change="handleBranchChange" required>
          <option value="" disabled>Select branch</option>
          <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
          </option>
        </select>
      </div>
      <div class="class">
        <select v-model="form.class_id" id="class">
          <option value="" disabled>Select class</option>
          <option v-for="Class in classes" :key="Class.id" :value="Class._id">
            {{ Class.name}}
          </option>
        </select>
      </div>
      <div class="date">
          <label>Date</label>
          <input v-model="form.date" type="date" required />
      </div>
      <div class="note">
          <label>Note</label>
          <input v-model="form.note" type="text" required />
      </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/healthexam">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
definePageMeta({
  layout: 'dashboard',
});

const error = ref('')

const form = ref({
  branch_id: '',
  class_id: '',
  date: '',
  note: '',
});

const branchs = ref([]);
const classes = ref([]);

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
    if(error.value) {
      console.log('error from API:', error.value.message);
      branchs.value = [];
      return;
    }

    branchs.value = data.value ||[];
    console.log('fetch branchs: ', branchs.value);
  } catch (error) {
    console.log('fetch branch error: ', error.message);
  }
}

const getClass = async (branch_id) => {
  try {
    // const token = localStorage.getItem('token');
    const { data, error } = await useFetch(`http://localhost:5000/class/by-branch/${branch_id}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    classes.value = data.value || []; 
  } catch (error) {
    console.error('Error fetching class:', error);
  }
}

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getClass(form.value.branch_id);
  } else {
    classes.value = [];
  }
}

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/healthexam', { method: 'POST', body: JSON.stringify(form.value) });
    alert('Add new health exam successfully')
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  getBranchs();
  getClass();
})
</script>

<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f9fafb; /* Nền sáng */
  color: #2c3e50; /* Màu chữ tối */
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #34495e; /* Xanh đậm */
  font-size: 28px;
  margin-bottom: 20px;
}

/* Form Styling */
form {
  background-color: #ffffff; /* Nền trắng */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
  max-width: 500px;
  margin: 0 auto;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50; /* Xanh đậm */
}

input[type="date"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="date"]:focus,
input[type="text"]:focus {
  border-color: #007bff; /* Đường viền xanh */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button[type="submit"] {
  background-color: #007bff; /* Xanh dương */
  color: #ffffff; /* Chữ trắng */
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: block;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}

/* Hiển thị lỗi */
p {
  color: #dc3545; /* Màu đỏ cho lỗi */
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
}

/* Link Trở Về */
.nuxt-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
