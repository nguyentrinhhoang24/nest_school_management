<template>
    <div class="createparent">
        <h1>Add new</h1>
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
              <select v-model="form.class_id" id="">
                <option value="" disabled>Select class</option>
                <option v-for="Class in classes" :key="Class.id" :value="Class._id">
                  {{Class.name}}
                </option>
              </select>
            </div>
            <div class="name">
                <label>Full name</label>
                <input v-model="form.name" type="text" required />
            </div>
            <div class="phone">
                <label>Phone</label>
                <input v-model="form.phone" type="text" required />
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
           <div class="email">
                <label>Email</label>
                <input v-model="form.email" type="email" required />
            </div>
            <div class="password">
                <label>Password</label>
                <input v-model="form.password" type="password" required />
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
            <button type="submit">Add</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="/parent">Back</nuxt-link>
    </div>
</template>

<script setup>
import { useFetch } from "nuxt/app";
import { onMounted, ref } from "vue";
import {useRouter} from "vue-router";
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});

const router = useRouter();
const form = ref({
    branch_id: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
    student_id: [],
    role: ['parent'],
});
const error = ref('');
const branchs = ref([]);
const students = ref([]);
const classes = ref([])

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

const getClassByBranch = async (branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/class/by-branch/${branch_id}`)
    classes.value = res || [];
    console.log('fetch class', classes.value);
  } catch (error) {
    console.error('error fetch class', error);
  }
}

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
    getClassByBranch(form.value.branch_id)
  } else {
    students.value = [];
    classes.value = []
  }
}

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const res = await $fetch('http://localhost:5000/auth/createuser', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form.value,
        })

        if (res.error?.status === 409) {
          alert('email đã tồn tại')
        }
        router.push('/parent');
        alert('add new parent successfully');
    } catch (err) {
        error.value = err.message;
        console.log(`Form: ${JSON.stringify(form.value, null, 2)}`);
    }
}

onMounted(() => {
    getBranchs();
})
</script>

<style scoped>
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

/* Phần danh sách học sinh đã chọn */
.selected-students {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa; /* Nền sáng nhẹ */
  border: 1px solid #e0e0e0; /* Viền màu xám nhạt */
  border-radius: 8px;
}

.selected-students h4 {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50; /* Màu xanh đậm */
  margin-bottom: 10px;
}

.selected-students ul {
  list-style-type: none; /* Loại bỏ dấu chấm đầu mục */
  padding: 0;
  margin: 0;
}

.selected-students li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #34495e;
  padding: 8px 10px;
  border-bottom: 1px solid #e0e0e0;
}

.selected-students li:last-child {
  border-bottom: none; /* Loại bỏ đường viền ở mục cuối */
}

.selected-students li:hover {
  background-color: #eaf2f8; /* Nền đổi màu khi hover */
}

.remove-button {
  background-color: transparent;
  border: none;
  color: #e74c3c;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.remove-button:hover {
  color: #c0392b;
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="date"]:focus,
input[type="password"]:focus {
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
.gender {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.gender label {
  font-size: 16px;
  color: #34495e;
}

.gender input[type="radio"] {
  margin-top: 5px;
}

</style>
