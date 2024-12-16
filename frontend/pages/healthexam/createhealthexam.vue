<template>
    <div>
    <h1>Create health</h1>
    <form @submit.prevent="handleSubmit">
        <div class="date">
            <label>Date</label>
            <input v-model="form.date" type="date" required />
        </div>
        <div class="note">
            <label>Note</label>
            <input v-model="form.note" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/healthexam">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  date: '',
  note: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/class', { method: 'POST', body: JSON.stringify(form.value) });
    alert('Add new class successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>