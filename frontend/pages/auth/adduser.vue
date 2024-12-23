<template>
  <div class="adduser">
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
        <label>
          <input type="radio" v-model="form.gender" value="other" />
          Khác
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

const userStore = useUserStore();

const form = ref({
  name: '',
  phone: '',
  address: '',
  birthday: '',
  gender: '',
  email: '',
  password: ''
});

const error = ref('');

const handleSubmit = async () => {
  try {
    const token = userStore.token;
    if (!token) {
      throw new Error('Token not found in store')
    }
    const res = await $fetch('http://localhost:5000/auth/adduser', { 
      method: 'POST', 
      body: form.value, 
      headers: {
        'Content-Type': 'application.json', 
        'Authorization': `Bearer ${token}`
        } 
      });
    alert('Add new user successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
.adduser {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.adduser h1 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Style cho các nhãn và input */
.adduser label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.adduser input[type="text"],
.adduser input[type="date"],
.adduser input[type="email"],
.adduser input[type="password"],
.adduser input[type="radio"] {
  width: calc(100% - 10px);
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* Style đặc biệt cho radio buttons */
.adduser div > label {
  margin-right: 15px;
  font-size: 14px;
}

.adduser input[type="radio"] {
  width: auto;
  margin-right: 5px;
}

/* Style cho button */
.adduser button {
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

.adduser button:hover {
  background-color: #3dc365;
}

/* Style cho thông báo */
.adduser p {
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
