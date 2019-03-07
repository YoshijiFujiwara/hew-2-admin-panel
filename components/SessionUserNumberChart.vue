<script>
  import { Pie  } from 'vue-chartjs'

  export default {
    extends: Pie,
    props: ['labelData', 'datasetData'],
    async mounted() {
      console.log(this.labelData);
      // console.log(this.datasetData);

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
