<template>
<div class="reports col-8 offset-2 text-left">

  <div class="row mt-5  "> </div>
  <h3 class="weight-100">Reports</h3>

  <div class="row mt-5">
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Positive Impacts</h5>
          <p class="card-text">Section is {{$store.state.scores.pp}}% complete.</p>
          <router-link :to="{ path: '/reports/positive-impact' }" class="">
            <button class="btn btn-outline-success">View Positive Impacts</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">ESG Risks</h5>
          <p class="card-text">Section is {{$store.state.scores.be}}% complete.</p>
          <router-link :to="{ path: '/reports/esg-risk' }" class="">
            <button class="btn btn-outline-success">View ESG Risks</button>
          </router-link>
          <!-- <a href="#" class="btn btn-primary">View ESG Risks</a> -->
        </div>
      </div>
    </div>
  </div>


  <!-- <h5 class="mt-5">Overview</h5>
  <p><i>Report generator coming soon</i></p>

  <div class=""><i>Positive Impacts {{$store.state.scores.pp}}% complete</i></div>
  <div class=""><i>ESG Risks {{$store.state.scores.be}}% complete</i></div> -->


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
export default {
  name: 'Report',
  data: function() {
    return {
      // showModal: false,
      // stacked: {},
      // intensity: {},
    }
  },
  // created: function() {
  //   // this.getData()
  // },
  // watch: {
  //   // '$route': 'getData'
  // },
  components: {
    // ppStacked,
    // ppIntensity,
    // ppChart2,
  },
  // methods: {
  //   getData: function() {
  //     this.$http.get('/chart/pp/stacked').then((response) => {
  //       this.stacked = response.data.stacked
  //       this.intensity = response.data.intensity
  //     })
  //   },
  //
  // },
}
</script>

<style>
.reports {}

.chart-font {
  /* font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; */
}
</style>
