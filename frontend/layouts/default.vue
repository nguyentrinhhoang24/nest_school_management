<template>
  <div class="layout-container">
    <!-- Header -->
    <header>
      <h1>Hello</h1>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/auth/login">Login</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- Main content of the page -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 css by ChatGPT</p>
    </footer>
  </div>
</template>

<script setup>
// Đây là nơi bạn có thể định nghĩa logic cho layout nếu cần
</script>

<style scoped>
/* Layout container */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Đảm bảo layout chiếm toàn bộ chiều cao trang */
}

/* Header styles */
header {
  background-color: #333;
  color: white;
  padding: 20px 10px;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 2rem;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

nav ul li {
  margin: 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

nav ul li a:hover {
  text-decoration: underline;
}

/* Main content styles */
main {
  flex: 1; /* Đảm bảo phần main chiếm phần còn lại của không gian */
  padding: 20px;
  background-color: #f4f4f4;
}

/* Footer styles */
footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  margin-top: 20px;
}
</style>
