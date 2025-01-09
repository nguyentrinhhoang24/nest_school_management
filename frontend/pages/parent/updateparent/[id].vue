<template>
    <div class="createparent">
        <h1>Edit parent</h1>
        <form @submit.prevent="handleSubmit">
            <div class="branch">
                <select v-model="form.branch_id" id="branch" @change="handleBranchChange" required>
                    <option value="" disabled>Select branch</option>
                    <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                        {{ branch.name }}
                    </option>
                </select>
            </div>
            <div class="name">
                <label>Full name</label>
                <input v-model="form.name" type="text" required />
            </div>
            <div class="phone">
                <label>Phone</label>
                <input v-model="form.phone" type="number" required />
            </div>
            <div class="address">
                <label>Address</label>
                <input v-model="form.address" type="text" required />
            </div>
            <div class="birthday">
                <label>Birthday</label>
                <input v-model="form.birthday" type="date" required />
            </div>
            <div class="gender">
                <label>Gender:</label>
                <label>
                    <input v-model="form.gender" type="radio" value="male" />
                    Male
                </label>
                <label>
                    <input v-model="form.gender" type="radio" value="female" />
                    Female
                </label>
           </div>
            <div class="student">
                <label for="student">Select Students:</label>
                <select id="student" @change="addStudent">
                    <option value="" disabled selected>Select a student</option>
                    <option v-for="student in students" :key="student._id" :value="student._id">
                        {{ student.name }}
                    </option>
                </select>
            </div>
            <div class="selected-students">
                <h4>Selected Students:</h4>
                <ul>
                    <li v-for="studentId in form.student_id" :key="studentId">
                        {{ getStudentNameById(studentId) }}
                        <button class="remove-button" @click="removeStudent(studentId)">x</button>
                    </li>
                </ul>
            </div>
            <button type="submit">Update</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="/parent">Back</nuxt-link>
    </div>
</template>

<script setup>
import { useFetch } from "nuxt/app";
import { onMounted, ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import { nextTick } from 'vue';
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});

const router = useRouter();
const route = useRoute();
const form = ref({
    branch_id: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    // email: '',
    // password: '',
    student_id: [],
    // role: ['parent'],
});
const error = ref('');
const cacheParent = ref('');
const branchs = ref([]);
const students = ref([]);

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

const getParent = async () => {
  try {
    if(cacheParent[route.params.id]) {
        form.value = cacheParent[route.params.id];
        return;
    }
    const res = await $fetch(`http://localhost:5000/auth/${route.params.id}`);
    form.value = res;
    console.log('fetch parent by id', form.value);
    await nextTick();
    if (form.value.branch_id) {
        await getStudents(form.value.branch_id);
    }
    cacheParent[route.params.id] = res;
  } catch (error) {
    console.error('Error fetching parent:', error);
  }
};

const getStudents = async (branch_id) => {
  try {
    const { data, error } = await useFetch(`http://localhost:5000/student/branch/${branch_id}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    students.value = data.value || []; 
    console.log('fetch students:', students.value);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

const getStudentNameById = studentId => {
  const student = students.value.find(student => student._id === studentId);
  return student ? student.name : "Unknown Student";
};

const addStudent = (event) => {
    const studentId = event.target.value;
    if (studentId && !form.value.student_id.includes(studentId)) {
        form.value.student_id.push(studentId);
    }
    event.target.value = ""; // Reset dropdown
};

const removeStudent = (studentId) => {
    form.value.student_id = form.value.student_id.filter(id => id !== studentId);
};

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getStudents(form.value.branch_id);
  } else {
    students.value = [];
  }
}

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const res = await useFetch(`http://localhost:5000/auth/${route.params.id}`, {
            method: 'PUT',
            // headers: { Authorization: `Bearer ${token}` },
            body: form.value,
        })
        router.push('/parent');  
        alert('add new parent successfully');
    } catch (err) {
        error.value = err.message;
        console.log(`Form: ${JSON.stringify(form.value, null, 2)}`);
    }
}

onMounted(() => {
    getBranchs();
    getParent();
})
</script>

<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa; /* Nền sáng */
  color: #2d3436; /* Màu chữ tối */
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50; /* Màu xanh đậm */
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

/* Form Styling */
form {
  background-color: #ffffff; /* Nền trắng */
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
  max-width: 550px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1.2rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #34495e;
  display: block;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  padding: 0.7rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  width: 100%;
  margin-top: 0.5rem;
  font-size: 1rem;
  background-color: #f8f9fa;
  color: #495057;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
select:focus {
  border-color: #28a745; /* Màu xanh lá cây */
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

/* Nút Update */
button {
  background-color: #28a745; /* Màu xanh lá cây */
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  display: block;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #218838; /* Xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nổi nhẹ */
}

button:active {
  background-color: #1e7e34; /* Xanh đậm nhất */
  transform: translateY(0); /* Quay lại vị trí ban đầu */
}

/* Link Trở Về */
.nuxt-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.nuxt-link:hover {
  text-decoration: underline;
  color: #0056b3;
}

/* Thông báo lỗi */
p {
  color: #e74c3c; /* Màu đỏ */
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}

/* Phần danh sách học sinh đã chọn */
.selected-students {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa; /* Nền sáng nhẹ */
  border: 1px solid #dee2e6; /* Viền màu xám nhạt */
  border-radius: 8px;
}

.selected-students h4 {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50; /* Màu xanh đậm */
  margin-bottom: 10px;
}

.selected-students ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.selected-students li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #495057;
  padding: 8px 10px;
  border-bottom: 1px solid #dee2e6;
}

.selected-students li:last-child {
  border-bottom: none;
}

.selected-students li:hover {
  background-color: #e9f5ea; /* Nền xanh lá nhạt khi hover */
}

/* Nút xóa (dấu x) */
button.remove-button {
  background-color: transparent;
  color: #e74c3c;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: transform 0.2s ease, color 0.2s ease;
}

button.remove-button:hover {
  color: #c0392b;
  transform: scale(1.2);
}

button.remove-button:focus {
  outline: none;
}

</style>
