<template>
<!-- title payment_deadline payment_method fee_items{fee_item, quantity} total -->
    <div>
    <h1>Edit Invoice</h1>
    <form @submit.prevent="handleSubmit">
        <div class="title">
            <label>Title</label>
            <input v-model="form.title" type="text" required />
        </div>
        <div class="payment_deadline">
            <label>Payment deadline</label>
            <input v-model="form.payment_deadline" type="date" required />
        </div>
        <div class="payment_method">
          <label>Payment method</label>
            <select v-model="form.payment_method">
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Other">Other</option>
            </select>
        </div>
        <div class="description">
            <label>Description</label>
            <input v-model="form.description" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/invoice">Back</nuxt-link>
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