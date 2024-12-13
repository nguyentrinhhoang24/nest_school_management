<template>
    <div class="classgroup-page">
        <h1>List Class Group
            <nuxt-link to="/classgroup/createclassgroup">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Description</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classgroup in classgroups" :key="classgroup.id">
                        <td>{{ classgroup.title }}</td>
                        <td>{{ classgroup.description }}</td>
                        <td>{{ classgroup.status }}</td>
                        <td>
                            <nuxt-link :to="`/classgroup/updateclassgroup/${classgroup._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deleteclassgroup(classgroup._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const classgroups = ref([]);

const getClassGroup = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/classgroup',);
        classgroups.value = data.value
    } catch (error) {
        console.error('Catch fetching class groups:', error);
    }
};

const deleteclassgroup = async (id) => {
  try {
    await useFetch(`http://localhost:5000/classgroup/${id}`, {method: 'DELETE',});
    classgroups.value = classgroups.value.filter((classgroup) => classgroup.id !== id);
  } catch (error) {
    console.error('Error deleting class group:', error);
  }
};

onMounted(() => {
  getClassGroup();
});
</script>

<style scoped>

</style>