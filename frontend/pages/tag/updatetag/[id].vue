<template>
    <div>
    <h1>Edit Tag</h1>
    <form @submit.prevent="handleSubmit">
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="description">
            <label>description</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/tag">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 
definePageMeta({
  layout: 'dashboard',
});

const error = ref('')
const cacheTag = ref('');
const route = useRoute();
const router = useRouter();

const form = ref({
  title: '',
  description: '',
});

const getTag = async () => {
  try {
    if(cacheTag[route.params.id]) {
      form.value = cacheTag[route.params.id];
      return;
    }
    const res = await $fetch(`http://localhost:5000/tag/${route.params.id}`);
    form.value = res;
    console.log('fetch tag by id', form.value);
    cacheTag[route.params.id] = res;
  } catch (error) {
    console.error('Error fetching tag:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/tag/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update tag successfully')
    router.push('/tag')
  } catch (error) {
    console.error('Error updating tag:', error);
  }
};

onMounted(() => {
  getTag();
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
  color: #34495e; /* Màu xanh đậm */
  font-size: 2rem;
  margin-bottom: 1rem;
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
input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button {
  background-color: #007bff; /* Màu xanh dương */
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
  background-color: #0056b3; /* Màu xanh đậm hơn */
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
  color: #f44336; /* Màu đỏ tươi */
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
</style>
