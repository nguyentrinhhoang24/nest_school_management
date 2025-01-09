<template>
  <div>
    <h1>Edit Student</h1>
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
        <select v-model="form.class_id" id="class" required>
          <option value="" disabled>Select class</option>
          <option v-for="Class in classes" :key="Class.id" :value="Class._id">
            {{ Class.name }}
          </option>
        </select>
      </div>
      <div class="code">
        <label>Code</label>
        <input v-model="form.code" type="text" required />
      </div>
      <div class="name">
        <label>Name</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="birthday">
        <label>Birthday</label>
        <input v-model="form.birthday" type="date" required />
      </div>
      <div class="gender">
        <label>Gender:</label>
        <label>
          <input v-model="form.gender" type="radio" value="Boy" />
          Boy
        </label>
        <label>
          <input v-model="form.gender" type="radio" value="Girl" />
          Girl
        </label>
      </div>
      <div class="address">
        <label>Address</label>
        <input v-model="form.address" type="text" required />
      </div>
      <div class="father">
        <select v-model="form.father_id" id="father">
          <option value="" disabled>Select father</option>
          <option v-for="parent in fathers" :key="parent._id" :value="parent._id">
            {{ parent.name }}
          </option>
        </select>
      </div>
      <div class="mother">
        <select v-model="form.mother_id" id="mother">
          <option value="" disabled>Select mother</option>
          <option v-for="parent in mothers" :key="parent._id" :value="parent._id">
            {{ parent.name }}
          </option>
        </select>
      </div>
      <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/student">Back</nuxt-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'nuxt/app';

definePageMeta({
  layout: 'dashboard',
});

const error = ref('');
const route = useRoute();
const router = useRouter();
const cacheStudent = ref('');
const form = ref({
  branch_id: '',
  class_id: '',
  code: '',
  name: '',
  birthday: '',
  gender: '',
  address: '',
  father_id: '',
  mother_id: '',
});

const branchs = ref([]);
const classes = ref([]);
const users = ref([]);
const fathers = ref([]);
const mothers = ref([]);

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('token is missing');
      return;
    }
    const { data } = await useFetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data?.value) {
      branchs.value = data.value;
    }
  } catch (error) {
    console.log('error fetching branches:', error.message);
  }
};

const getClasses = async (branch_id) => {
  try {
    const { data, error } = await useFetch(`http://localhost:5000/class/by-branch/${branch_id}`);
    if (error.value) {
      throw new Error(error.value.message);
    }
    classes.value = data.value || [];
  } catch (error) {
    console.log('error fetching classes:', error);
  }
};

const getUsers = async (branch_id) => {
  try {
    const roles = ['parent'];
    const url = `http://localhost:5000/auth/by-branch/${branch_id}?roles=parent`;
    const { data } = await useFetch(url);
    users.value = data.value || [];
    fathers.value = users.value.filter((user) => user.gender === 'male');
    mothers.value = users.value.filter((user) => user.gender === 'female');
  } catch (error) {
    console.log('error fetching users:', error);
  }
};

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getClasses(form.value.branch_id);
    getUsers(form.value.branch_id);
  } else {
    classes.value = [];
    fathers.value = [];
    mothers.value = [];
  }
};

const getStudent = async () => {
  try {
    if(cacheStudent[route.params.id]) {
      form.value = cacheStudent[route.params.id];
      return;
    }
    const res = await $fetch(`http://localhost:5000/student/${route.params.id}`);
    form.value = res;
    console.log('fetch student by id', form.value);
    cacheStudent[route.params.id] = res;
    handleBranchChange();
  } catch (error) {
    console.error('Error fetching student:', error);
  }
};

const handleSubmit = async () => {
  try {
    const payload = {
      ...form.value,
      parent_id: [form.value.father_id, form.value.mother_id].filter(Boolean),
    };
    await useFetch(`http://localhost:5000/student/${route.params.id}`, { method: 'PUT', body: payload });
    alert('Update student successfully');
    router.push('/student');
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

onMounted(() => {
  getBranchs();  // Get branches on mount
  getStudent();  // Get student data to edit
});
</script>


<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #34495e;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Form Styling */
form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #34495e;
  display: block;
}

input[type="text"],
input[type="date"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Định dạng cho radio buttons */
.gender {
  display: flex;
  gap: 20px;
}

.gender label {
  font-size: 1rem;
  color: #34495e;
  display: flex;
  align-items: center;
}

.gender input[type="radio"] {
  margin-right: 0.5rem;
}

/* Nút Submit */
button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  display: block;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

/* Link Trở Về */
.nuxt-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007BFF;
  text-decoration: none;
}

.nuxt-link:hover {
  text-decoration: underline;
}

/* Thông báo lỗi */
p {
  color: #f44336;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
</style>