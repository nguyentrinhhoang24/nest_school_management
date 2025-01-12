<template>
  <div>
    <h1>Edit Health Information for: {{nameStudent}}</h1>

    <form @submit.prevent="submitForm">
      <!-- Student Health Info Form -->
      <div>
        <label for="height">Height</label>
        <input v-model="studentHealth.height" id="height" type="number" />

        <label for="weight">Weight</label>
        <input v-model="studentHealth.weight" id="weight" type="number" />

        <label for="bloodgroup">Blood Group</label>
        <select v-model="studentHealth.bloodgroup" id="bloodgroup">
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label for="allergy">Allergy</label>
        <input v-model="studentHealth.allergy" id="allergy" type="text" />

        <label for="heartrate">Heart Rate</label>
        <input v-model="studentHealth.heartrate" id="heartrate" type="number" />

        <label for="eyes">Eyes</label>
        <input v-model="studentHealth.eyes" id="eyes" type="text" />

        <label for="ears">Ears</label>
        <input v-model="studentHealth.ears" id="ears" type="text" />

        <label for="note">Note</label>
        <input v-model="studentHealth.note" id="note" type="text" />
      </div>

      <button type="submit">Save</button>
    </form>
    <nuxt-link to="/healthexam">Back to Health Exam</nuxt-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'nuxt/app';

const route = useRoute();
const router = useRouter();
const nameStudent = ref('');
const studentHealth = ref({
  height: '',
  weight: '',
  bloodgroup: '',
  allergy: '',
  heartrate: '',
  eyes: '',
  ears: '',
  note: ''
});

// Fetch student health data to prefill the form
const getStudentHealth = async () => {
  try {
    const res = await $fetch(`http://localhost:5000/student/${route.params.id}`);
    studentHealth.value = res.health || {};
    nameStudent.value = res.name || '';
    console.log('response:', res);
    console.log('fetch student health:', studentHealth.value);
  } catch (error) {
    console.error('Error fetching student health info:', error);
  }
};

// Submit the updated health information
const submitForm = async () => {
  try {
    const response = await useFetch(`http://localhost:5000/student/${route.params.id}`, {
      method: 'PUT',
      body: {
        health: studentHealth.value,
      },
    });
    alert('Health information updated successfully');
    router.push('/healthexam');
  } catch (error) {
    console.error('Error updating health info:', error);
  }
};

// On mounted, fetch student health data
onMounted(() => {
  getStudentHealth();
});
</script>

<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f9fafb;
  color: #2c3e50;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #34495e;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Form Styling */
form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #34495e;
  display: block;
}

input[type="text"],
input[type="number"],
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="number"]:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  display: block;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

/* Link Trở Về */
.nuxt-link {
  display: inline-block;
  margin-top: 1rem;
  color: #007BFF;
  text-decoration: none;
}

.nuxt-link:hover {
  text-decoration: underline;
}
</style>
