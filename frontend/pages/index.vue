<template>
    <div>
        <h1>Home</h1>
        <button @click="logout">Logout</button>
        
    </div>
</template>

<script setup>
import { useCookie } from '#app';
import { useRouter } from 'vue-router';

const router = useRouter();
const tokenCookie = useCookie('auth_token');

const logout = () => {
  tokenCookie.value = null; // Xóa cookie
  router.push('/auth/login'); // Điều hướng về trang đăng nhập
};
</script>

<style scoped>

</style>