<template>
  <div class="piechart-test">
    <h1>
      Pie chart test
      <!-- Dấu + hoặc - để thu/phóng biểu đồ -->
      <span @click="toggleChart" class="toggle-button">
        {{ isChartVisible ? '-' : '+' }}
      </span>
    </h1>
    <div v-if="isChartVisible" class="chart-container">
      <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {    
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      isChartVisible: true,  // Biến theo dõi trạng thái hiển thị biểu đồ
      chartData: {
        labels: [ 'Active', 'Draft' ],
        datasets: [ {
            data: [30, 20],
            backgroundColor: ['#00ffaa', '#e600e6'],
        } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    toggleChart() {
      this.isChartVisible = !this.isChartVisible;  // Chuyển đổi trạng thái hiển thị biểu đồ
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 300px; /* Đặt chiều rộng biểu đồ */
  height: 300px; /* Đặt chiều cao biểu đồ */
  margin: auto; /* Căn giữa biểu đồ */
}

.toggle-button {
  cursor: pointer;
  font-weight: bold;
  color: #007bff;
  padding-left: 10px;
}
</style>
