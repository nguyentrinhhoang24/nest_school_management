<template>
    <div class="subject-page">
        <h1>List subject
            <nuxt-link to="/subject/createsubject">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in subject" :key="item.id">
                        <td>{{ item.code }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.status }}</td>
                        <td>
                            <nuxt-link :to="`/subject/updatesubject/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const subject = ref([]);

const getAllSubject = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/subject',);
        subject.value = data.value
    } catch (error) {
        console.error('Catch fetching subject:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/subject/${id}`, {method: 'DELETE',});
    subject.value = subject.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
};

onMounted(() => {
  getAllSubject();
});

</script>

<style scoped>

</style>