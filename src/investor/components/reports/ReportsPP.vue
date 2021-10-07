<template>
<div class="reports col-10 offset-1 text-left">

  <div class="row mt-5"> </div>
  <h3 class="weight-100">Positive Impacts Report</h3>
  <div v-if="$store.state.scores.pp !== 100" class=""><i>Positive Impacts is {{$store.state.scores.pp}}% complete</i></div>
  <div class="row mt-5"> </div>

  <div v-show="$store.state.debugMode" @click="getData" class="btn btn-outline-primary float-left">refresh</div>

  <div class="row mt-3 container">
    <div class="col-md-8">
      <pp-stacked :graphData="stacked"></pp-stacked>
    </div>

    <div class="col-md-4">
      <pp-intensity :graphData="intensity"></pp-intensity>
    </div>
  </div>

  <div class="row mt-3 chart-font">
    <pp-chart-2></pp-chart-2>
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
import ppStacked from '@/tool/components/charts/ppStacked'
import ppIntensity from '@/tool/components/charts/ppIntensity'
import ppChart2 from '@/tool/components/charts/ppChart2'


export default {
  name: 'Report',
  data: function() {
    return {
      showModal: false,
      stacked: {},
      intensity: {},
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
    ppIntensity,
    ppChart2,
  },
  methods: {
    getData: function() {
      this.$http.get('/chart/pp/stacked').then((response) => {
        this.stacked = response.data.stacked
        this.intensity = response.data.intensity
      })
    },

  },
}
</script>

<style>
</style>
