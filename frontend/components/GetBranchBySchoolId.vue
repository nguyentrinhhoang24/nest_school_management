<template>
    <div>
        <td>
            <select v-model="item.branch">
            <option value="" disabled>Select branch</option>
            <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
                {{ branch.title }}
            </option>
            </select>
        </td>
    </div>
</template>

<script setup>
const token = localStorage.getItem('token');
const branchs = ref([]);
const getListBranch = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/branch/by-school', {
            method: 'GET', 
            headers: { 'Authorization': `Bearer ${token}` },
        });
        branchs.value = data.value || [];
    } catch (error) {
        console.error('Catch fetching branch:', error);
    }
}

</script>

<style scoped>

</style>