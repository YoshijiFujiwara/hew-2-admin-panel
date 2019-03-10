<script>
  import {HorizontalBar} from 'vue-chartjs'

  export default {
    extends: HorizontalBar,
    props: ['labelData', 'datasetData'],
    mounted() {
      const arrayOfObj = this.labelData.map((d, i) => {
        return {
          label: d,
          data: this.datasetData[0].data[i] || 0
        };
      });
      console.log('array');
      console.log(arrayOfObj)

      const sortedArrayOfObj = arrayOfObj.sort(function (a, b) {
        return b.data - a.data;
      });

      console.log('array');
      console.log(sortedArrayOfObj)

      let newArrayLabel = [];
      let newArrayData = [
        {
          label: this.datasetData[0].label,
          backgroundColor: this.datasetData[0].backgroundColor,
          data: []
        }
      ];
      sortedArrayOfObj.forEach(function(d){
        newArrayLabel.push(d.label);
        newArrayData[0].data.push(d.data);
      });
      console.log(newArrayLabel);
      console.log(newArrayData);

      this.renderChart(
        {
          labels: newArrayLabel,
          datasets: newArrayData
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      )
    },
  }
</script>
