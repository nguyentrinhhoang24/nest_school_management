<template>
    <div>
    <h1>Create Class Group</h1>
    <form @submit.prevent="handleSubmit">
        <div class="branch">
            <select v-model="form.branch_id" required>
              <option value="" disabled>Select branch</option>
              <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                  {{ branch.name }}
              </option>
            </select>
        </div>
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
        <div class="status">
          <label>Status:</label>
          <label>
              <input v-model="form.status" type="radio" value="Active" />
              Active
          </label>
          <label>
              <input v-model="form.status" type="radio" value="Draft" />
              Draft
          </label>
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/classgroup">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const error = ref('')

const form = ref({
  branch_id: '',
  title: '',
  description: '',
  status: '',
});

const branchs = ref([]);
const getBranch = async () => {
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
        console.log('fetch branch:', branchs.value)
    } catch (error) {
        console.error('Catch fetching branch:', error.message);
    }
}

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    await useFetch('http://localhost:5000/classgroup', { 
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`},
      body: form.value });
    alert('Add new class group successfully');
    router.push('/classgroup');
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  getBranch();
});
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
  color: #34495e; /* Màu xanh đậm */
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
  color: #2c3e50; /* Màu xanh đậm */
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #007bff; /* Đổi màu viền khi focus */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Định dạng cho radio buttons */
input[type="radio"] {
  margin-right: 10px;
}

label input[type="radio"] {
  margin-right: 5px;
}

/* Nút Submit */
button[type="submit"] {
  background-color: #007bff; /* Màu xanh dương */
  color: #ffffff; /* Màu chữ trắng */
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: block;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Màu xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nâng nút khi hover */
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

/* Thông báo lỗi */
p {
  color: #f44336; /* Màu đỏ tươi */
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
}

/* Định dạng cho phần status */
.status {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.status label {
  font-size: 16px;
  color: #34495e;
}

.status input[type="radio"] {
  margin-top: 5px;
}

/* Các phần tử tạo lớp */
div.title, div.description, div.status {
  margin-bottom: 15px;
}
</style>
