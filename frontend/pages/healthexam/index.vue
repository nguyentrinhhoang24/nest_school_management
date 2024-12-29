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
                        <th>Active</th>
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
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
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
.class-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.class-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.class-page h1 nuxt-link {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.class-page h1 nuxt-link:hover {
  background-color: #218838; /* Màu xanh lá đậm hơn khi hover */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
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

.index-button,
.edit-button,
.delete-button {
  display: inline-block;
  margin-right: 10px;
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button {
  background-color: #ffc107; /* Màu vàng */
  color: #fff;
}

.edit-button:hover {
  background-color: #e0a800;
  transform: translateY(-2px);
}

.delete-button {
  background-color: #dc3545; /* Màu đỏ */
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.class-page a {
  color: #002751;
  text-decoration: none;
}

.class-page a:hover {
  text-decoration: underline;
}

.nuxt-link {
  margin-top: 20px;
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
