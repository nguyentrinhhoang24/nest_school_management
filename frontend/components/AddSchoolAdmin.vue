<template>
  <div class="add-school-admin">
    <h2>Add School Admin</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="school_id">School</label>
        <select v-model="form.school_id" required>
          <option v-for="school in schools" :key="school.id" :value="school._id">
            {{ school.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input v-model="form.phone" type="text" id="phone" required />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input v-model="form.address" type="text" id="address" required />
      </div>

      <div class="form-group">
        <label for="birthday">Birthday</label>
        <input v-model="form.birthday" type="date" id="birthday" required />
      </div>

      <div class="form-group gender-group">
        <label for="gender">Gender</label>
        <select v-model="form.gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="form.password" type="password" id="password" required />
      </div>

      <div class="form-group">
        <button type="submit">Add School Admin</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

const form = ref({
  school_id: '',
  name: '',
  phone: '',
  address: '',
  birthday: '',
  gender: '',
  email: '',
  password: '',
  role: ['schooladmin'], // luôn là schooladmin
});

const schools = ref([]);

const getSchools = async () => {
  try {
    // const token = localStorage.getItem('token');
    const { data, error } = await useFetch('http://localhost:5000/school', {
        method: 'GET',
    });
    if (error.value) throw new Error(error.value.message);
    schools.value = data.value;
  } catch (err) {
    console.error('Failed to fetch schools:', err);
  }
};

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const { data, error } = await useFetch('http://localhost:5000/auth/createuser', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: form.value,
    });

    if (error.value) throw new Error(error.value.message);
    alert('School Admin added successfully!');
    console.log('Response:', data.value);
    form.value = {
      school_id: '',
      name: '',
      phone: '',
      address: '',
      birthday: '',
      gender: 'female',
      email: '',
      password: '',
      role: ['schooladmin'],
    };
  } catch (err) {
    console.error('Error adding school admin:', err);
    alert('Failed to add school admin. Please try again.');
  }
};

onMounted(() => {
  getSchools();
});
</script>

<style scoped>
.add-school-admin {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-school-admin h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Style chung cho các trường thông tin */
.add-school-admin .form-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between; /* Căn giữa các phần tử theo chiều ngang */
  align-items: center;
}

.add-school-admin label {
  font-weight: bold;
  color: #555;
  width: 25%; /* Đặt chiều rộng của nhãn */
}

.add-school-admin input[type="text"],
.add-school-admin input[type="date"],
.add-school-admin input[type="email"],
.add-school-admin input[type="password"],
.add-school-admin select {
  width: 70%; /* Các input sẽ chiếm 70% chiều rộng của dòng */
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Tùy chỉnh cho phần chọn giới tính */
.add-school-admin .gender-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.add-school-admin select {
  width: 100%; /* Đảm bảo các dropdown chiếm hết không gian còn lại */
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style cho nút submit */
.add-school-admin button {
  width: 100%;
  padding: 12px;
  background-color: #59d97d;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-school-admin button:hover {
  background-color: #3dc365;
}
</style>
