<template>
    <div class="classgroup-page">
        <h1>List Class Group
            <nuxt-link to="/classgroup/createclassgroup">+ Add New</nuxt-link>
        </h1>
        <div class="branch">
          <select v-model="branch_id" id="branch">
            <option value="" disabled>Select branch</option>
            <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
            </option>
          </select>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
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
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const branchs  = ref([]);
const branch_id = ref('');
const classgroups = ref([]);
const error = ref('');

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('token is missing');
      return;
    }
    const { data } = await useFetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branchs.value = [];
      return;
    }
    branchs.value = data.value || [];
    console.log('fetch branch:', branchs.value);

    if(branchs.value.length > 0) {
      branch_id.value = branchs.value[0]._id;
    }
  } catch (error) {
    console.error('error fetch branch:', error);
  }
}

const getClassGroup = async (branch_id) => {
    try {
        const { data } = await useFetch(`http://localhost:5000/classgroup/by-branch/${branch_id}`,);
        classgroups.value = data.value || [];
        console.log('fetch class group:', classgroups.value);
    } catch (error) {
        console.error('Catch fetching class groups:', error);
    }
};

const deleteclassgroup = async (id) => {
  try {
    await useFetch(`http://localhost:5000/classgroup/${id}`, {method: 'DELETE',});
    classgroups.value = classgroups.value.filter((classgroup) => classgroup.id !== id);
    alert('delete class group successfully');
  } catch (error) {
    console.error('Error deleting class group:', error);
  }
};

watch(branch_id, getClassGroup);

onMounted(() => {
  getBranchs();
});
</script>

<style scoped>
.classgroup-page {
  padding: 20px;
  background-color: #f7f9fc; /* Màu nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.classgroup-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh đậm */
}

.classgroup-page h1 a {
  background-color: #28a745; /* Màu xanh lá */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.classgroup-page h1 a:hover {
  background-color: #218838; /* Màu xanh lá đậm khi hover */
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

.classgroup-page a {
  color: #002751;
  text-decoration: none;
}

.classgroup-page a:hover {
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

