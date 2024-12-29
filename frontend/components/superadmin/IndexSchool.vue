<template>
    <div class="school-page">
        <h1>List school</h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>School name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in school" :key="item._id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.status }}</td>
                        <td>
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
const school = ref([]);

const getAllSchool = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/school',);
        school.value = data.value || [];
    } catch (error) {
        console.error('Catch fetching schools:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/school/${id}`, {method: 'DELETE',});
    school.value = school.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting school:', error);
  }
};

onMounted(() => {
  getAllSchool();
});

</script>

<style scoped>
/* General page styles */
.school-page {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f4f4f9;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
}

td {
    color: #555;
}

/* Hover effect on table rows */
tr:hover {
    background-color: #f1f1f1;
}

/* Delete Button Styles */
.delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

/* Change button color on hover */
.delete-button:hover {
    background-color: #d32f2f;
}

/* Table header and data */
table th, table td {
    padding: 10px;
    text-align: left;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .school-page {
        padding: 10px;
    }

    table {
        width: 100%;
        font-size: 14px;
    }

    th, td {
        padding: 8px;
    }

    .delete-button {
        font-size: 12px;
        padding: 6px 12px;
    }
}

</style>