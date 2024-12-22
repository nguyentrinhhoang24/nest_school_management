<template>
<!-- title payment_deadline payment_method fee_items{fee_item, quantity} total -->
    <div class="invoice-page">
        <h1>List invoice
            <nuxt-link to="/invoice/createinvoice">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Total</td>
                        <td>Payment deadline</td>
                        <td>Payment method</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in invoice" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ item.total }}</td>
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
        <nuxt-link to="/schooladmin_dashboard">Back to dashborad</nuxt-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const invoice = ref([]);

const getinvoice = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/invoice',);
        invoice.value = data.value
    } catch (error) {
        console.error('Catch fetching invoice:', error);
    }
};

const deleteinvoice = async (id) => {
  try {
    await useFetch(`http://localhost:5000/invoice/${id}`, {method: 'DELETE',});
    invoice.value = invoice.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting invoice:', error);
  }
};

onMounted(() => {
  getinvoice();
});
</script>

<style scoped>

</style>