<template>
    <div>
    <h1>Edit Class</h1>
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
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/class">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  code: '',
  name: '',
  age: '',
});

const fetchClass = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/class/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching class:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/class/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update class successfully')
    router.push('/class')
  } catch (error) {
    console.error('Error updating class:', error);
  }
};

onMounted(() => {
  fetchClass();
});
</script>

<style scoped>

</style>