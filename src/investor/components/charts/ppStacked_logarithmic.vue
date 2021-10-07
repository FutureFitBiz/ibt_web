<template>
<div>
  <canvas id="pp-stacked"></canvas>
</div>
</template>

<script>
import numeral from 'numeral'
import Chart from 'chart.js'

const backgroundColors = [
  'rgba(54, 162, 235, 0.2)', // blue
  'rgba(255, 159, 64, 0.2)', //orange
  'rgba(75, 192, 192, 0.2)', // green
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(153, 102, 255, 0.2)',
]
const borderColors = [
  'rgba(54, 162, 235, 1)', // blue
  'rgba(255, 159, 64, 1)', // orange
  'rgba(75, 192, 192, 1)', // green
  'rgba(255, 99, 132, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
]
const sdgs = [
  'No Poverty',
  'Zero Hunger',
  'Good Health and Well-being',
  'Quality Education',
  'Gender Equality',
  'Clean Water and Sanitation',
  'Affordable and Clean Energy',
  'Decent Work and Economic Growth',
  'Industry, Innovation, and Infrastructure',
  'Reducing Inequality',
  'Sustainable Cities and Communities',
  'Responsible Consumption and Production',
  'Climate Action',
  'Life Below Water',
  'Life On Land',
  'Peace, Justice, and Strong Institutions',
  'Partnerships for the Goals',
]
const sdgLabels = [
  'No Poverty - 1',
  'Zero Hunger - 2',
  'Good Health and Well-being - 3',
  'Quality Education - 4',
  'Gender Equality - 5',
  'Clean Water and Sanitation - 6',
  'Affordable and Clean Energy - 7',
  'Decent Work and Economic Growth - 8',
  'Industry, Innovation, and Infrastructure - 9',
  'Reducing Inequality - 10',
  'Sustainable Cities and Communities - 11',
  'Responsible Consumption and Production - 12',
  'Climate Action - 13',
  'Life Below Water - 14',
  'Life On Land - 15',
  'Peace, Justice, and Strong Institutions - 16',
  'Partnerships for the Goals - 17',
]
let afterBuildTicks = (chartObj) => {
  const ticks = [0, 100, 1000, 5000, 100000, 500000];
  chartObj.ticks.splice(0, chartObj.ticks.length);
  chartObj.ticks.push(...ticks);
}

export default {
  name: 'ppStacked',
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
    var ctx = document.getElementById('pp-stacked');
    ctx.height = 500
    // ctx.width = 300
    this.chart = new Chart(ctx, {
      // responsive: true,
      // devicePixelRatio: 1,
      type: 'horizontalBar',
      data: {
        labels: sdgLabels,


        // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
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
            type: 'logarithmic',
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Sum of Individuals affected'
            },
            ticks: {
              minRotation: 30,
              padding: 5,
              // labelOffset: 100,
              // autoSkipPadding: false,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return value.toString()
              }
            },
            afterBuildTicks,
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'SDGs'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    })

  },
  methods: {
    getData: function() {
      this.$http.get('/chart/pp/stacked').then((response) => {
        const sets = response.data.stacked
        for (var i = 0; i < sets.length; i++) {
          let item = sets[i]

          this.chart.data.datasets.push({
            label: item.label,
            data: item.data,
            backgroundColor: backgroundColors[i],
            borderColor: borderColors[i],
            borderWidth: 1
          })
          this.chart.update()
        }
      })
    },

  },
}
</script>
