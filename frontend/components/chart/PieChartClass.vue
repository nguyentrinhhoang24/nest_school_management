<template>
  <div class="piechart-test">
    <h1>Pie chart class</h1>
    <div>
      <select id="branch-select" v-model="branch_id" @change="onBranchChange">
        <option value="" disabled>Select branch</option>
        <option v-for="branch in branchs" :key="branch._id" :value="branch._id">
          {{ branch.name }}
        </option>
      </select>
    </div>
    <div class="chart-container">
      <Pie
        v-if="loaded"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {    
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [ 'Active', 'Draft' ],
        datasets: [ {
            data: [1, 1],
            backgroundColor: ['#00ffaa', '#e600e6'],
        } ]
      },
      chartOptions: {
        responsive: true
      },
      branchs: [],
      classes: [],
      branch_id: '',
      loaded: false,
    };
  },
  methods: {
    async getBranchs() {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:5000/branch/by-school', {
           headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json();
        this.branchs = data || [];
        console.log('fetch branchs:', this.branchs);
        if(this.branchs.length > 0) {
          this.branch_id = this.branchs[0]._id;
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },

    async getClasses(branch_id) {
      try {
        const res = await fetch(`http://localhost:5000/class/by-branch/${branch_id}`);
        const data = await res.json();
        this.classes = data || [];
        console.log('fetch classes:', this.classes);

        const active = this.classes.filter((count) => count.status === 'Active').length;
        const draft = this.classes.filter((count) => count.status === 'Draft').length;
        console.log('active and draft:', active, draft)
        this.chartData.datasets[0].data = [...[active, draft]];
        this.loaded = true;
        console.log('data in datasets:', this.chartData.datasets[0].data);
      } catch (error) {
        console.error('error fetch classes:', error);
      }
    }
  },
  watch: {
    branch_id(branchId) {
      if (branchId) {
        this.loaded = false;
        this.getClasses(branchId);
      }
    },
  },
  mounted() {
    this.getBranchs();
  },
}
</script>

<style scoped>
.chart-container {
  width: 300px; /* Đặt chiều rộng biểu đồ */
  height: 300px; /* Đặt chiều cao biểu đồ */
  margin: auto; /* Căn giữa biểu đồ */
}
</style>