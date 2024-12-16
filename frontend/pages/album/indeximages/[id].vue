<template>
  <div class="album-images-page">
    <h1>Album Images</h1>
    <div class="images-container">
      <div v-for="image in images" :key="image" class="image-item">
        <img :src="image" alt="Album Image" />
      </div>
    </div>
    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const images = ref([]);
const route = useRoute();

const fetchImages = async () => {
  try {
    const albumId = route.params.id;
    const { data } = await useFetch(`http://localhost:5000/album/${albumId}`);
    images.value = data.value?.images || [];
  } catch (error) {
    console.error('Error fetching album images:', error);
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<style scoped>
.album-images-page {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.images-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Bố cục dạng lưới */
  gap: 16px; /* Khoảng cách giữa các ảnh */
  justify-items: center; /* Canh giữa các ảnh */
}

.image-item img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Cắt hình ảnh phù hợp */
  border-radius: 8px; /* Bo góc nhẹ cho ảnh */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease; /* Hiệu ứng phóng to khi hover */
}

.image-item img:hover {
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
}
</style>
