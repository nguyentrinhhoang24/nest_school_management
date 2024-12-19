<template>
    <div>
        <h1>Edit School </h1>
        <form @submit.prevent="handleSubmit">
            <div class="name">
                <label>Name</label>
                <input v-model="form.name" type="text" required />
            </div>
            <div class="address">
                <label>Address</label>
                <input v-model="form.address" type="text" required />
            </div>
            <div class="phone">
                <label>Phone</label>
                <input v-model="form.phone" type="text" required />
            </div>
            <div class="email">
                <label>Email</label>
                <input v-model="form.email" type="text" required />
            </div>
            <div class="description">
                <label>Description</label>
                <input v-model="form.description" type="text" required />
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
    <nuxt-link to="/school">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  name: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  status: '',
});

const getSchoolById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/school/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching school:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/school/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update school successfully')
    router.push('/school')
  } catch (error) {
    console.error('Error updating school:', error);
  }
};

onMounted(() => {
  getSchoolById();
})
</script>

<style scoped>

</style>