<template>
    <div class="user-page">
        <h1>List user</h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <!-- <th>Image</th> -->
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <!-- <th>Role</th> -->
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in user" :key="item._id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.birthday }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            ABCDEF
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const user = ref([]);

const getAllUser = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/auth',);
        user.value = data.value || [];
    } catch (error) {
        console.error('Catch fetching users:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/auth/${id}`, {method: 'DELETE',});
    user.value = user.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

onMounted(() => {
  getAllUser();
});

</script>

<style scoped>
/* General page styles */
.user-page {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
}

/* Table container */
.table-container {
    overflow-x: auto;
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

/* Table header styles */
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

/* Button styles (if you want to add delete or other buttons) */
button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

/* Button hover effect */
button:hover {
    background-color: #d32f2f;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .user-page {
        padding: 10px;
    }

    table {
        width: 100%;
        font-size: 14px;
    }

    th, td {
        padding: 8px;
    }

    button {
        font-size: 12px;
        padding: 6px 12px;
    }
}

</style>