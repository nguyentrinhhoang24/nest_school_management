<template>
    <div>
    <h1>Edit Student</h1>
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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 
definePageMeta({
  layout: 'dashboard',
});

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  code: '',
  name: '',
  birthday: '',
  gender: '',
  address: '',
});

const getStudent = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/student/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching student:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/student/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update student successfully')
    router.push('/student')
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

onMounted(() => {
  getStudent();
})
</script>

<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #34495e;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Form Styling */
form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
input[type="date"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Định dạng cho radio buttons */
.gender {
  display: flex;
  gap: 20px;
}

.gender label {
  font-size: 1rem;
  color: #34495e;
  display: flex;
  align-items: center;
}

.gender input[type="radio"] {
  margin-right: 0.5rem;
}

/* Nút Submit */
button {
  background-color: #4CAF50;
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
  background-color: #45a049;
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
  color: #f44336;
  font-size: 0.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
</style>