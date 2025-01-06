<template>
  <div>
    <h1>Edit Album</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="form.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="form.description" required />
      </div>
      <button type="submit">Update</button>
    </form>

    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  title: '',
  description: '',
});

const getAlbum = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/album/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching album:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/album/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update album successfully')
    router.push('/album')
  } catch (error) {
    console.error('Error updating album:', error);
  }
};

onMounted(() => {
  getAlbum();
})

</script>

<style scoped>
  div {
    margin-bottom: 1rem;
  }

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  input[type="text"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    margin-top: 0.5rem;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #45a049;
  }

  a {
    display: inline-block;
    margin-top: 1rem;
    color: #007BFF;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
</style>

