<template>
<div class="reports col-10 offset-1 text-left">

  <div class="row mt-5"> </div>
  <h2 class="weight-100">ESG Risks Report</h2>
  <div v-if="$store.state.scores.be !== 100" class=""><i>ESG Risks - {{$store.state.scores.be}}% complete</i></div>
  <div class="row mt-5"> </div>
  <p class="">
    All companies can inadvertently create negative impacts on people and the planet through their environmental, social and governance (ESG) policies. This section shows {{$store.state.company.name}}’s performance across ESG topics that all
    companies risk
    negatively impacting by mistake. Tracking relevant data points and acting to mitigate these risks lowers the chance of negative impacts and related financial consequences.
  </p>
  <be-best-and-worst :progress="progress" :awareness="awareness" />
  <div style="height:70px;"></div>
  <div>
    Below is the full list of ESG topics where potential risks exist that apply to {{$store.state.company.name}}, and its progress towards measuring and managing these risks.
  </div>
  <be-overview-table :pageItems="overviewData" />
  <div style="height:70px;"></div>
</div>
</template>

<script>
import beBestAndWorst from '@/common/report/charts/beBestAndWorst'
import beOverviewTable from '@/common/report/charts/beOverviewTable'

export default {
  name: 'ReportBE',
  data: function() {
    return {
      overviewData: [],
      progress: [],
      awareness: []
    }
  },
  created: function() {
    this.getData()
  },
  components: {
    beBestAndWorst,
    beOverviewTable,
  },
  methods: {
    getData: function() {
      this.$http.get('/report/be', { params: { forPDF: false } }).then((response) => {
        this.progress = response.data.best_and_worst.progress
        this.awareness = response.data.best_and_worst.awareness
        this.overviewData = response.data.overview
      })
    }
  },
}
</script>
