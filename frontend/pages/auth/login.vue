<template>
    <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="form.password" type="password" required />
      </div>

      <!-- <script src="https://www.google.com/recaptcha/api.js"></script> -->
      <div class="g-recaptcha" data-sitekey="6LeN6bAqAAAAAPCJMdphLqKWNlizrlm8TIbBNT5f"></div>

      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

const router = useRouter();
const form = ref({
  email: '',
  password: '',
});
const userStore = useUserStore();
const roleRoutes = {
  superadmin: '/superadmin',
  schooladmin: '/schooladmin',
  teacher: '/teacherpage',
  driver: '/driverpage',
  parent: '/parentpage',
  default: '/',
}
const error = ref('');

const handleSubmit = async () => {
  try {
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      throw new Error('Please verify the captcha');
    }
    console.log('response captcha token:', recaptchaResponse);
    const data = await $fetch('http://localhost:5000/auth/login', { 
      method: 'POST', 
      body: {
        ...form.value,
        recaptchaToken: recaptchaResponse,
      },
      headers: { 'Content-Type': 'application/json' }
    });

    console.log(`API Response: ${JSON.stringify(data, null, 2)}`)

    if (!data || !data.token) {
      throw new Error('Not received token from API')
    }

    // Lưu token vào localStorage
    const token = data.token;
    localStorage.setItem('token', token);

    // lấy thông tin user thông qua token
    const user = await $fetch('http://localhost:5000/auth/me', { method: 'GET', headers: { Authorization: `Bearer ${token}`,} })

    if (!user || !user.role || !user.email) {
      throw new Error('Not get information user')
    }

    // Cập nhật thông tin người dùng vào store
    userStore.login(token, user.email, user.role);
    
    console.log('Info user: ', user)

    const userRole = user.role.find((role) => roleRoutes[role]) || 'default';
    router.push(roleRoutes[userRole]);
  } catch (err) {
    error.value = 'invalid credentials';
  }
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});

</script>

<style scoped>
/* Style tổng thể cho login page */
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-page h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

/* Style cho các nhãn và input */
.login-page label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  color: #555;
}

.login-page input[type="email"],
.login-page input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

/* Style cho button */
.login-page button {
  width: 100%;
  padding: 10px;
  background-color: #5ca9fb;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-page button:hover {
  background-color: #379af1;
}

/* Style cho thông báo (nếu cần thêm thông báo sau này) */
.message {
  text-align: center;
  font-size: 14px;
  color: #d32f2f;
  margin-top: 10px;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-page {
    padding: 15px;
  }
}

.g-recaptcha {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>