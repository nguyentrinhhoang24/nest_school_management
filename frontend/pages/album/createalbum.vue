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
      <div class="form-group">
        <label for="images">Upload Images</label>
        <input id="images" type="file" multiple @change="handleFileUpload" accept="image/*" />
      </div>
      <div v-if="previewImages.length" class="preview">
        <h3>Image Preview:</h3>
        <div class="image-grid">
          <img v-for="(src, index) in previewImages" :key="index" :src="src" alt="Preview" />
        </div>
      </div>
      <button type="submit">Create</button>
    </form>

    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
import { useFetch } from 'nuxt/app';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const form = ref({
  title: '',
  description: '',
  images: [],
});

const previewImages = ref([]);

const handleFileUpload = (event) => {
  const files = event.target.files;
  form.value.images = files;
  previewImages.value = Array.from(files).map(file => URL.createObjectURL(file));
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  Array.from(form.value.images).forEach((file) => { 
    formData.append('images', file); 
  });

  try {
    await useFetch('http://localhost:5000/album', {
      method: 'POST',
      body: formData,
    });
    alert('Album created successfully!');
    router.push('/album')
  } catch (err) {
    console.error(err);
    alert('Failed to create album.');
  }
};
</script>
<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.image-grid img {
  max-width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>