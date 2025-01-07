<template>
    <div class="school-page">
        <h1>My School</h1>

        <div class="school-info" v-if="school && school.length > 0">
            <div class="info-item">
                <label>Name:</label>
                <span>{{ school.name }}</span>
            </div>
            <div class="info-item">
                <label>Address:</label>
                <span>{{ school.address }}</span>
            </div>
            <div class="info-item">
                <label>Phone:</label>
                <span>{{ school.phone }}</span>
            </div>
            <div class="info-item">
                <label>Email:</label>
                <span>{{ school.email }}</span>
            </div>
            <div class="info-item">
                <label>Description:</label>
                <span>{{ school.description }}</span>
            </div>
            <div class="info-item">
                <label>Status:</label>
                <span>{{ school.status }}</span>
            </div>
        </div>

        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({
  layout: 'dashboard',
});
const school = ref('');

const getSchool = async () => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await useFetch('http://localhost:5000/school/by-user', {
            headers: { Authorization: `Bearer ${token}` },
        });
        school.value = data.value;
    } catch (error) {
        console.error('Catch fetching school:', error);
    }
};

onMounted(() => {
  getSchool();
});
</script>

<style scoped>
.school-page {
    font-family: 'Arial', sans-serif;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 30px auto;
}

h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
}

.school-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

label {
    font-weight: 500;
    color: #555;
    font-size: 16px;
    width: 120px;
    text-align: left;
}

span {
    color: #333;
    font-size: 16px;
    word-wrap: break-word;
}

nuxt-link {
    margin-top: 20px;
    display: inline-block;
    padding: 12px 25px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

nuxt-link:hover {
    background-color: #45a049;
}
</style>

