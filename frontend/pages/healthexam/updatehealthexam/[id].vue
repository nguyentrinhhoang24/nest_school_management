<template>
    <div>
    <h1>Edit health</h1>
    <form @submit.prevent="handleSubmit">
        <div class="date">
            <label>Date</label>
            <input v-model="form.date" type="date" required />
        </div>
        <div class="note">
            <label>Note</label>
            <input v-model="form.note" type="text" required />
        </div>
    <button type="submit">Update</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/healthexam">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 

const error = ref('')

const route = useRoute();
const router = useRouter();

const form = ref({
  date: '',
  note: '',
});

const getHealthExam = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/healthexam/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching healthexam:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/healthexam/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update healthexam successfully')
    router.push('/healthexam')
  } catch (error) {
    console.error('Error updating healthexam:', error);
  }
};

onMounted(() => {
  getHealthExam();
})
</script>

<style scoped>

</style>