<template>
  <div>
    <h1>Create Album</h1>
    <form @submit.prevent="handleSubmit">
      <div class="branch">
        <select v-model="form.branch_id" required>
          <option value="" disabled>Select branch</option>
          <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="form.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="form.description" required />
      </div>
      <div class="form-group">
        <label for="images">Upload Images</label>
        <input id="images" type="file" multiple @change="handleFileUpload" accept="image/*" />
      </div>
      <div v-if="previewImages.length" class="preview">
        <h3>Image Preview:</h3>
        <div class="image-grid">
          <img v-for="(src, index) in previewImages" :key="index" :src="src" alt="Preview" />
        </div>
      </div>
      <button type="submit">Create</button>
    </form>

    <nuxt-link to="/album">Back</nuxt-link>
  </div>
</template>

<script setup>
import { useFetch } from 'nuxt/app';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const error = ref('');

const form = ref({
  branch_id: '',
  title: '',
  description: '',
  images: [],
});

const branchs = ref([]);
const getBranch = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('token is missing');
            return;
        }
        const { data } = await useFetch('http://localhost:5000/branch/by-school', {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (error.value) {
          console.error('Error from API:', error.value.message);
          branchs.value = [];
          return;
        }

        branchs.value = data.value || [];
        console.log('fetch branch:', branchs.value)
    } catch (error) {
        console.error('Catch fetching branch:', error.message);
    }
}


const previewImages = ref([]);

const handleFileUpload = (event) => {
  const files = event.target.files;
  form.value.images = files;
  previewImages.value = Array.from(files).map(file => URL.createObjectURL(file));
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  Array.from(form.value.images).forEach((file) => { 
    formData.append('images', file); 
  });

  try {
    await useFetch('http://localhost:5000/album', {
      method: 'POST',
      body: formData,
    });
    alert('Album created successfully!');
    router.push('/album')
  } catch (err) {
    console.error(err);
    alert('Failed to create album.');
  }
};

onMounted(() => {
  getBranch();
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
  max-width: 500px;
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
input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 5px;
}

input[type="text"]:focus,
input[type="file"]:focus {
  border-color: #007bff; /* Đường viền xanh */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút Submit */
button[type="submit"] {
  background-color: #007bff; /* Xanh dương */
  color: #ffffff; /* Chữ trắng */
  font-size: 16px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: block;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Xanh đậm hơn */
  transform: translateY(-2px); /* Hiệu ứng nhấn */
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

/* Preview Image Styling */
.preview {
  margin-top: 20px;
}

.preview h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #34495e; /* Xanh đậm */
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-grid img {
  max-width: 100px;
  border: 1px solid #ddd; /* Đường viền xám nhạt */
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hiệu ứng nổi nhẹ */
  transition: transform 0.3s, box-shadow 0.3s;
}

.image-grid img:hover {
  transform: scale(1.05); /* Phóng to nhẹ */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Hiệu ứng nổi khi hover */
}

</style>