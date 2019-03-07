<script>
  import {Line} from 'vue-chartjs'

  export default {
    extends: Line,
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
