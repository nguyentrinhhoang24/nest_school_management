<template>
<!-- title payment_deadline payment_method fee_items{fee_item, quantity} total -->
    <div>
    <h1>Edit Invoice</h1>
    <form @submit.prevent="handleSubmit">
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="payment_deadline">
            <label>Payment deadline</label>
            <input v-model="form.payment_deadline" type="date" required />
        </div>
        <div class="payment_method">
          <label>Payment method</label>
            <select v-model="form.payment_method">
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Other">Other</option>
            </select>
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/invoice">Back</nuxt-link>
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
  title: '',
  amount: '',
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
/* Container general styling */
div {
  margin-bottom: 1rem;
  font-family: Arial, sans-serif;
}

/* Header styling */
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333; /* Màu chữ tối để nổi bật tiêu đề */
  text-align: center;
}

/* Label styling */
label {
  font-weight: bold;
  margin-right: 1rem;
  color: #555; /* Màu xám nhẹ cho label */
}

/* Text input styling */
input[type="text"], input[type="date"], select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  margin-top: 0.5rem;
  font-size: 14px; /* Cỡ chữ vừa phải */
}

/* Focus effect for inputs */
input[type="text"]:focus, input[type="date"]:focus, select:focus {
  border-color: #007BFF; /* Đổi màu viền khi focus */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Hiệu ứng bóng mờ */
}

/* Button styling */
button {
  background-color: #4CAF50; /* Xanh lá */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 16px;
  width: 100%;
  max-width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* Hover effect for buttons */
button:hover {
  background-color: #45a049; /* Xanh lá đậm hơn */
}

/* Link styling */
.nuxt-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007BFF;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
}

.nuxt-link:hover {
  text-decoration: underline;
}
</style>
