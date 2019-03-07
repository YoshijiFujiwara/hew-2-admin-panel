<script>
  import {Bar} from 'vue-chartjs'

  export default {
    extends: Bar,
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

