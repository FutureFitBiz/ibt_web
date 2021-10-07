<template>
<div class=" text-left">
  <div class="col-10 offset-1 mt-5">
    <div @click="downloadCSV" class="float-right btn btn-outline-success">
      Download as CSV </div>
    <div>
      <h2 class="weight-100">Report Data</h2>
    </div>
    <p class="">
      T​he tables below show the underlying data used to generate the visuals in the report, gathered from the information you have entered.
    </p>
  </div>
  <h5 class="mt-5 text-center"> ESG Risks </h5>
  <be-data-table :items="be_data" />
  <h5 class="mt-5 text-center"> Positive Impacts </h5>
  <div class="row mt-5"> </div>
  <pp-data-table :forPDF="false" :items="pp_data"></pp-data-table>
</div>
</template>

<script>
import ppDataTable from '@/common/report/charts/ppDataTable'
import beDataTable from '@/common/report/charts/beDataTable'
import axios from 'axios'

export default {
  name: 'ReportData',
  data: function() {
    return {
      pp_data: [],
      be_data: [],
    }
  },
  created: function() {
    this.getData()
  },
  components: {
    ppDataTable,
    beDataTable,
  },
  computed: {
    csvDownloadUrl: function() {
      return process.env.VUE_APP_API_URL + '/report/download/csv'

    }
  },
  methods: {
    getData: function() {
      this.$http.get('/report/be', { params: { forPDF: false } }).then((response) => {
        this.be_data = response.data.data_table
      })
      this.$http.get('/report/pp', { params: { forPDF: false } }).then((response) => {
        this.pp_data = response.data.data_table

      })
    },
    downloadCSV: function() {
      let url = process.env.VUE_APP_API_URL + '/report/download/csv'

      axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        params: {
          app: this.$store.state.app
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        let company = this.$store.state.company.name
        let date = this.$store.state.company.reporting_period
        let filename = `Impact Benchmark Report Data - ${company} ${date}.csv`
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
    }
  },
}
</script>

<style>
</style>
