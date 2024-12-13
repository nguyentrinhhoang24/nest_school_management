<template>
    <div>
    <h1>Edit Class Group</h1>
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
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/classgroup">Back</nuxt-link>
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
  status: '',
});

const getClassGroup = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/classgroup/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching class group:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/classgroup/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update class group successfully')
    router.push('/classgroup')
  } catch (error) {
    console.error('Error updating class group:', error);
  }
};
</script>

<style scoped>

</style>