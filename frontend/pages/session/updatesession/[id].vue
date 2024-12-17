<template>
    <div>
    <h1>Update Session</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="date">
            <label>Start date</label>
            <input v-model="form.startdate" type="date" required />
        </div>
        <div class="date">
            <label>End date</label>
            <input v-model="form.enddate" type="date" required />
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
    <nuxt-link to="/session">Back</nuxt-link>
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
  startdate: '',
  enddate: '',
  status: '',
});

const getSession = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/session/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching class:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/session/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update session successfully')
    router.push('/session')
  } catch (error) {
    console.error('Error updating session:', error);
  }
};

onMounted(() => {
  getSession();
})
</script>

<style scoped>

</style>