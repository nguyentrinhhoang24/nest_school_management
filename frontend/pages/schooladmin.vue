<template>
  <div class="admin-page">
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});
</script>

<style scoped>
.admin-page {
  background-image: url("https://khoinguonsangtao.vn/wp-content/uploads/2021/12/hinh-nen-4k-laptop-don-gian.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: repeat-x y;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: rgb(199, 108, 108);
  font-size: 50px;
  font-family: 'Times New Roman', Times, serif;
}
</style>
