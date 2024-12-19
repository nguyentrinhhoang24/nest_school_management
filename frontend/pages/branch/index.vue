<template>
    <div class="branch-page">
        <h1>List Branch
            <nuxt-link to="/branch/createbranch">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="branch in branchs" :key="branch.id">
                        <td>{{ branch.title }}</td>
                        <td>{{ branch.description }}</td>
                        <td>{{ branch.status }}</td>
                        <td>
                            <nuxt-link :to="`/branch/updatebranch/${branch._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deletebranch(branch._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin_dashboard">Back to dashborad</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const branchs = ref([]);

const getbranch = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/branch',);
        branchs.value = data.value
    } catch (error) {
        console.error('Catch fetching branch:', error);
    }
};

const deletebranch = async (id) => {
  try {
    await useFetch(`http://localhost:5000/branch/${id}`, {method: 'DELETE',});
    branchs.value = branchs.value.filter((branch) => branch.id !== id);
  } catch (error) {
    console.error('Error deleting branch:', error);
  }
};

onMounted(() => {
  getbranch();
});
</script>

<style scoped>

</style>