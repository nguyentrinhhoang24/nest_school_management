<template>
   <!-- name address phone email description status -->
    <div class="school-page">
        <h1>List school
            <nuxt-link to="/school/createschool">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in school" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.status }}</td>
                        <td>
                            <nuxt-link :to="`/school/updateschool/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deleteschool(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin">Back to dashborad</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const school = ref([]);

const getSchool = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/school',);
        school.value = data.value
    } catch (error) {
        console.error('Catch fetching school:', error);
    }
};

const deleteschool = async (id) => {
  try {
    await useFetch(`http://localhost:5000/school/${id}`, {method: 'DELETE',});
    school.value = school.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting school:', error);
  }
};

onMounted(() => {
  getSchool();
});
</script>

<style scoped>

</style>