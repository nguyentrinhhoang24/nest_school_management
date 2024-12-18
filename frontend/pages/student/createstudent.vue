<template>
    <div>
    <h1>Create Student</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="birthday">
            <label>Birthday</label>
            <input v-model="form.birthday" type="date" required />
        </div>
        <div class="gender">
          <label>Gender:</label>
          <label>
              <input v-model="form.gender" type="radio" value="Boy" />
              Boy
          </label>
          <label>
              <input v-model="form.gender" type="radio" value="Girl" />
              Girl
          </label>
        </div>
        <div class="address">
            <label>Address</label>
            <input v-model="form.address" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/student">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const form = ref({
  code: '',
  name: '',
  birthday: '',
  gender: '',
  address: '',
});

const handleSubmit = async () => {
  try {
    await useFetch('http://localhost:5000/student', { method: 'POST', body: form.value });
    alert('Add new student successfully')
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>

</style>