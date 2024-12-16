<template>
    <div class="album-page">
        <h1>List album
            <nuxt-link to="/album/createalbum">+ Add New</nuxt-link>
        </h1>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in album" :key="item.id">
                        <td>
                            <!-- Hiển thị hình ảnh đầu tiên trong album -->
                            <img
                                v-if="item.images && item.images.length"
                                :src="item.images[0]"
                                alt="Album Image"
                                style="max-width: 100px;"
                            />
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <nuxt-link :to="`/album/indeximages/${item._id}`" class="index-button">View Images</nuxt-link>
                            <nuxt-link :to="`/album/updatealbum/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const album = ref([]);

const getAllAlbum = async () => {
    try {
        const { data } = await useFetch('http://localhost:5000/album',);
        album.value = data.value || []
    } catch (error) {
        console.error('Catch fetching album:', error);
    }
};

const remove = async (id) => {
  try {
    await useFetch(`http://localhost:5000/album/${id}`, {method: 'DELETE',});
    album.value = album.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error('Error deleting album:', error);
  }
};

onMounted(() => {
  getAllAlbum();
});

</script>

<style scoped>

</style>