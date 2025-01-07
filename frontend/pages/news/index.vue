<template>
    <div class="news-page">
        <h1>List news
            <nuxt-link to="/news/createnews">+ Add new</nuxt-link>
            
        </h1>
        <div class="branch">
          <select v-model="branch_id" id="branch" @change="handleBranchChange" required>
            <option value="" disabled>Select branch</option>
            <option v-for="branch in branchs" :key="branch.id" :value="branch._id">
              {{ branch.name }}
            </option>
          </select>
        </div>
        <div class="tag">
          <select v-model="tag_id" id="tag">
            <option value="">All tags</option>
            <option v-for="tag in tags" :key="tag._id" :value="tag._id">
              {{ tag.title }}
            </option>
          </select>
        </div>
        <div v-if="branchs && branchs.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Tag</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in news" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ getCategoryTitle(item.category_id) }}</td>
                        <td>{{ getTagTitle(item.tag_id) }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.status }}</td>
                        <td>
                            <nuxt-link :to="`/news/updatenews/${item._id}`" class="edit-button">Edit</nuxt-link>
                            <button type="button" class="delete-button" @click="remove(item._id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nuxt-link to="/schooladmin">Back to dashboard</nuxt-link>
    </div>
</template>

<script setup>
import { useFetch } from 'nuxt/app';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
});

const branchs = ref([]);
const branch_id = ref('');
const tags = ref([]);
const tag_id = ref('');
const error = ref('');
const news = ref([]);
const categories = ref([]);

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
      console.log('Default branch selected:', branch_id.value);
    }
    await getTagsByBranch(branch_id.value);
    await getCategoriesByBranch(branch_id.value);
  } catch (error) {
    console.error('error fetch branch:', error);
  }
}

const getTagsByBranch = async(branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/tag/branchid/${branch_id}`);
    tags.value = res || [];
    console.log('fetch tags:', tags.value);
  } catch (error) {
    console.error('error fetch tags:', error);
  }
}

const getCategoriesByBranch = async(branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/category/branchid/${branch_id}`);
    categories.value = res || [];
    console.log('fetch categories:', categories.value);
  } catch (error) {
    console.error('error fetch categories:', error);
  }
}

const getCategoryTitle = (categoryId) => {
  const id = Array.isArray(categoryId) ? categoryId[0] : categoryId;
  const category = categories.value.find((cat) => cat._id === id);
  return category ? category.title : 'Unknown Category';
};

const getTagTitle = (tagId) => {
  const id = Array.isArray(tagId) ? tagId[0] : tagId;
  const tag = tags.value.find((tag) => tag._id === id);
  return tag ? tag.title : 'Unknown Tag';
};

const getNewsByBranch = async (branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/news/branchid/${branch_id}`);
    news.value = res || [];
    console.log('fetch news:',news.value);
  } catch (error) {
    console.error('error fetch news:', error);
  }
}

const getNewsByTag = async (tag_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/news/tagid/${tag_id}`);
    news.value = res || [];
    console.log('fetch news:', news.value);
  } catch (error) {
    console.log('error fetch news:', error);
  }
}

watch([tag_id, branch_id], async () => {
  if (tag_id.value) {
    await getNewsByTag(tag_id.value);
  } else {
    await getNewsByBranch(branch_id.value);
  }
}, { immediate: true });

const handleBranchChange = () => {
  console.log('Selected branch ID:', branch_id.value);
  if (branch_id.value) {
    getTagsByBranch(branch_id.value);
    getCategoriesByBranch(branch_id.value);
  } else {
    tags.value = [];
    categories.value = [];
  }
}

const remove = async (id) => {
    try {
        await useFetch(`http://localhost:5000/news/${id}`, {
            method: 'DELETE',
        });
        news.value = news.value.filter((item) => item.id !== id);
        await getNewsByBranch(branch_id.value);
        alert('remove news successfully');
    } catch (error) {
        console.log('error delete news:', error);
    }
}

watch(branch_id, getNewsByBranch);

onMounted(() => {
  getBranchs();
  getCategoriesByBranch();
  getTagsByBranch();
})
</script>

<style scoped>
.news-page {
  padding: 20px;
  background-color: #f7f9fc; /* Nền nhạt */
  font-family: Arial, sans-serif;
  color: #333;
}

.news-page h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #002751; /* Màu xanh nổi bật */
}

.news-page h1 a {
  background-color: #28a745; /* Màu xanh lá cho nút thêm mới */
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.news-page h1 a:hover {
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

.news-page a {
  color: #002751;
  text-decoration: none;
}

.news-page a:hover {
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
