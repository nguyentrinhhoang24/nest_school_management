<template>
    <div>
    <h1>Update Subject</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="title">
            <label>Class title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="description">
            <label>description</label>
            <input v-model="form.description" type="number" required />
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
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/subject">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  code: '',
  title: '',
  description: '',
  status: ''
});

const getSubject = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/subject/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching subject:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/subject/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update subject successfully')
    router.push('/subject')
  } catch (error) {
    console.error('Error updating subject:', error);
  }
};

onMounted(() => {
  getSubject();
})
</script>

<style scoped>

</style>