<template>
  <div>
    <h1>Create Album</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="form.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="form.description" required />
      </div>
      <div>
        <label for="images">Images:</label>
        <input type="file" multiple @change="handleFileUpload" />
      </div>
      <button type="submit">Create</button>
    </form>

    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
import { useFetch } from 'nuxt/app';
import { ref } from 'vue';

const form = ref({
  title: '',
  description: '',
});

const images = ref([]);

const handleFileUpload = (event) => {
  form.value.images = event.target.files;
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  Array.from(form.value.images).forEach(image => { 
    formData.append('images', image); 
  });

  try {
    await useFetch('http://localhost:5000/album', {
      method: 'POST',
      body: formData,
    });
  } catch (err) {
    console.error(err);
    alert('An error occurred.');
  }
};
</script>
<style scoped>

</style>