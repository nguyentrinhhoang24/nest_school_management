<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="branch">
        <select v-model="form.branch_id" id="branch" @change="handleBranchChange" required>
          <option value="" disabled>Select branch</option>
          <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
          </option>
        </select>
      </div>
      <!-- Title Input -->
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Eg: September tuition ..."
          required
        />
      </div>

      <!-- Payment Deadline -->
      <div>
        <label for="deadline">Payment deadline</label>
        <input type="date" id="deadline" v-model="form.payment_deadline" required />
      </div>

      <!-- Payment Method -->
      <div>
        <label for="paymentMethod">Payment method</label>
        <select v-model="form.payment_method" id="paymentMethod">
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="form.description" type="text" required />
      </div>

      <div class="selectClassOrStudent">
        <label>Invoice for:</label>
        <label>
            <input type="radio" v-model="form.invoicefor" value="class" />
            Class
        </label>
        <label>
            <input type="radio" v-model="form.invoicefor" value="student" />
            Student
        </label>
      </div>

      <!-- Class or student -->
      <div v-if="form.invoicefor === 'class'" class="class">
        <select v-model="form.class_id" id="class">
          <option value="" disabled>Select class</option>
          <option v-for="Class in classes" :key="Class.id" :value="Class._id">
            {{ Class.name}}
          </option>
        </select>
      </div>
      <div v-if="form.invoicefor === 'student'" class="student">
        <select v-model="form.student_id" id="student">
          <option value="" disabled>Select student</option>
          <option v-for="student in students" :key="student.id" :value="student._id">
            {{ student.name}}
          </option>
        </select>
      </div>

      <!-- Fee Items Table -->
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fee item</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.fee_items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <select v-model="item.fee_item" @change="updateUnitPrice(index)">
                <option value="" disabled>Select fee item</option>
                <option v-for="fee in feeitems" :key="fee.id" :value="fee._id">
                  {{ fee.title }}
                </option>
              </select>
            </td>
            <td>{{ formatCurrency(item.unitPrice) }}$</td>
            <td>
              <input type="number" v-model.number="item.quantity" min="1" placeholder="Quantity" @input="updateSubtotal(index)" />
            </td>
            <td>{{ formatCurrency(item.subtotal) }}</td>
            <td>
              <button type="button" @click="removeItem(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Item Button -->
      <button type="button" @click="addItem">+ Add new</button>

      <!-- Submit Button -->
      <button type="submit">Create</button>
    </form>

    <!-- Error Display -->
    <p v-if="error">{{ error }}</p>
    <nuxt-link to="/invoice">Back</nuxt-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFetch } from '#app';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  branch_id: '',
  title: '',
  payment_deadline: '',
  payment_method: 'cash',
  description: '',
  invoicefor: '',
  class_id: '',
  student_id: '',
  fee_items: [{ fee_item: '', quantity: 1, unitPrice: 0, subtotal: 0 }], 
});

const feeitems = ref([]);
const error = ref('');
const branchs = ref([]);
const classes = ref([]);
const students  = ref([]);

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      console.log('token is missing');
      return;
    }
    const { data } = await useFetch('http://localhost:5000/branch/by-school', {
            headers: { Authorization: `Bearer ${token}` },
    });
    branchs.value = data.value;
  } catch (error) {
    console.log('error fetch branch:', error)
  }
}

const getClasses = async (branch_id) => {
  try {
    const { data } = await useFetch(`http://localhost:5000/class/by-branch/${branch_id}`);
    classes.value = data.value || [];
    console.log('fetch classes:', classes.value);
  } catch (error) {
    console.error('error fetch classes:', error);
  }
}

const getStudents = async (branch_id) => {
  try {
    const { data } = await useFetch(`http://localhost:5000/student/branch/${branch_id}`);
    students.value = data.value || [];
    console.log('fetch students:', students.value);
  } catch (error) {
    console.error('error fetch students:', error);
  }
}

// Fetch fee items on mounted
const getFeeItems = async (branch_id) => {
  try {
    const branchId = form.value.branch_id;
    const { data } = await useFetch(`http://localhost:5000/feeitem/by-branch/${branchId}`);
    feeitems.value = data.value || [];
    // console.log('Fee items:', JSON.stringify(data.value, null, 2));
  } catch (err) {
    error.value = 'Failed to fetch fee items. Please try again.';
    console.error(err);
  }
};

