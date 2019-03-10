<script>
  import {HorizontalBar} from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
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
