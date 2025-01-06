<template>
    <div>
    <h1>Edit Fee Item</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="price">
            <label>Price</label>
            <input v-model="form.price" type="number" required />
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/feeitem">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 
definePageMeta({
  layout: 'dashboard',
});

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  code: '',
  title: '',
  price: '',
  description: '',
});

const getById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/feeitem/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching fee item:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/feeitem/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update fee item successfully')
    router.push('/feeitem')
  } catch (error) {
    console.error('Error updating fee item:', error);
  }
};

onMounted(() => {
  getById();
})
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
  color: #34495e; /* Xanh đậm */
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
  color: #2c3e50; /* Xanh đậm */
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input:focus {
  border-color: #007bff; /* Đường viền xanh */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button[type="submit"] {
  background-color: #4CAF50; /* Xanh lá */
  color: #ffffff; /* Chữ trắng */
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: block;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #45a049; /* Xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
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

/* Phần hiển thị lỗi */
p {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
</style>
