<template>
<div class="reports col-10 offset-1 text-left">
  <div class="row mt-5"> </div>
  <h2 class="weight-100">Positive Impacts Report</h2>
  <div v-if="$store.state.scores.pp !== 100" class=""><i>Positive Impacts is {{$store.state.scores.pp}}% complete</i></div>
  <div class="row mt-5"> </div>
  <div class="row mt-3 container">
    <h4 class="weight-100 ">
      Impacts on Individuals
    </h4>
    <p class="mt-4 mb-1">
      These charts show how {{$store.state.company.name}} makes positive contributions to the SDGs through the positive impacts it delivers to individual people.
    </p>
    <p class="mb-1">
      The left chart shows {{$store.state.company.name}}’s positive contributions to the SDGs, and the number of individuals that experience each impact type. If one individual experiences more than one type of impact, they will be counted
      multiple times.
    </p>
    <p>
      The right chart shows the weighted average ‘Intensity’ of these impacts, per SDG. Intensity represents how much change each stakeholder experiences, combining the qualitative measures of Significance, Duration and Proportion of each
      impact.
    </p>
    <pp-stacked :graphData="stacked"></pp-stacked>
  </div>
  <h4 class="weight-100 mt-5">
    Impacts on Broader Stakeholders
  </h4>
  <div class="">
    This table shows {{$store.state.company.name}}’s contributions to the SDGs through the positive impacts it delivers which have wide-reaching effects, and are not measured in terms of affected individuals.
  </div>
  <div class="row mt-3 chart-font">
    <pp-chart-2 :items="ppChart2Items"></pp-chart-2>
  </div>
  <div class="row mt-3 chart-font">
    <pp-investment :pageItems="ppInvestmentItems"></pp-investment>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
</div>
</template>

<script>
import ppStacked from '@/common/report/charts/ppStacked'
import ppChart2 from '@/common/report/charts/ppChart2'
import ppInvestment from '@/common/report/charts/ppInvestment'


export default {
  name: 'Report',
  data: function() {
    return {
      showModal: false,
      stacked: {},
      ppInvestmentItems: [],
      ppChart2Items: [],
    }
  },
  created: function() {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  components: {
    ppStacked,
    ppChart2,
    ppInvestment,
  },
  methods: {
    getData: function() {
      this.loading = true
      this.$http.get('/report/pp', { params: { forPDF: false } }).then((response) => {
        this.ppInvestmentItems = response.data.investment
        this.stacked = response.data.stacked
        this.ppChart2Items = response.data.chart_2
      })

    },
  },
}
</script>

<style>
</style>
