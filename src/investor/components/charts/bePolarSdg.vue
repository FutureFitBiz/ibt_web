<template>
<div>
  <canvas id="be-polar-sdg"></canvas>
</div>
</template>

<script>
import numeral from 'numeral'
import Chart from 'chart.js'
import { chartBackgroundColours, chartBorderColours } from '@/common/utils'

export default {
  name: 'bePolarSdg',
  data() {
    return {
      graph: {}
    }
  },
  mounted: function() {
    var ctx = document.getElementById('be-polar-sdg')
    ctx.height = 500
    // ctx.width = 300
    this.chart = new Chart(ctx, {
      data: {
        // labels: ['a']
        // "label": "My First Dataset",
        "labels": ["Red", ],
        datasets: [{
          "data": [11, ],
          // data: [1],
          backgroundColor: chartBackgroundColours,
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
      },
      type: 'polarArea',
      // options: {
      //   legend: {
      //     display: true,
      //     position: 'right'
      //   }
      // },

      // new Chart(document.getElementById("chartjs-5"), {
      //   "type": "polarArea",
      //   "data": {
      //     "datasets": [{
      //       "label": "My First Dataset",
      //       "backgroundColor": [
      //         "rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(201, 203, 207)", "rgb(54, 162, 235)"
      //       ]
      //     }]
      //   }
      // });
    })
    this.getData()

  },
  methods: {
    getData: function() {
      this.$http.get('/chart/be/polar_sdgs').then((response) => {
        console.log(response.data)
        this.chart.data.datasets = [{
          backgroundColor: chartBackgroundColours,
          data: response.data.data,
          labels: response.data.labels
        }]

        this.chart.data.labels = response.data.labels
        this.chart.update()
      })
    },

  },
}
</script>
