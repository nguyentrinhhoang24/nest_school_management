<template>
    <div>
        <h1>Admin Dashboard</h1>
        <li>
          <a @click.prevent="navigateTo('user')" href="#">Portal</a>
          <ul>
            <li><NuxtLink to="/auth/adduser">Add user</NuxtLink></li>
          </ul>
        </li>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>