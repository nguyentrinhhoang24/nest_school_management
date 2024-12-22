<template>
<!-- title payment_deadline payment_method fee_items{fee_item, quantity} total -->
    <div>
    <h1>Create Invoice</h1>
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
        <div class="p-4 bg-gray-900 text-white rounded">
          
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/invoice">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  title: '',
  payment_deadline: '',
  payment_method: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/invoice', { method: 'POST', body: form.value });
    alert('Add new invoice successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>