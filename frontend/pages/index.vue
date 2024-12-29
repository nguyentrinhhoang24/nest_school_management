<template>
    <div>
        <h1>Nuxt Home</h1>
        <button @click="ckdtoken">nnn</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const ckdtoken = () => {
    const token = localStorage.getItem('token');
    console.log('token:', token);
    if (localStorage.getItem('token') === null) {
        router.push('/auth/login');
    }
}

</script>

<style scoped>

</style>