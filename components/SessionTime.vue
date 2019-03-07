<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['labelData', 'datasetData'],
    async mounted() {
      console.log(this.labelData);
      await this.renderChart(
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
