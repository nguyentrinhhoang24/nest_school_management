<template>
<!-- code title price description -->
    <div>
    <h1>Create Fee Item</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="price">
            <label>Price</label>
            <input v-model="form.price" type="number" required />
        </div>
        <div class="desciption">
            <label>Desciption</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/feeitem">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  title: '',
  price: '',
  description: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/feeitem', { method: 'POST', body: form.value });
    alert('Add new fee item successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>