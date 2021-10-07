<template>
<div class="m-5">
  <div v-show="$store.state.activeFullReport">
    <div class="row mt-5">
      <button @click="$store.commit('hideFullReport')" class=" btn btn-outline-secondary float-left">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
        Back
      </button>
    </div>
    <div class="row mt-5">
      <div class="text-left weight-100 text-small">Full Report</div>
    </div>
    <div class="row">
      <h3 class="m-0 p-0 text-left weight-100">Company name</h3>
    </div>
  </div>


  <div v-show="!$store.state.activeFullReport">
    <h3 class="mb-3 mt-5 text-left weight-100">Reports</h3>
    <div class="">

      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="search" placeholder="Search">
      </div>

      <div class="mt-5 container text-left">
        <div class="row ">
          <div class="col">
            Name
          </div>
          <div class="col">
            Business Model
          </div>
          <div class="col">
            Industry
          </div>
          <div class="col ">
            Date submitted
          </div>
        </div>
      </div>

      <div class="mt-3 text-left">
        <div class="mb-1" v-for="item in items" :key="item.id">


          <button @click="$store.commit('toggleactiveReport',item.id)" class="d-flex w-100 list-group-item list-group-item-action" v-bind:class="{ 'active-item': $store.state.activeReport === item.id }">
            <div class="col">
              {{item.name}}
            </div>
            <div class="col">
              {{item.business_model}}
            </div>
            <div class="col">
              {{item.industry_type}}
            </div>
            <div class="col">
              {{new Date(item.approved_on * 1000).toLocaleDateString("en-UK")}}
            </div>
          </button>

          <div v-if="$store.state.activeReport === item.id" class="list-group-item shadow mb-3">

            hello
            <p>
            </p>
            <button @click="$store.commit('showFullReport', item.id)" class="btn btn-info">View full report</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'Reports',
  data: function() {
    return {
      search: '',
    }
  },
  components: {},
  computed: {
    items: function() {
      var search = this.search
      if (this.$store.state.reports) {
        return this.$store.state.reports.filter(function(item) {
          if (search === '') {
            return true
          } else {
            return (item.name + item.industry_type).toLowerCase().includes(search.toLowerCase())
          }
          return false
        })
      } else {
        return []
      }
    }
  },
  created: function() {
    this.$store.dispatch('getReports')
  },
  methods: {

  },
}
</script>

<style>
.add-user {
  border: 1px solid #28a745 !important;
  background: #f8fff887 !important
}

.active-item {
  background: #ecececb8 !important;
}
</style>
