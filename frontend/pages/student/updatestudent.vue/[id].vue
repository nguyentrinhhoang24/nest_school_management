<template>
    <div>
    <h1>Edit Student</h1>
    <form @submit.prevent="handleSubmit">
        <div class="code">
            <label>Code</label>
            <input v-model="form.code" type="text" required />
        </div>
        <div class="name">
            <label>Name</label>
            <input v-model="form.name" type="text" required />
        </div>
        <div class="birthday">
            <label>Birthday</label>
            <input v-model="form.birthday" type="date" required />
        </div>
        <div class="gender">
          <label>Gender:</label>
          <label>
              <input v-model="form.gender" type="radio" value="Boy" />
              Boy
          </label>
          <label>
              <input v-model="form.gender" type="radio" value="Girl" />
              Girl
          </label>
        </div>
        <div class="address">
            <label>Address</label>
            <input v-model="form.address" type="text" required />
        </div>
    <button type="submit">Create</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/student">Back</nuxt-link>
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
  name: '',
  birthday: '',
  gender: '',
  address: '',
});

const getStudent = async () => {
  try {
    const { data } = await useFetch(`http://localhost:5000/student/${route.params.id}`);
    form.value = data.value;
  } catch (error) {
    console.error('Error fetching student:', error);
  }
};

const handleSubmit = async () => {
  try {
    await useFetch(`http://localhost:5000/student/${route.params.id}`, { method: 'PUT', body: form.value });
    alert('Update student successfully')
    router.push('/student')
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

onMounted(() => {
  getStudent();
})
</script>

<style scoped>

</style>