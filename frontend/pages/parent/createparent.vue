<template>
    <div class="createparent">
        <h1>Add new</h1>
        <form @submit.prevent="handleSubmit">
            <div class="branch">
                <select v-model="form.branch_id" id="branch">
                    <option value="" disabled>Select branch</option>
                    <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                        {{ branch.name }}
                    </option>
                </select>
            </div>
            <div class="name">
                <label>Full name</label>
                <input v-model="form.name" type="text" required />
            </div>
            <div class="phone">
                <label>Phone</label>
                <input v-model="form.phone" type="text" required />
            </div>
            <div class="address">
                <label>Address</label>
                <input v-model="form.address" type="text" required />
            </div>
            <div class="birthday">
                <label>Birthday</label>
                <input v-model="form.birthday" type="date" required />
            </div>
            <div class="gender">
                <label>Gender:</label>
                <label>
                    <input v-model="form.gender" type="radio" value="male" />
                    Male
                </label>
                <label>
                    <input v-model="form.gender" type="radio" value="female" />
                    Female
                </label>
           </div>
           <div class="email">
                <label>Email</label>
                <input v-model="form.email" type="email" required />
            </div>
            <div class="password">
                <label>Password</label>
                <input v-model="form.password" type="password" required />
            </div>
            <div class="children">
                <label>Parent of student</label>
                <input type="text" name="" id="">
            </div>
            <button type="submit">Add</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const form = ref({
    branch_id: '',
    name: '',
    phone: '',
    address: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
    role: ['parent'],
});
const error = ref('');
const branchs = ref([]);

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('token is missing');
      return;
    }
    const { data } = await useFetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branchs.value = [];
      return;
    }
    branchs.value = data.value || [];
    console.log('fetch branch:', branchs.value);
  } catch (error) {
    console.log('error fetch branch:', error.message);
  }
}

const handleSubmit = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const res = await useFetch('http://localhost:5000/auth/createuser', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form.value,
        })
        router.push('/parent');
        alert('add new parent successfully');
    } catch (err) {
        error.value = err.message;
        console.log(`Form: ${JSON.stringify(form.value, null, 2)}`)
    }
}

onMounted(() => {
    getBranchs();
})
</script>

<style scoped>

</style>