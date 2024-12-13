<template>
    <div class="class-page">
        <h1>List class
            <nuxt-link to="/class/createclass">+ Add New</nuxt-link>
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
                    <tr v-for="Class in classes" :key="Class.id">
                        <td>{{ Class.code }}</td>
                        <td>{{ Class.name }}</td>
                        <td>{{ Class.age }}</td>
                        <td>
                            <nuxt-link :to="`/class/updateclass/${Class._id}`" class="edit-button">Edit</nuxt-link>
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
const classes = ref([]);

const fetchClass = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/class',);
        classes.value = data.value
    } catch (error) {
        console.error('Catch fetching classes:', error);
    }
};

const deleteclass = async (id) => {
  try {
    await useFetch(`http://localhost:5000/class/${id}`, {method: 'DELETE',});
    classes.value = classes.value.filter((Class) => Class.id !== id);
  } catch (error) {
    console.error('Error deleting class:', error);
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