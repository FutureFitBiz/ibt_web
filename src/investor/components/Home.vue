<template >
<div class="p-4">

  {{selectedModel}}

  <form class="card pt-3 pb-3 pl-3 pr-3">
    <div class="form-row align-items-center">
      <div class="col-6">
        <input type="text" class="form-control" v-model="search" placeholder="Search">

      </div>
      <div class="col-auto">
        <label class="sr-only" for="sort-by">Sort by</label>
        <select v-model="sortBy" class="custom-select " id="sort-by">
          <option value="" selected>Sort by...</option>
          <option v-for="option in sortByOptions">{{option}}</option>
        </select>
      </div>
      <div class="col-auto">
        <div class="form-check mb-2">
          <div class="custom-control custom-checkbox">
            <input v-model="approvedCheck" type="checkbox" class="custom-control-input" id="submittedReport">
            <label class="custom-control-label" for="submittedReport">Report Submitted</label>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="btn btn-sm btn-outline-secondary mb-2">Clear</div>
      </div>
    </div>
  </form>





  <div class="mt-5">
    <table class="table text-left table-sm table-hover">
      <thead>
        <tr>
          <th scope="col-3">Company</th>
          <th scope="col-1">Sales Model</th>
          <th scope="col">Industry</th>
          <th scope="col">Overall Progress</th>
          <th scope="col">Date submitted</th>
          <th scope="col">Reporting Period</th>
          <th scope="col">CSV</th>
          <th scope="col">Report</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="col-3">{{item.name}}</td>
          <td class="col-1">{{item.business_model}}</td>
          <td>{{item.industry_type}}</td>
          <td>{{item.overall_progress}}</td>
          <td>
            <div v-if="item.approved" class="">
              {{new Date(item.approved_on * 1000).toLocaleDateString("en-UK")}}
            </div>
          </td>
          <td>{{item.reporting_period}}</td>
          <td>
            <div v-if="item.approved" class="">
              <button @click="downloadCSV(item)" class="btn btn-sm btn-outline-success">
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </button>

            </div>
          </td>
          <td>
            <div v-if="item.approved" class="">
              <button @click="openReport(item)" class="btn btn-sm btn-outline-success">
                <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-file-earmark-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                  <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>
              </button>

            </div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>


</div>
</template>




<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function() {
    return {
      search: '',
      selectedModel: '',
      approvedCheck: false,
      sortBy: '',
      sortByOptions: [
        'Company',
        'Sales Model',
        'Industry',
        'Overall Progress',
        'Date submitted',
      ]
    }


  },
  created: function() {
    // this.getData()
    this.$store.dispatch('getReports')
  },
  computed: {
    items: function() {
      let filtered = []
      if (this.$store.state.reports) {
        filtered = this.$store.state.reports.filter((item) => {
          let searched = true
          if (this.search != '') {
            searched = (item.name + item.business_model + item.industry_type).toLowerCase().includes(this.search.toLowerCase())
          }
          let approved = true
          if (this.approvedCheck) {
            approved = item.approved
          }
          return (searched && approved)
        })
      }
      if (filtered.length) {
        filtered.sort((a, b) => {
          if (this.sortBy === '' || this.sortBy === this.sortByOptions[0]) {
            return a.name.localeCompare(b.name)
          }

          if (this.sortBy === this.sortByOptions[1]) {
            return a.business_model.localeCompare(b.business_model)
          }
          if (this.sortBy === this.sortByOptions[2]) {
            return a.industry_type.localeCompare(b.industry_type)
          }
          if (this.sortBy === this.sortByOptions[3]) {
            return b.overall_progress.localeCompare(a.overall_progress)
          }
          if (this.sortBy === this.sortByOptions[4]) {
            return a.approved_on < b.approved_on
          }
        })
      }
      return filtered

    }
  },
  components: {},
  methods: {
    openReport: function(item) {
      this.$store.commit('setCompany', item)
      this.$router.push({ path: '/report/' + item.id }).catch(err => {})
    },
    downloadCSV: function(item) {
      let url = process.env.VUE_APP_API_URL + '/report/download/csv'

      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        params: {
          app: this.$store.state.app,
          company_id: item.id
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        let company = this.$store.state.company.name
        let date = this.$store.state.company.reporting_period
        let filename = `Impact Benchmark Report Data - ${item.name} ${item.reporting_period}.csv`
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
    },
    resetFilters: function() {
      this.search = ''
      this.selectedModel = ''
      this.approvedCheck = false
      this.sortBy = ''
    },
  }
}
</script>
