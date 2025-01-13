<template>
    <div>
        <h1>Import parent file</h1>
        <p>1. Before import data, you must create school information, branches information and classes.</p>
        <p>2. Your CSV data should be in the format below. The first line of your CSV file should be the column headers as in the table example. Do not change the sheet order.</p>
        <p>3. All columns with signs * are columns that must have data, do not allow empty.</p>
        <p>4. All columns must text/value format and don't use formula or function.</p>
        <table>
            <thead>
                <tr>
                    <th>*Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Birthday(y-m-d)</th>
                    <th>Gender <br>(1: Male<br>2: Female)</th>
                    <th>*Email</th>
                    <th>*Password</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nguyen Tien Dung</td>
                    <td>0987654321</td>
                    <td>Newyork</td>
                    <td>1997-07-18</td>
                    <td>1</td>
                    <td>tiendung123@gmail.com</td>
                    <td>dung123456</td>
                </tr>
                <tr>
                    <td>Nguyen Ha My</td>
                    <td>0921346578</td>
                    <td>Vietnam</td>
                    <td>1998-07-18</td>
                    <td>2</td>
                    <td>hamy123@gmail.com</td>
                    <td>hamy0718</td>
                </tr>
            </tbody>
        </table>
        <form @submit.prevent="handleSubmit">
            <div class="branch">
                <select v-model="branch_id" id="branch" @change="handleBranchChange" required>
                    <option value="" disabled>Select branch</option>
                    <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                        {{ branch.name }}
                    </option>
                </select>
            </div>
            <div class="excelfile">
                <label for="excelfile">Import file</label>
                <input id="excelfile" type="file" @change="handleFileUpload" accept=".xlsx, .xls" required>
            </div>
            <button @click="uploadParent">Upload parent</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="/parent">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { readParentsExcel } from '@/utils/ReadFileParent';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});
const router = useRouter();
const error = ref('');
const branchs = ref([]);
const branch_id = ref('');
const file = ref(null);
const parents = ref([]);
const getBranchs = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await $fetch('http://localhost:5000/branch/by-school', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
        branchs.value = res || [];
        console.log('fetch branch in import:', branchs.value);
    } catch (error) {
        console.error('error fetch branchs:', error);
    }
}

const handleFileUpload = async (event) => {
    file.value = event.target.files[0];
    if (!file.value) {
        error.value = 'No file selected.';
        return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = await readParentsExcel(e.target.result);
            parents.value = data.map((parent) => ({
                ...parent,
                branch_id: branch_id.value,
            }));
        } catch (err) {
            error.value = 'Failed to process the file.';
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file.value);
};

const uploadParent = async () => {
    try {
        const res = await $fetch(`http://localhost:5000/auth/importexcel`, {
            method: 'POST',
            body: parents.value,
        });
        console.log('response parents:', res);
        alert('add parents successfully');
        router.push('/parent');
    } catch (error) {
        console.log('data post:', res);
        error.value = 'faild to upload parents';
        console.error('error upload parents:', error);
    }
}

onMounted(() => {
    getBranchs();
})

</script>

<style scoped>
/* Toàn bộ container */
div {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

/* Tiêu đề */
h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
}

/* Các đoạn mô tả */
p {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
}

/* Bảng mẫu */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

table th,
table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

table th {
    background-color: #f0f0f0;
    font-weight: bold;
    color: #333;
}

table tbody tr:nth-child(even) {
    background-color: #f7f7f7;
}

/* Form */
form {
    margin-top: 20px;
}

form .branch,
form .excelfile {
    margin-bottom: 15px;
}

/* Dropdown và input file */
select,
input[type="file"] {
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

select:focus,
input[type="file"]:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
}

/* Giới hạn chiều rộng của ô select branch */
form .branch select {
    max-width: 300px; /* Chiều rộng tối đa */
    width: 100%; /* Đảm bảo ô không vượt quá kích thước container */
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}

/* Nút bấm */
button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Liên kết quay lại */
a {
    display: inline-block;
    margin-top: 10px;
    color: #4a90e2;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}

a:hover {
    color: #357ab8;
}

/* Thông báo lỗi */
p[v-if="error"] {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
