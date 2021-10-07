<template>
<div class="">
  <h4 v-if="!forPDF" class="mt-5">Potential Impact of Investment</h4>
  <p v-if="(forPDF && pageOne) || !forPDF">
    The table below shows the potential additional impact the Company might have generated in the reporting period with an additional investment of $100,000. For illustrative purposes only; assumes a linear relationship between program funding and
    additional impact generated
    .<sup>(1)</sup>
  </p>

  <div v-if="!forPDF" class="mt-3 card pl-3">
    <div class="mt-3"><u>Investment</u></div>
    <div class="pl-3 pr-3 pb-3 row  mt-2 pt-0">
      <div class="">Select amount ($) of investment</div>
      <div class="ml-3 mt-2">
        <input class="float-left slider" type="range" min="10000" step="10000" max="1000000" v-model="investment">
      </div>
      <b class="ml-3">{{ investmentCurrency() }}</b>
    </div>
  </div>

  <div v-if="(forPDF && pageOne) || !forPDF" class="highlight pb-3 pl-5 pr-3 pt-1 mt-3 col-10 offset-1">
    <div class=" mt-2">
      <div class="text-center"><u>Legend</u></div>
      <div class="row ">

        <div class="col-3"> <b>Stakeholders</b> </div>
        <div class="col-9">
          <div class="row pl-2">
            <div v-for="(value, name) in chartBackgroundColoursDict">
              <div style="color:#555" :style="{'background': value}" class="badge ml-2">{{name}}</div>
            </div>
          </div>
        </div>

        <div class="col-3 pl-2">
          <b>
            <div class="align-middle badge badge-pill bg-white m-0">With investment </div>
          </b>
        </div>
        <div class="col-9">
          Additional reach the company might achieve, with {{forPDF ? '$100k of investment' : 'the selected amount of investment'}}.<sup>(1)</sup>
        </div>

        <div class="col-3 mt-1"> <b style="font-weight:700;"> <sup class="mr-1">(1)</sup> </b> </div>
        <div class="col-9 mt-1">
          Formula = Investment / (Project cost / Sum of total company expenses) * Current Reach
        </div>

      </div>
    </div>
  </div>

  <div class="row p-0 m-0 w-100 mt-5">
    <div class="col-2  p-0 m-0">
      <b>Activity</b>
    </div>
    <div class="col-10 p-0 m-0">
      <div class="row m-0 p-0">
        <div class="col-3"> <b>Stakeholder</b> </div>
        <div class="col-4"><b>Impact</b> </div>
        <div class="col-2"><b> Current Reach <div class="align-middle badge badge-pill badge-light">With investment</div> </b> </div>
        <div class="col-3"><b>Unit</b></div>
      </div>
    </div>
  </div>

  <div class="ml-3" v-if="pageItems.length === 0">
    <div class="w-100 divider-lg p-0 m-0"></div>
    <div class="mt-3">
      No qualifying Impacts
    </div>
  </div>

  <div v-if="pageItems.length > 0" class="" v-for="(item, index) in pageItems">
    <div class="row p-0 m-0 w-100">

      <div v-if="index === 0 || item.name !== pageItems[index-1].name" class="w-100 divider-lg p-0 m-0"></div>

      <div v-if="index > 0 && item.name === pageItems[index-1].name && item.stakeholder !== pageItems[index-1].stakeholder" class="divider-stakeholder p-0 m-0"></div>
      <div v-if="index > 0 && item.name === pageItems[index-1].name && item.stakeholder === pageItems[index-1].stakeholder" class="divider-stakeholder-dash p-0 m-0"></div>
      <div style=" margin:4px; position: relative;" class="row p-0 m-0 w-100">
        <div class="col-2  p-0 m-0">
          <span v-if="index === 0 || item.name !== pageItems[index-1].name">
            {{item.name}}
          </span>
        </div>
        <div class="col-10 p-0 m-0" :style="{'background': rowBG(item.stakeholder), 'color': item.stakeholder === 'n/a' ? 'grey' : 'black'}">
          <div class="row m-0 p-0">
            <div class="col-3">
              {{item.stakeholder}}
            </div>
            <div class="col-4 mb-2 mt-1">
              {{item.impact}}
            </div>
            <div class="col-2 mb-2">
              <div class="p-1">{{valueCurrent(item)}}</div>
              <div style="font-size:14px;" class="m-0 align-middle badge badge-pill badge-light">{{valuePredicted(item)}}</div>
            </div>

            <div class="col-3 mb-2 mt-1">
              {{item.base_unit}}
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>

</div>
</template>

<script>
import { toCurrency } from '@/common/utils'
import { chartBackgroundColoursDict, chartBorderColoursDict, formatNumber } from '@/common/utils'

export default {
  name: 'ppInvestment',
  props: {
    forPDF: {
      default: false,
    },
    pageOne: {
      default: false,
    },
    pageItems: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      items: [],
      investment: 100000,
      chartBackgroundColoursDict,
      chartBorderColoursDict,
      hideNA: false,
    }
  },
  methods: {
    investmentCurrency: function() {
      return toCurrency(Number(this.investment))
    },
    rowBG: function(name) {
      return name in chartBackgroundColoursDict ? chartBackgroundColoursDict[name] : 'rgb(247, 247, 247)'
    },
    valueCurrent: function(item) {
      let res = 'n/a'
      if (item.impact_cost !== 'n/a' && item.relative_cost !== 'n/a') {
        res = `${formatNumber(item.base_value)} `
      }
      return res
    },
    valuePredicted: function(item) {
      let res = ''
      if (item.impact_cost !== 'n/a' && item.relative_cost !== 'n/a' && item.stakeholder !== 'n/a') {
        let amount = Math.round(this.investment * item.impact_cost * item.relative_cost)
        res = `+ ${formatNumber(amount)}`
      }
      return res
    },

  },
}
</script>
