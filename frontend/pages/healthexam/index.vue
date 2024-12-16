<template>
    <div class="class-page">
        <h1>List health exam
            <nuxt-link to="/healthexam/createhealthexam">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="healthexam in healthexams" :key="healthexam.id">
                        <td>{{ healthexam.date }}</td>
                        <td>{{ healthexam.note }}</td>
                        <td>
                            <nuxt-link :to="`/healthexam/updatehealthexam/${healthexam._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deleteclass(Class._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const healthexams = ref([]);

const fetchClass = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/healthexam',);
        healthexams.value = data.value
    } catch (error) {
        console.error('Catch fetching healthexam:', error);
    }
};

const deleteclass = async (id) => {
  try {
    await useFetch(`http://localhost:5000/healthexam/${id}`, {method: 'DELETE',});
    healthexams.value = healthexams.value.filter((healthexam) => healthexam.id !== id);
  } catch (error) {
    console.error('Error deleting healthexam:', error);
  }
};

onMounted(() => {
  fetchClass();
});

</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
    border: 1px solid ;
}

th {
    background-color: rgb(227, 242, 255);
}

.edit-button {
  padding: 5px 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 5px;
  display: inline-block;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  padding: 5px 10px;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #a71d2a;
}
</style>