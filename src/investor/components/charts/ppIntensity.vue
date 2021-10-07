<template>
<div>
  <canvas id="ppIntensityChart"></canvas>
</div>
</template>

<script>
import numeral from 'numeral'
import Chart from 'chart.js'

const backgroundColors = [
  'rgba(255, 206, 86, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(54, 162, 235, 0.2)', // blue
  'rgba(255, 159, 64, 0.2)', //orange
  'rgba(75, 192, 192, 0.2)', // green
]
const borderColors = [
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(54, 162, 235, 1)', // blue
  'rgba(255, 159, 64, 1)', // orange
  'rgba(75, 192, 192, 1)', // green
]

export default {
  name: 'ppIntensity',
  data() {
    return {
      graph: {}
    }
  },
  mounted: function() {
    // use mounted not created
    // because Chartjs needs to load AFter <canvas>

    // Y Axis = All 17 SDGs




    // X Axis - The length of the bar = Scale value (PP Copy and Content > tab 3 > 13, 14, 15)
    // Bar color = Targeted Stakeholder (PP Copy and Content > 3 > 2, 3), each Targeted Stakeholder group gets a unique colour






    this.getData()

    // var ctx = this.$refs.myChart



    var ctx = document.getElementById('ppIntensityChart')



    ctx.height = 500
    // ctx.width = 300
    this.chart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        datasets: [],
      },


      options: {
        responsive: true,
        maintainAspectRatio: false,

        // title: {
        //   text: 'thissss',
        //   display: true
        // },
        scales: {
          xAxes: [{
            // stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Intensity',
              beginAtZero: true
            }
          }],
          yAxes: [{
            // stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'SDGs'
            },
            ticks: {}
          }]
        },
      }
    })
    this.chart.aspectRatio = 0;

  },
  methods: {
    getData: function() {
      this.$http.get('/chart/pp/stacked').then((response) => {
        console.log(response.data.intensity)
        if (response.data.intensity_sum !== 0) {
          this.chart.data.datasets.push({
            label: 'Intensity',
            data: response.data.intensity,
            backgroundColor: backgroundColors[0],
            borderColor: borderColors[0],
            borderWidth: 1
          })
          this.chart.update()

        }
      })
    },

  },
}
</script>
