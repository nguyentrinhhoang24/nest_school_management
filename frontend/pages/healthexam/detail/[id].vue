<template>
    <div>
        <h1>Medical Student class: {{ classData?.name }}</h1>
        <div v-if="students.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Student name</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>BloodGroup</th>
                        <th>Allergy</th>
                        <th>Heart rate</th>
                        <th>Eyes</th>
                        <th>Ears</th>
                        <th>Note</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student._id">
                        <td>{{ student.code }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.health?.height || '-' }}</td>
                        <td>{{ student.health?.weight || '-' }}</td>
                        <td>{{ student.health?.bloodgroup || '-' }}</td>
                        <td>{{ student.health?.allergy || '-' }}</td>
                        <td>{{ student.health?.heartrate || '-' }}</td>
                        <td>{{ student.health?.eyes || '-' }}</td>
                        <td>{{ student.health?.ears || '-' }}</td>
                        <td>{{ student.health?.note || '-' }}</td>
                        <td>
                            <nuxt-link :to="`/student/updatehealth/${student._id}`" class="edit-button">Edit</nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/healthexam">Back</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'nuxt/app' 
definePageMeta({
  layout: 'dashboard',
});

const route = useRoute();
const error = ref('');
const healthexamId = route.params.id;
const healthexam = ref('');
const classData = ref('');
const students = ref('');

const getDetails = async () => {
    try {
        const res = await $fetch(`http://localhost:5000/healthexam/${healthexamId}`);
        healthexam.value = res;
        console.log('fetch health examination:', healthexam.value);
        const resClass = await $fetch(`http://localhost:5000/class/${healthexam.value.class_id}`);
        classData.value = resClass;
        console.log('fetch health examination:', classData.value);
        const resStudents = await $fetch(`http://localhost:5000/student/classid/${healthexam.value.class_id}`);
        students.value = resStudents;
        console.log('fetch health examination:', students.value);
    } catch (error) {
        console.error('fetch detail health exam error', error);
    }
}

onMounted(() => {
    getDetails();
})

</script>

<style scoped>
.medical-student-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.medical-student-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.medical-student-page h1 a {
  background-color: #28a745; /* Màu xanh lá */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.medical-student-page h1 a:hover {
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

.edit-button {
  background-color: #ffc107; /* Màu vàng */
  color: #fff;
  padding: 8px 12px;
  font-size: 14px;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button:hover {
  background-color: #e0a800;
  transform: translateY(-2px);
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
