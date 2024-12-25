<template>
    <div class="student-page">
        <h1>List students
            <nuxt-link to="/student/createstudent">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in student" :key="item._id">
                        <td>{{ item.code }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.birthday }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.address }}</td>
                        <td>
                            <nuxt-link :to="`/student/updatestudent/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin_dashboard">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const student = ref([]);

const getAllStudent = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/student',);
        student.value = data.value
    } catch (error) {
        console.error('Catch fetching students:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/student/${id}`, {method: 'DELETE',});
    student.value = student.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

onMounted(() => {
  getAllStudent();
});

</script>

<style scoped>

</style>