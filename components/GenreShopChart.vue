<script>
  import {Pie} from 'vue-chartjs'

  export default {
    extends: Pie,
    props: ['labelData', 'datasetData'],
    mounted() {
      this.renderChart(
        {
          labels: this.labelData,
          datasets: this.datasetData
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      )
    },
  }
</script>
