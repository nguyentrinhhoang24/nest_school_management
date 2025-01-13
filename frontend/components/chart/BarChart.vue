<template>
  <div class="barchat-test">
    <h1>Bar chart</h1>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ {
            data: [40, 20, 12],
            backgroundColor: ['#e62e00', '#00ff00', '#00ffff'],
        } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>