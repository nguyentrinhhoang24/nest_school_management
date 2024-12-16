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
import { ref } from 'vue'
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
</script>

<style scoped>

</style>