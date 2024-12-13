<template>
    <div>
    <h1>Create Class Group</h1>
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
            <label>Status</label>
            <input v-model="form.status" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/classgroup">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  title: '',
  description: '',
  status: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/classgroup', { method: 'POST', body: form.value });
    alert('Add new class group successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>