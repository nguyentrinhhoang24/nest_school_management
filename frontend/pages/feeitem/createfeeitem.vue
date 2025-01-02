<template>
<!-- code title price description -->
    <div>
    <h1>Create Fee Item</h1>
    <form @submit.prevent="handleSubmit">
      <div class="branch">
        <select v-model="form.branch_id" required>
          <option value="" disabled>Select branch</option>
          <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
          </option>
        </select>
      </div>
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
      <div class="desciption">
          <label>Desciption</label>
          <input v-model="form.description" type="text" required />
      </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/feeitem">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const error = ref('')

const form = ref({
  branch_id: '',
  code: '',
  title: '',
  price: 0,
  description: '',
});
const branchs = ref([]);
const getBranch = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const { data } = await useFetch('http://localhost:5000/branch/by-school', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (error.value) {
          console.error('Error from API:', error.value.message);
          branchs.value = [];
          return;
        }

        branchs.value = data.value || [];
        console.log('fetch branch:', branchs.value)
    } catch (error) {
        console.error('Catch fetching branch:', error.message);
    }
}


const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/feeitem', { method: 'POST', body: form.value });
    router.push('/feeitem')
    alert('Add new fee item successfully')
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  getBranch();
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
  background-color: #007bff; /* Xanh dương */
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
  background-color: #0056b3; /* Xanh đậm hơn */
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
