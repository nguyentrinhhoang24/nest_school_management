<template>
  <div class="createuser">
    <h1>Add </h1>
    <form @submit.prevent="handleSubmit">
      <div class="name">
        <label>Full Name</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="phone">
        <label>Phone number</label>
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
      <div>
        <label for="">Gender</label>
        <label>
          <input type="radio" v-model="form.gender" value="male" />
          Nam
        </label>
        <label>
          <input type="radio" v-model="form.gender" value="female" />
          Nữ
        </label>
      </div>
      <div class="checkbox-group">
        <label for="">ROLE</label>
        <label>
          <input type="checkbox" v-model="form.role" value="teacher" />
          Teacher
        </label>
        <label>
          <input type="checkbox" v-model="form.role" value="driver" />
          Driver
        </label>
        <label>
          <input type="checkbox" v-model="form.role" value="parent" />
          Parent
        </label>
      </div>
      <div class="email">
        <label class="lbl-email">Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label class="lbl-pass">Password</label>
        <input v-model="form.password" type="password" required />
      </div>
      <button type="submit">Add</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/schooladmin_dashboard">Back to dashboard</nuxt-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useFetch } from 'nuxt/app';

const userStore = useUserStore();

const form = ref({
  name: '',
  phone: '',
  address: '',
  birthday: '',
  gender: '',
  role: [],
  email: '',
  password: ''
});


const error = ref('');

const handleSubmit = async () => {
  try {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Token not found in store')
    // }
    const res = await useFetch('http://localhost:5000/auth/createuser', { 
      method: 'POST', 
      body: form.value,
      });
    alert('Add new user successfully')
  } catch (err) {
    error.value = err.message;
    console.log(`Form: ${JSON.stringify(form.value, null, 2)}`)
  }
};
</script>

<style scoped>
.createuser {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.createuser h1 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Style cho các nhãn và input */
.createuser label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.createuser input[type="text"],
.createuser input[type="date"],
.createuser input[type="email"],
.createuser input[type="password"],
.createuser input[type="radio"] {
  width: calc(100% - 10px);
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* Style đặc biệt cho radio buttons */
.createuser div > label {
  margin-right: 15px;
  font-size: 14px;
}

.createuser input[type="radio"] {
  width: auto;
  margin-right: 5px;
}
/* Đảm bảo các checkbox nằm ngang */
.createuser div.checkbox-group {
  display: flex;
  flex-wrap: wrap; /* Cho phép các checkbox xuống dòng nếu không đủ chỗ */
  align-items: center; /* Căn chỉnh các checkbox và label theo chiều dọc */
  margin-bottom: 15px; /* Khoảng cách giữa nhóm checkbox và các phần tử khác */
}

.createuser div.checkbox-group label {
  margin-right: 20px; /* Khoảng cách giữa các checkbox */
  display: inline-flex;
  align-items: center; /* Đảm bảo căn chỉnh các label với checkbox */
}

/* Style cho button */
.createuser button {
  width: 100%;
  padding: 10px;
  background-color: #59d97d;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.createuser button:hover {
  background-color: #3dc365;
}

/* Style cho thông báo */
.createuser p {
  text-align: center;
  font-size: 14px;
  color: #d32f2f;
  margin-top: 10px;
}

/* Style cho các thành phần cụ thể */
.name, .phone, .address, .birthday, .email {
  margin-bottom: 15px;
}

</style>
