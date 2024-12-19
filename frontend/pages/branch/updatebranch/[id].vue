<template>
    <div>
    <h1>Edit Branch</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="address">
            <label>Address</label>
            <input v-model="form.address" type="text" required />
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
    <nuxt-link to="/branch">Back</nuxt-link>
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
  address: '',
  status: '',
});

const getBranchById = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/branch/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching branch:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/branch/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update branch successfully')
    router.push('/branch')
  } catch (error) {
    console.error('Error updating branch:', error);
  }
};

onMounted(() => {
  getBranchById();
})
</script>

<style scoped>

</style>