<template>
  <div class="album-images-page">
    <h1>Album Images</h1>
    <div class="images-container">
      <div v-for="image in images" :key="image" class="image-item">
        <img :src="image" alt="Album Image" />
      </div>
    </div>
    <button @click="addNewImages" class="add-images-button">Add New Images</button>
    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
});
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

const addNewImages = async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.accept = 'image/*';

  input.onchange = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    try {
      const albumId = route.params.id;
      const { error } = await useFetch(`http://localhost:5000/album/${albumId}/add-images`, {
        method: 'PATCH',
        body: formData,
      });

      if (error.value) {
        throw new Error('Failed to add new images');
      }

      alert('Images added successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error adding new images:', error);
      alert('Failed to add new images.');
    }
  };

  input.click();
};

onMounted(() => {
  fetchImages();
});
</script>

<style scoped>
.album-images-page {
  padding: 20px;
  background-color: #f9f9f9; /* Màu nền nhẹ cho trang */
  min-height: 100vh; /* Đảm bảo trang chiếm toàn bộ chiều cao */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333; /* Màu chữ đậm cho tiêu đề */
}

.images-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Bố cục dạng lưới */
  gap: 16px; /* Khoảng cách giữa các ảnh */
  justify-items: center; /* Canh giữa các ảnh */
  padding: 10px;
}

.image-item img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Cắt hình ảnh phù hợp */
  border-radius: 8px; /* Bo góc nhẹ cho ảnh */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ cho ảnh */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng phóng to và bóng khi hover */
}

.image-item img:hover {
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Hiệu ứng bóng đổ khi hover */
}

.add-images-button {
  display: block;
  margin: 20px auto;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-images-button:hover {
  background-color: #45a049; /* Màu sắc khi hover */
}

a {
  display: inline-block;
  margin-top: 1rem;
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

