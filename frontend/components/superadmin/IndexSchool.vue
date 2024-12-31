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
.school-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.school-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
  border-radius: 5px; /* Bo góc nhẹ */
  overflow: hidden;
}

thead th {
  background-color: #002751;
  color: #fff;
  text-align: left;
  padding: 12px;
  font-size: 16px;
  border-bottom: 2px solid #ddd;
}

tbody td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}

tbody tr:hover {
  background-color: #f1f1f1; /* Highlight hàng khi hover */
}

.delete-button {
  background-color: #dc3545; /* Màu đỏ */
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
}

.delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .school-page {
    padding: 10px;
  }

  table {
    font-size: 14px;
  }

  thead th, tbody td {
    padding: 8px;
  }

  .delete-button {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>
