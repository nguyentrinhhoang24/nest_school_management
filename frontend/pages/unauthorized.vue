<template>
  <div>
    <h1>Access Denied</h1>
    <p>You do not have permission to access this page.</p>
    <NuxtLink to="/">Go back to home</NuxtLink>
  </div>
</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa; /* Màu nền sáng */
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 3rem;
  color: #dc3545; /* Màu đỏ cảnh báo */
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  color: #6c757d; /* Màu xám nhạt */
  margin-bottom: 2rem;
}

a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff; /* Màu xanh dương */
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

a:hover {
  background-color: #0056b3; /* Xanh dương đậm hơn khi hover */
  transform: translateY(-2px); /* Hiệu ứng nổi nhẹ */
}

a:active {
  transform: translateY(0); /* Hiệu ứng nhấn */
}
</style>
