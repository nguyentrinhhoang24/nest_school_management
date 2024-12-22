<template>
<!-- code title price description -->
    <div class="feeitem-page">
        <h1>List feeitem
            <nuxt-link to="/feeitem/createfeeitem">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in feeitem" :key="item.id">
                        <td>{{ item.code }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <nuxt-link :to="`/feeitem/updatefeeitem/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="deletefeeitem(item._id)">Delete</button>
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
const feeitem = ref([]);

const getfeeitem = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/feeitem',);
        feeitem.value = data.value
    } catch (error) {
        console.error('Catch fetching feeitem:', error);
    }
};

const deletefeeitem = async (id) => {
  try {
    await useFetch(`http://localhost:5000/feeitem/${id}`, {method: 'DELETE',});
    feeitem.value = feeitem.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting feeitem:', error);
  }
};

onMounted(() => {
  getfeeitem();
});
</script>

<style scoped>

</style>