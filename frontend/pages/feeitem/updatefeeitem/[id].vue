<template>
    <div>
    <h1>Edit Fee Item</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="amount">
            <label>Amount</label>
            <input v-model="form.amount" type="number" required />
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/feeitem">Back</nuxt-link>
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
  title: '',
  amount: '',
  description: '',
});

const getById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/feeitem/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching fee item:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/feeitem/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update fee item successfully')
    router.push('/feeitem')
  } catch (error) {
    console.error('Error updating fee item:', error);
  }
};

onMounted(() => {
  getById();
})
</script>

<style scoped>

</style>