<template>
  <div class="piechart-class">
    <h1>Pie chart class
      <select id="branch-select" v-model="branch_id" @change="onBranchChange">
        <option value="" disabled>Select branch</option>
        <option v-for="branch in branchs" :key="branch._id" :value="branch._id">
          {{ branch.name }}
        </option>
      </select>
      <span @click="toggleChart" class="toggle-button">
        {{ isChartVisible ? '-' : '+' }}
      </span>
    </h1>
    <div v-if="isChartVisible" class="chart-container">
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
            backgroundColor: ['#00ff80', '#ff3333'],
        } ]
      },
      chartOptions: {
        responsive: true
      },
      branchs: [],
      classes: [],
      branch_id: '',
      loaded: false,
      isChartVisible: true,
    };
  },
  methods: {
    toggleChart() {
      this.isChartVisible = !this.isChartVisible;
    },

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
.piechart-class {
  background-color: #f2f2f2; /* Nền màu xám nhạt */
  border-radius: 10px; /* Bo góc khối */
  padding: 20px; /* Khoảng cách bên trong */
  width: 45%; /* Chiều rộng khối */
  /* margin: 50px auto; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bóng mờ nhẹ */
}

.piechart-class h1 {
  display: flex; /* Sử dụng flex để căn các phần tử */
  justify-content: space-between; /* Tiêu đề và dropdown nằm 2 phía */
  align-items: center; /* Căn giữa theo chiều dọc */
  font-size: 24px; /* Kích thước chữ */
  color: #333; /* Màu chữ */
  margin-bottom: 20px; /* Khoảng cách dưới */
}

.piechart-class .toggle-button {
  cursor: pointer; /* Trỏ chuột thành bàn tay khi hover */
  font-weight: bold;
  color: #007bff; /* Màu xanh chữ */
  margin-left: 10px; /* Khoảng cách với tiêu đề */
}

.piechart-class select#branch-select {
  width: 150px; /* Thu nhỏ chiều rộng của dropdown */
  padding: 6px; /* Giảm khoảng cách bên trong */
  border-radius: 5px; /* Bo góc */
  border: 1px solid #ccc; /* Viền màu xám nhạt */
  background-color: #fff; /* Nền dropdown */
  font-size: 14px; /* Giảm kích thước chữ */
  color: #333; /* Màu chữ */
  margin-left: 10px; /* Khoảng cách bên trái tiêu đề */
}

.piechart-class select#branch-select:focus {
  outline: none;
  border-color: #007bff; /* Đổi màu viền khi focus */
}


.chart-container {
  width: 100%; /* Chiều rộng khối */
  max-width: 300px; /* Chiều rộng tối đa */
  height: 300px; /* Chiều cao cố định */
  margin: 20px auto; /* Căn giữa và cách trên/dưới */
  display: flex; /* Sử dụng flexbox */
  justify-content: center; /* Căn giữa ngang */
  align-items: center; /* Căn giữa dọc */
}

button {
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Màu xanh đậm khi hover */
}

</style>