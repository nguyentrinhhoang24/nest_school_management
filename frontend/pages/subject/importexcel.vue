<template>
    <div>
        <h1>Import subject file</h1>
        <p>1. Before import data, you must create school information and branches.</p>
        <p>2. Your CSV data should be in the format below. The first line of your CSV file should be the column headers as in the table example. Do not change the sheet order.</p>
        <p>3. All columns with signs * are columns that must have data, do not allow empty.</p>
        <p>4. All columns must text/value format and don't use formula or function.</p>
        <table>
            <thead>
                <tr>
                    <th>*Code</th>
                    <th>*Title</th>
                    <th>Description</th>
                    <th>Status <br>(1: Active<br>2: Draft)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>S001</td>
                    <td>English</td>
                    <td>Study english</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>S002</td>
                    <td>Math</td>
                    <td>Study math</td>
                    <td>2</td>
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
            <!-- <div class="class">
                <select v-model="class_id" id="class" required>
                    <option value="" disabled>Select class</option>
                    <option v-for="Class in classes" :key="Class.id" :value="Class._id">
                        {{ Class.name }}
                    </option>
                </select>
            </div> -->
            <div class="excelfile">
                <label for="excelfile">Import file</label>
                <input id="excelfile" type="file" @change="handleFileUpload" accept=".xlsx, .xls" required>
            </div>
            <button @click="uploadSubjects">Upload subject</button>
        </form>
        <p v-if="error">{{ error }}</p>
        <nuxt-link to="/subject">Back</nuxt-link>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { readExcel } from '@/utils/ReadFileSubject';
import { useRouter } from 'vue-router';
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
  allowedRoles: ['schooladmin'],
});

const error = ref('');
const branch_id = ref('');
const class_id = ref('');
const branchs = ref([]);
const classes = ref([]);
const file = ref(null);
const subjects = ref([]);
const router = useRouter();

const getBranchs = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const res = await $fetch('http://localhost:5000/branch/by-school', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        branchs.value = res || [];
        console.log('fetch branch in subject:', branchs.value);
    } catch (error) {
        console.error('fetch branches error:', error);
    }
}

// const getClassByBranch = async (branch_id) => {
//     try {
//         const res = await $fetch(`http://localhost:5000/class/by-branch/${branch_id}`);
//         classes.value = res || [];
//         console.log('fetch class in subject:', classes.value);
//     } catch (error) {
//         console.error('fetch classes error:', error);
//     }
// }

const handleFileUpload = async (event) => {
    file.value = event.target.files[0];
    if (!file.value) {
        error.value = 'No file selected.';
        return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = await readExcel(e.target.result);
            subjects.value = data.map((subject) => ({
                ...subject,
                branch_id: branch_id.value,
                // class_id: class_id.value,
            }));
        } catch (err) {
            error.value = 'Failed to process the file.';
            console.error(err);
        }
    };
    reader.readAsArrayBuffer(file.value);
};

// const handleBranchChange = () => {
//     if(branch_id.value) {
//         getClassByBranch(branch_id.value);
//     }else {
//         classes.value = [];
//     }
// }

const uploadSubjects = async () => {
    try {
        const res = await $fetch(`http://localhost:5000/subject/importfile`, {
            method: 'POST',
            body: subjects.value,
        });
        console.log('response subjects:', res);
        alert('add subjects successfully');
        router.push('/subject');
    } catch (error) {
        error.value = 'faild to upload subjects';
        console.error('error upload subjects:', error);
    }
}

// watch(branch_id, getClassByBranch);

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
