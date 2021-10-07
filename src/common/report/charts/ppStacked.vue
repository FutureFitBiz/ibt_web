<template>
<div>
  <div class="">


    <div class="highlight pb-3 pl-5 pr-3 pt-1 mt-3 col-10 offset-1">
      <div class="text-center mt-2"><u>Legend</u></div>
      <div class="row ">
        <div class="col-3"> <b>x (left chart)</b> </div>
        <div class="col-9">
          Sum of individuals affected
          <span class="mr-2" v-for="(value, name) in ppColours">
            <span style="color:#555" :style="{'background': value}" class="badge">{{name}}</span>
          </span>
        </div>
        <div class="col-3"> <b>x (right chart)</b> </div>
        <div class="col-9">
          Intensity
          <span style="color:#555" :style="{'background': intensityColours[0]}" class="badge">Intensity</span>
        </div>
        <div class="col-3"> <b>y (both)</b> </div>
        <div class="col-9"> SDGs </div>
      </div>
    </div>


    <div class="row mt-3">
      <div class="col-8" id="chart1">
        <canvas id="pp-stacked"></canvas>
      </div>

      <div class="col-4">
        <canvas id="pp-intensity"></canvas>
      </div>
    </div>


  </div>
</div>
</template>

<script>
import Chart from 'chart.js'
import { chartBackgroundColoursDict, chartBorderColoursDict, intensityColours } from '@/common/utils'

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
export default {
  name: 'ppStacked',
  props: {
    graphData: {}
  },
  data() {
    return {
      chartStacked: null,
      chartIntensity: null,
      intensityColours
    }
  },
  watch: {
    graphData: function(val) {
      this.updateCharts(val)
    }
  },
  mounted: function() {
    this.setupCharts()
  },
  computed: {
    ppColours: function() {
      // it's only the first three in this list that get used in the chart
      let sliced = {}
      let count = 0
      for (let key in chartBackgroundColoursDict) {
        count += 1
        if (count <= 3) {
          sliced[key] = chartBackgroundColoursDict[key]
        }
      }
      return sliced
    },

  },
  methods: {
    updateCharts: function(chartData) {
      if (!this.chartStacked || !this.chartIntensity) {
        this.setupCharts()
      }
      for (var i = 0; i < chartData.stacked.length; i++) {
        let item = chartData.stacked[i]
        this.chartStacked.data.datasets.push({
          label: item.label,
          data: item.data,
          backgroundColor: chartBackgroundColoursDict[item.label],
          borderColor: chartBorderColoursDict[item.label],
          borderWidth: 1
        })
      }

      if (chartData.intensity.length) {
        this.chartIntensity.data.datasets.push({
          label: 'Intensity',
          data: chartData.intensity,
          backgroundColor: this.intensityColours[0],
          borderColor: this.intensityColours[1],
          borderWidth: 1
        })
      }

      this.chartStacked.update()
      this.chartIntensity.update()
    },
    setupCharts: function() {
      // use mounted not created
      // because Chartjs needs to load AFter <canvas>

      // Y Axis = All 17 SDGs
      // X Axis - The length of the bar = Scale value (PP Copy and Content > tab 3 > 13, 14, 15)
      // Bar color = Targeted Stakeholder (PP Copy and Content > 3 > 2, 3), each Targeted Stakeholder group gets a unique colour

      var ctx = document.getElementById('pp-stacked');
      ctx.height = 500
      this.chartStacked = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: sdgLabels,
          datasets: [],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: 'Sum of Individuals affected'
              }
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

      var ctxIntensity = document.getElementById('pp-intensity')
      ctxIntensity.height = 500

      this.chartIntensity = new Chart(ctxIntensity, {
        type: 'horizontalBar',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          datasets: [],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Intensity',
                beginAtZero: true
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'SDGs'
              },
              ticks: {}
            }]
          },
        }
      })

    },
  },
}
</script>
