<script setup>
import { useAuth } from '~/composables/useAuth';
import { ref } from 'vue';

const { login } = useAuth();
const form = ref({ email: '', password: '' });
const error = ref('');

const handleLogin = async () => {
  try {
    await login(form.value);
    navigateTo('/'); // Chuyển hướng sau khi đăng nhập thành công
  } catch (err) {
    error.value = 'Đăng nhập thất bại. Vui lòng thử lại.';
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>Email</label>
      <input v-model="form.email" type="text" required />
    </div>
    <div>
      <label>Password</label>
      <input v-model="form.password" type="password" required />
    </div>
    <button type="submit">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>
