<template>
    <div class="session-page">
        <h1>List session
            <nuxt-link to="/session/createsession">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in session" :key="item.id">
                        <td>{{ item.code }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>
                            <nuxt-link :to="`/session/updatesession/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const session = ref([]);

const getAllSession = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/session',);
        session.value = data.value
    } catch (error) {
        console.error('Catch fetching classes:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/session/${id}`, {method: 'DELETE',});
    session.value = session.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

onMounted(() => {
  getAllSession();
});

</script>

<style scoped>

</style>