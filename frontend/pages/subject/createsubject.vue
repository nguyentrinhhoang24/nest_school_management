<template>
    <div>
    <h1>Create Subject</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
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
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/subject">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  title: '',
  description: '',
  status: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/subject', { method: 'POST', body: form.value });
    alert('Add new subject successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>