<template>
<!-- title payment_deadline payment_method fee_items{fee_item, quantity} total -->
    <div class="invoice-page">
        <h1>List invoice
            <nuxt-link to="/invoice/createinvoice">+ Add New</nuxt-link>
        </h1>
        <div class="branch">
          <select v-model="branch_id" id="branch">
            <option value="" disabled>Select branch</option>
            <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
            </option>
          </select>
        </div>
        <div v-if="branchs && branchs.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Total</th>
                        <th>Payment deadline</th>
                        <th>Payment method</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in invoices" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ item.total }}$</td>
                        <td>{{ item.payment_deadline }}</td>
                        <td>{{ item.payment_method }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <nuxt-link :to="`/invoice/updateinvoice/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deleteinvoice(item._id)">Delete</button>
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
definePageMeta({
  layout: 'dashboard',
});
const branchs  = ref([]);
const branch_id = ref('');
const invoices = ref([]);
const error = ref('');

const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token) {
      console.log('token is missing');
      return;
    }
    const res = await $fetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branchs.value = [];
      return;
    }
    branchs.value = res || [];
    console.log('fetch branch:', branchs.value);

    if(branchs.value.length > 0) {
      branch_id.value = branchs.value[0]._id;
    }
  } catch (error) {
    console.error('error fetch branch:', error);
  }
}

const getInvoiceByBranch = async (branch_id) => {
    try {
        const res = await $fetch(`http://localhost:5000/invoice/branchid/${branch_id}`,);
        invoices.value = res || [];
        console.log('fetch invoice:', invoices.value);
    } catch (error) {
        console.error('Catch fetching invoice:', error);
    }
};

const deleteinvoice = async (id) => {
  try {
    await useFetch(`http://localhost:5000/invoice/${id}`, {method: 'DELETE',});
    invoices.value = invoices.value.filter((item) => item.id !== id);
    await getInvoiceByBranch(branch_id.value);
    alert('delete invoice successfully');
  } catch (error) {
    console.error('Error deleting invoice:', error);
  }
};

watch(branch_id, getInvoiceByBranch);

onMounted(() => {
  getBranchs();
});
</script>

<style scoped>
.invoice-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.invoice-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.invoice-page h1 a {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.invoice-page h1 a:hover {
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

.index-button {
  background-color: #17a2b8; /* Màu xanh dương nhạt */
  color: #fff;
}

.index-button:hover {
  background-color: #138496;
  transform: translateY(-2px); /* Hiệu ứng nhấn */
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

.invoice-page a {
  color: #002751;
  text-decoration: none;
}

.invoice-page a:hover {
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
