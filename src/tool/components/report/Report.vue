<template>
<div class="reports col-8 offset-2 text-left">
  <div class="row mt-5  "> </div>
  <h3 class="weight-100">Reports</h3>
  <div class="highlight mt-3" role="alert">
    <div class="mt-1 form-check custom-checkbox">
      <input v-bind:disabled="disabled" v-model="approved" id="approved-check" @change="updateBenchmarkStatus" type="checkbox" class="custom-control-input">
      <input id="approved-check" type="checkbox" class="custom-control-input">
      <label for="approved-check" class="custom-control-label">
        I've completed my assessment, and I'm ready for SF to view the results.
      </label>
    </div>
  </div>
  <div v-if="showSaved" class="alert alert-success mt-5" role="alert">
    Status updated.
  </div>
  <div class="row w-100 mt-5">
    <div class="col-6">
      <router-link :to="{ path: '/reports/positive-impact' }" class="">
        <button class="btn btn-outline-success">Positive Impacts</button>
      </router-link>
    </div>
    <div class="col-6">
      Section is {{$store.state.scores.pp}}% complete.
    </div>
  </div>
  <div class="row w-100 mt-4">
    <div class="col-6">
      <router-link :to="{ path: '/reports/esg-risk' }" class="">
        <button class="btn btn-outline-success ">ESG Risks</button>
      </router-link>
    </div>
    <div class="col-6">
      Section is {{$store.state.scores.be}}% complete.
    </div>
  </div>
  <div class="row w-100 mt-4">
    <div class="col-6">
      <router-link :to="{ path: '/reports/data' }" class="">
        <button class="btn btn-outline-success ">Report Data</button>
      </router-link>
    </div>
    <div class="col-6">
      A basic summary of the benchmark data, also available to download as CSV.
    </div>
  </div>
  <div class="row w-100 mt-4">
    <div class="col-6">
      <router-link :to="{ path: '/reports/download' }" class="">
        <button class="btn btn-outline-success">PDF Report</button>
      </router-link>
    </div>
    <div class="col-6">
      Preview and download a PDF report.
    </div>
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
export default {
  name: 'Report',
  data: function() {
    return {
      approved: false,
      showSaved: false,
      disabled: true,
    }
  },
  created: function() {
    this.getData()
  },
  components: {},
  methods: {
    updateBenchmarkStatus: function() {
      this.showSaved = false
      this.$http.post('/benchmark/status', { 'approved': this.approved }).then((response) => {
        if (response.data && response.data.status == 'success') {
          this.showSaved = true
        }
      })
    },
    getData: function() {
      this.showSaved = false
      this.$http.get('/benchmark/status').then((response) => {
        this.disabled = false
        this.approved = response.data.approved
      })
    },
  },
}
</script>
