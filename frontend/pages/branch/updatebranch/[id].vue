<template>
    <div>
    <h1>Edit Branch</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="address">
            <label>Address</label>
            <input v-model="form.address" type="text" required />
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
    <nuxt-link to="/branch">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  code: '',
  name: '',
  address: '',
  status: '',
});

const getBranchById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/branch/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching branch:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/branch/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update branch successfully')
    router.push('/branch')
  } catch (error) {
    console.error('Error updating branch:', error);
  }
};

onMounted(() => {
  getBranchById();
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

input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  font-size: 1rem;
  display: block; /* Đảm bảo input ở dưới label */
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Định dạng cho radio buttons */
.status {
  display: flex;
  gap: 20px;
}

.status label {
  font-size: 1rem;
  color: #34495e;
  display: flex;
  align-items: center;
}

.status input[type="radio"] {
  margin-right: 0.5rem;
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

/* Thông báo lỗi */
p {
  color: #f44336; /* Màu đỏ tươi */
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
</style>
