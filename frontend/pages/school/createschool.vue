<template>
<!-- name address phone email description status -->
    <div>
        <h1>Create School </h1>
        <form @submit.prevent="handleSubmit">
            <div class="name">
                <label>Name</label>
                <input v-model="form.name" type="text" required />
            </div>
            <div class="address">
                <label>Address</label>
                <input v-model="form.address" type="text" required />
            </div>
            <div class="phone">
                <label>Phone</label>
                <input v-model="form.phone" type="text" required />
            </div>
            <div class="email">
                <label>Email</label>
                <input v-model="form.email" type="text" required />
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
        <button type="submit">Create</button>
        </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/school">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  name: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  status: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/school', { method: 'POST', body: form.value });
    alert('Add new school successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>