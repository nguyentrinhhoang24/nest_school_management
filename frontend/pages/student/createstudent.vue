<template>
    <div>
    <h1>Create Student</h1>
    <form @submit.prevent="handleSubmit">
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
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/student">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  name: '',
  birthday: '',
  gender: '',
  address: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/student', { method: 'POST', body: form.value });
    alert('Add new student successfully')
  } catch (err) {
    error.value = err.message;
  }
};
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
input[type="date"] {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="text"]:focus,
input[type="date"]:focus {
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

/* Định dạng cho phần gender */
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

/* Các phần tử */
div.code, div.name, div.birthday, div.gender, div.address {
  margin-bottom: 15px;
}

</style>