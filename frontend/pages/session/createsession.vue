<template>
    <div>
    <h1>Create Session</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Class name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="age">
            <label>Age</label>
            <input v-model="form.age" type="number" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/session">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  name: '',
  age: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/session', { method: 'POST', body: form.value });
    alert('Add new session successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>