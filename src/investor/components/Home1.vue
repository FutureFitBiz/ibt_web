<template >
<div class="">
  <div class="dashboard  text-left col-md-10 offset-md-1 col-xl-8 offset-xl-2">
    <h2 class="mt-5 weight-100">Home</h2>

    <!-- <h5 class="mt-5 weight-100">Overview</h5> -->
    <div class="row mt-5">

      <div class="col-6">
        <div class=" card">
          <div class="row ">
            <div class="col-4">

              <svg height="4em" viewBox="0 0 16 16" class="bi bi-building m-3 text-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                <path
                  d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
              </svg>
            </div>

            <div class="col-8 text-right">
              <div class="card-body">
                <p class="card-text">Reports submitted</p>
                <h5 class="card-title"><b>{{$store.state.reports.length}}</b></h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card">
          <div class="row ">
            <div class="col-4">

              <svg height="4em" viewBox="0 0 16 16" class="text-success m-3 bi bi-clipboard-data" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
              </svg>
            </div>

            <div class="col-8 text-right">
              <div class="card-body">
                <p class="card-text">Impacts generated</p>
                <h5 class="card-title"><b>{{$store.state.totalImpacts}}</b></h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <h5 class="mt-5 weight-100">Latest</h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Company</th>
          <th scope="col">Date submitted</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in $store.state.latest">
          <th scope="row">{{index + 1}}</th>
          <td>{{item.name}}</td>
          <td>{{new Date(item.approved_on * 1000).toLocaleDateString("en-UK")}}</td>
          <td><button @click="$store.commit('showFullReport', item.id)" class="btn btn-outline-info btn-sm">View report</button></td>
        </tr>
      </tbody>
    </table>



  </div>
</div>
</template>


<script>
export default {
  name: 'Home',
  data: function() {
    return {}

  },
  created: function() {
    // this.getData()
    this.$store.dispatch('getReports')
  },
  // watch: {
  //   '$route': 'getData'
  // },
  components: {},
  methods: {
    // getData: function() {
    //
    // },
  }
}
</script>
