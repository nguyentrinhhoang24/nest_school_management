<template>
  <div class="piechart-class">
    <h1>Class in branch</h1>
    <select v-model="branch_id" id="branch" required>
      <option value="" disabled>Select branch</option>
      <option v-for="branch in branches" :key="branch._id" :value="branch._id">
        {{ branch.name }}
      </option>
    </select>
    <div class="chart-container">
      <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const branch_id = ref('');
const branches = ref([]);
const classes = ref([]);
const error = ref('');
const chartData = reactive({
  labels: ['Active', 'Draft'],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#ffff00', '#00ffff'],
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
});

// Fetch branch data
const getBranchs = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('token is missing');
      return;
    }
    const res = await $fetch('http://localhost:5000/branch/by-school', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (error.value) {
      console.error('Error from API:', error.value.message);
      branches.value = [];
      return;
    }
    branches.value = res || [];
    console.log('fetch branch in chart:', branches.value);

    if (branches.value.length > 0) {
      branch_id.value = branches.value[0]._id;
    }
  } catch (error) {
    console.error('error fetch branch:', error);
  }
};

const getClasses = async (branch_id) => {
  try {
    const res = await $fetch(`http://localhost:5000/class/by-branch/${branch_id}`);
    classes.value = res || [];
    console.log('fetch class in chart:', classes.value);

    // Count active và draft 
    const statusCounts = classes.value.reduce(
      (total, classItem) => {
        if (classItem.status == 'Active') total.active++;
        else if (classItem.status == 'Draft') total.draft++;
        return total;
      },
      { active: 0, draft: 0 }
    );

    chartData.datasets = [
      {
        data: [statusCounts.active, statusCounts.draft],
        backgroundColor: ['#00ffaa', '#e600e6'],
      },
    ];
    console.log('Datasets data:', chartData.datasets[0].data);
  } catch (error) {
    console.error('Error fetching class data:', error);
  }
};

watch(branch_id, () => {
  getClasses(branch_id.value);
});

onMounted(() => {
  getBranchs();
});
</script>

<style scoped>
.chart-container {
  width: 300px;
  height: 300px;
  margin: auto;
}
</style>
