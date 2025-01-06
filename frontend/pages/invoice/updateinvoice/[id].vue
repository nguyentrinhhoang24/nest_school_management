<template>
  <div>
    <h1>Edit Invoice</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Title Input -->
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Eg: September tuition ..."
          required
        />
      </div>

      <!-- Payment Deadline -->
      <div>
        <label for="deadline">Payment deadline</label>
        <input type="date" id="deadline" v-model="form.payment_deadline" required />
      </div>

      <!-- Payment Method -->
      <div>
        <label for="paymentMethod">Payment method</label>
        <select v-model="form.payment_method" id="paymentMethod">
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="form.description" type="text" required />
      </div>

      <!-- Fee Items Table -->
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fee item</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.fee_items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <select v-model="item.fee_item" @change="updateUnitPrice(index)">
                <option value="" disabled>Select fee item</option>
                <option v-for="fee in feeitems" :key="fee.id" :value="fee._id">
                  {{ fee.title }}
                </option>
              </select>
            </td>
            <td>{{ formatCurrency(item.unitPrice) }}</td>
            <td>
              <input type="number" v-model.number="item.quantity" min="1" placeholder="Quantity" @input="updateSubtotal(index)" />
            </td>
            <td>{{ formatCurrency(item.subtotal) }}</td>
            <td>
              <button type="button" @click="removeItem(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Item Button -->
      <button type="button" @click="addItem">+ Add new</button>

      <!-- Submit Button -->
      <button type="submit">Update</button>
    </form>

    <!-- Error Display -->
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/invoice">Back</nuxt-link>
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
  amount: '',
  description: '',
});

const getById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/invoice/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching invoice:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/invoice/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update invoice successfully')
    router.push('/invoice')
  } catch (error) {
    console.error('Error updating invoice:', error);
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
