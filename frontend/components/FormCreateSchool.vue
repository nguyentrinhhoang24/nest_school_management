<template>
  <div class="form-create-school">
    <h2>Create New School</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">School Name</label>
        <input v-model="form.name" type="text" id="name" placeholder="Enter school name" required />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input v-model="form.address" type="text" id="address" placeholder="Enter address" />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input v-model="form.phone" type="text" id="phone" placeholder="Enter phone number" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="email" id="email" placeholder="Enter email address" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="form.description" id="description" placeholder="Enter description"></textarea>
      </div>

      <div class="form-group">
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

      <button type="submit" class="btn btn-primary">Create School</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useFetch } from '#app';
import {useRouter} from 'vue-router';

const router = useRouter();

const form = reactive({
  name: '',
  address: '',
  phone: '',
  email: '',
  description: '',
  status: 'active',
});

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const { data, error } = await useFetch('http://localhost:5000/school', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    alert('School created successfully!');
    router.push('/superadmin');
    console.log('Response:', data.value);

  } catch (err) {
    console.error('Error creating school:', err);
    alert('Failed to create school. Please try again.');
  }
};
</script>

<style scoped>
.form-create-school {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-create-school h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-group .status-radio {
  display: flex;
  gap: 15px;
  align-items: center;
}

.form-group .status-radio input[type="radio"] {
  display: none; /* Hide the default radio button */
}

.form-group .status-radio label {
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.form-group .status-radio label:hover {
  background-color: #f1f1f1;
}

.form-group .status-radio input[type="radio"]:checked + label {
  background-color: #59d97d;
  border-color: #4caf50;
  color: white;
}

.form-group .status-radio label.active {
  background-color: #4caf50;
  color: white;
}

.form-group .status-radio label.draft {
  background-color: #ffcc00;
  color: white;
}

.form-group button {
  width: 100%;
  padding: 12px;
  background-color: #59d97d;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-group button:hover {
  background-color: #3dc365;
}
</style>
