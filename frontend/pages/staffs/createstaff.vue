<template>
<!-- cần thêm select branch khi tạo staff -->
    <div class="createstaff">
        <h1>Create staff</h1>
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
                <input v-model="form.phone" type="text">
            </div>
            <div class="birthday">
                <label>Birthday</label>
                <input v-model="form.birthday" type="date">
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
           <div class="address">
                <label>Address</label>
                <input v-model="form.address" type="text">
            </div>
            <div class="email">
                <label>Email</label>
                <input v-model="form.email" type="email" required />
            </div>
            <div class="class">
              <select v-model="form.class_id" id="class" required>
                <option value="" disabled>Select class</option>
                <option v-for="Class in classes" :key="Class.id" :value="Class._id">
                  {{ Class.name }}
                </option>
              </select>
            </div>
            <div class="bus">
                <select v-model="form.bus_id" id="bus" required>
                    <option value="" disabled>Select bus</option>
                    <option v-for="bus in buses" :key="bus.id" :value="bus._id">{{ bus.route }}</option>
                </select>
            </div>
            <div class="password">
                <label>Password</label>
                <input v-model="form.password" type="text" required />
            </div>
            <div class="role">
                <label>Role</label>
                <label>
                    <input v-model="form.role" type="radio" value="teacher" />
                    Teacher
                </label>
                <label>
                    <input v-model="form.role" type="radio" value="driver" />
                    Driver
                </label>
           </div>
           <button type="submit">Create</button>
        </form>
        <p v-if="error">{{error}}</p>
        <nuxt-link to="/staffs">Back</nuxt-link>
    </div>
</template>

<script setup>
import { useFetch } from "nuxt/app";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});

const error = ref('');
const router = useRouter();
const branchs = ref([]);
const classes = ref([]);
const buses = ref([]);
const form = ref({
    branch_id: '',
    name: '',
    birthday: '',
    gender: '',
    address: '',
    email: '',
    password: '',
    class_id: '',
    bus_id: '',
    role: []
});
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
    const { data } = useFetch(`http://localhost:5000/class/by-branch/${branch_id}`);
    classes.value = data.value || [];
    console.log('fetch classes:', classes.value);
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
}

const getBusByBranch = async (branch_id) => {
  try {
    const { data } = await useFetch(`http://localhost:5000/bus/branchid/${branch_id}`);
    buses.value = data.value || [];
    console.log('fetch bus:', buses.value);
  } catch (error) {
    console.error('error fetch buses:', error);
  }
}

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getClassByBranch(form.value.branch_id);
    getBusByBranch(form.value.branch_id);
  } else {
    classes.value = [];
    buses.value = [];
  }
}

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token');
        const respon = await useFetch('http://localhost:5000/auth/createuser', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form.value,
        });
        router.push('/staffs');
        alert('Add staff successfully');
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

input[type="text"],
input[type="email"],
input[type="date"],
input[type="password"],
select {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input:focus,
select:focus {
  border-color: #007bff; /* Đổi màu viền khi focus */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Định dạng cho radio buttons */
input[type="radio"] {
  margin-right: 10px;
}

.gender,
.role {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.gender label,
.role label {
  font-size: 16px;
  color: #34495e;
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

/* Định dạng cho dropdown class và branch */
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

</style>