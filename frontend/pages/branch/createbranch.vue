<template>
    <div>
    <h1>Create Branch</h1>
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
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/branch">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  name: '',
  address: '',
  status: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/branch', { method: 'POST', body: form.value });
    alert('Add new branch successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>