const handleBranchChange = () => {
  if (form.value.branch_id) {
    getClasses(form.value.branch_id);
    getStudents(form.value.branch_id);
    getFeeItems(form.value.branch_id);
  } else {
    feeitems.value = [];
    classes.value = [];
    students.value = [];
  }
}


// Add new fee item
const addItem = () => {
  form.value.fee_items.push({ fee_item: '', quantity: 1, unitPrice: 0, subtotal: 0 });
};

// Remove fee item
const removeItem = (index) => {
  form.value.fee_items.splice(index, 1);
};

// Update unit price based on selected fee item
const updateUnitPrice = (index) => {
  const feeItemId = form.value.fee_items[index].fee_item;
  console.log('Select item ID:', feeItemId);
  const feeItem = feeitems.value.find((fee) => fee._id === feeItemId);
  
  if (feeItem) {
    console.log('Fee item found:', feeItem);
    form.value.fee_items[index].unitPrice = feeItem.price;
    updateSubtotal(index);
  }
};

// Update subtotal based on unit price and quantity
const updateSubtotal = (index) => {
  const item = form.value.fee_items[index];
  item.subtotal = item.unitPrice * item.quantity;
};

// Format currency for display
const formatCurrency = (value) => `${value.toFixed(2)}`;

// Handle form submission
const handleSubmit = async () => {
  const payload = {
    branch_id: form.value.branch_id,
    title: form.value.title,
    payment_deadline: form.value.payment_deadline,
    payment_method: form.value.payment_method,
    description: form.value.description,
    fee_items: form.value.fee_items
      .filter((item) => item.fee_item && item.quantity > 0)
      .map((item) => ({
        fee_item: item.fee_item,
        quantity: item.quantity,
      })),
  };

  if (payload.fee_items.length === 0) {
    error.value = 'Please add at least one fee item.';
    return;
  }

  try {
    await useFetch('http://localhost:5000/invoice', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/invoice');
    alert('Invoice created successfully!');
  } catch (err) {
    error.value = 'Error creating invoice. Please try again.';
    console.error(err);
  }
};
onMounted(() => {
  getBranchs();
});
</script>

<style scoped>
/* Tổng thể */
body {
  font-family: Arial, sans-serif;
  background-color: #f9fafb; /* Nền sáng */
  color: #2c3e50; /* Màu chữ tối */
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #34495e; /* Xanh đậm */
  font-size: 28px;
  margin-bottom: 20px;
}

/* Form Styling */
form {
  background-color: #ffffff; /* Nền trắng */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi */
  max-width: 600px;
  margin: 0 auto;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50; /* Xanh đậm */
}

input[type="text"],
input[type="file"],
input[type="date"],
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="text"]:focus,
input[type="file"]:focus,
input[type="date"]:focus,
select:focus {
  border-color: #007bff; /* Đường viền xanh */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button[type="submit"] {
  background-color: #007bff; /* Xanh dương */
  color: #ffffff; /* Chữ trắng */
  font-size: 14px; /* Giảm kích thước font */
  padding: 8px 12px; /* Giảm kích thước padding */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%; /* Chiều rộng full */
  margin-top: 10px; /* Khoảng cách giữa các nút */
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}

/* Nút "+ Add New" */
button[type="button"] {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #ffffff; /* Chữ trắng */
  font-size: 14px; /* Kích thước font vừa phải */
  padding: 8px 12px; /* Giảm kích thước padding */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: auto; /* Làm nút ngắn lại */
  margin-top: 10px; /* Khoảng cách giữa các nút */
}

button[type="button"]:hover {
  background-color: #218838; /* Xanh lá đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
}




/* Bảng Fee Items */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th, table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd; /* Đường viền nhẹ */
}

table th {
  background-color: #f4f6f9;
  color: #34495e;
}

table td {
  background-color: #ffffff;
}

table input[type="number"] {
  width: 100px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="button"] {
  background-color: #3c80e7;
  margin-top: 10px;
}

button[type="button"]:hover {
  background-color: #3c4adf; /* Đỏ đậm hơn */
}

/* Link Trở Về */
.nuxt-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

.nuxt-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Thông báo lỗi */
p {
  color: #e74c3c;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

</style>
