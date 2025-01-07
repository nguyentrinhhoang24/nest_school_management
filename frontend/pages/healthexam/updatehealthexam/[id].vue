<template>
    <div>
    <h1>Edit health</h1>
    <form @submit.prevent="handleSubmit">
        <div class="date">
            <label>Date</label>
            <input v-model="form.date" type="date" required />
        </div>
        <div class="note">
            <label>Note</label>
            <input v-model="form.note" type="text" required />
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/healthexam">Back</nuxt-link>
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
const cacheHealth = ref('');
const form = ref({
  date: '',
  note: '',
});

const getHealthExam = async () => {
  try {
    if(cacheHealth[route.params.id]) {
      form.value = cacheHealth[route.params.id];
      return;
    }
    const res = await $fetch(`http://localhost:5000/healthexam/${route.params.id}`);
    form.value = res;
    console.log('fetch health exam by id:', form.value);
    cacheHealth[route.params.id] = res;
  } catch (error) {
    console.error('Error fetching healthexam:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/healthexam/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update healthexam successfully')
    router.push('/healthexam')
  } catch (error) {
    console.error('Error updating healthexam:', error);
  }
};

onMounted(() => {
  getHealthExam();
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

input[type="date"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="date"]:focus,
input[type="text"]:focus {
  border-color: #007bff; /* Đường viền xanh */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button[type="submit"] {
  background-color: #28a745; /* Xanh lá */
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
  background-color: #218838; /* Xanh lá đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}

/* Hiển thị lỗi */
p {
  color: #dc3545; /* Màu đỏ cho lỗi */
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
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
</style>
