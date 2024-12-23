<template>
    <div>
    <h1>Edit Class Group</h1>
    <form @submit.prevent="handleSubmit">
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
        <div class="status">
          <label>Status:</label>
          <label>
              <input v-model="form.status" type="radio" value="Active" />
              Active
          </label>
          <label>
              <input v-model="form.status" type="radio" value="Draft" />
              Draft
          </label>
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/classgroup">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  title: '',
  description: '',
  status: '',
});

const getClassGroup = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/classgroup/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching class group:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/classgroup/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update class group successfully')
    router.push('/classgroup')
  } catch (error) {
    console.error('Error updating class group:', error);
  }
};

onMounted(() => {
  getClassGroup();
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
  color: #34495e; /* Màu xanh đậm */
  display: block; /* Đảm bảo label hiển thị trên cùng */
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
  display: block; /* Đảm bảo input ở dưới label */
}

input[type="text"]:focus,
input[type="number"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

input[type="radio"] {
  margin-right: 5px;
}

.status label {
  display: inline-block;
  margin-right: 20px;
  font-size: 1rem;
}

/* Nút Submit */
button {
  background-color: #4CAF50; /* Màu xanh lá */
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
  background-color: #45a049; /* Màu xanh lá đậm */
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
</style>
