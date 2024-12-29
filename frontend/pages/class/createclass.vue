<template>
    <div>
    <h1>Class Create Page</h1>
    <form @submit.prevent="handleSubmit">
        <div class="branch">
            <select v-model="form.branch_id" id="branch" @change="handleBranchChange" required>
              <option value="" disabled>Select branch</option>
              <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                  {{ branch.name }}
              </option>
            </select>
        </div>
        <div class="classgroup">
            <select v-model="form.classgroup_id" id="classgroup" required>
              <option value="" disabled>Select classgroup</option>
              <option v-for="classgroup in classgroups" :key="classgroup.id" :value="classgroup._id">
                  {{ classgroup.title }}
              </option>
            </select>
        </div>
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Class name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="age">
            <label>Age</label>
            <input v-model="form.age" type="number" required />
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
    <nuxt-link to="/class">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const error = ref('')

const branchs = ref([]);
const classgroups = ref([]);

const form = ref({
  branch_id: '',
  classgroup_id: '',
  code: '',
  name: '',
  age: '',
  status: '',
});

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
        branchs.value = data.value;
    } catch (error) {
        console.error('Error fetching branch:', error);
    }
};

const getClassGroup = async (branch_id) => {
  try {
    // const token = localStorage.getItem('token');
    const { data, error } = await useFetch(`http://localhost:5000/classgroup/by-branch/${branch_id}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    classgroups.value = data.value || []; 
  } catch (error) {
    console.error('Error fetching classgroup:', error);
  }
}

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getClassGroup(form.value.branch_id);
  } else {
    classgroups.value = [];
  }
}

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    await useFetch('http://localhost:5000/class', { 
      method: 'POST', 
      headers: {
        Authorization: `Bearer ${token}`
      } ,
      body: JSON.stringify(form.value) 
      });
    alert('Add new class successfully')
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
div.code, div.name, div.age, div.status {
  margin-bottom: 15px;
}
</style>


