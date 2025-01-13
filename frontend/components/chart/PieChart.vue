<template>
  <div class="piechart-test">
    <h1>Pie chart</h1>
    <div class="chart-container">
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
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {    
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
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
  }
}
</script>
<style scoped>
.chart-container {
  width: 300px; /* Đặt chiều rộng biểu đồ */
  height: 300px; /* Đặt chiều cao biểu đồ */
  margin: auto; /* Căn giữa biểu đồ */
}
</style>