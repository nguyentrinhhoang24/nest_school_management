<template>
    <div>
        <h1>Nuxt Home</h1>
        <button @click="ckdtoken">nnn</button> <br>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
const router = useRouter();
const userStore = useUserStore();

const logout = () => {
    userStore.logout();
    router.push('/auth/login');
}

const ckdtoken = () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    console.log('token:', token);
    console.log('email:', email);
    console.log('role:', role);
}

</script>

<style scoped>

</style>