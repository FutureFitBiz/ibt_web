<template>
<div class=" text-left">

  <div class="highlight pb-3 pl-5 pr-3 pt-1 mt-3 col-10 offset-1">
    <div class=" mt-2">
      <div class="text-center"><u>Legend</u></div>
      <div class="row ">
        <div class="col-3"> <b>SDG (Goal)</b> </div>
        <div class="col-9"> The SDG the impact contributes to </div>
        <div class="col-3"> <b>SDG (Targets)</b> </div>
        <div class="col-9"> The specific SDG Target(s) the impact aligns with </div>
        <div class="col-3"> <b>SDG (<span style="font-size:24px;line-height:0px;">⁎</span>) </b></div>
        <div class="col-9"> Indicates that the impact does not map to any SDG Targets </div>
        <div class="col-3"><b> Intensity </b></div>
        <div class="col-9"> How much impact each stakeholder is experiencing <span v-if="forPDF"> (see Appendix) </span></div>
      </div>
    </div>
  </div>


  <table class="table table-sm chart2">
    <thead>
      <tr class="table-header">
        <th @click="clickFilter('sdg')" class="t-click" scope="col-2">
          <span>SDG (Targets)</span>
          <span v-if="!forPDF" v-html="getArrow('sdg')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('description')" class="t-click" scope="col">
          <span>Positive Impact</span>
          <span v-if="!forPDF" v-html="getArrow('description')" class="ml-1 filter-arrow"></span>
        </th>
        <th @click="clickFilter('intensity')" class="t-click" scope="col">
          <span>Intensity</span>
          <span v-if="!forPDF" v-html="getArrow('intensity')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('stakeholder')" class="t-click" scope="col">
          <span>Stakeholder</span>
          <span v-if="!forPDF" v-html="getArrow('stakeholder')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('metric')" class="t-click flex" scope="col">
          <span>Metric</span>
          <span v-if="!forPDF" v-html="getArrow('metric')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('unit')" class="t-click" scope="col">
          <span>Unit</span>
          <span v-if="!forPDF" v-html="getArrow('unit')" class="ml-1 filter-arrow"></span>
        </th>

      </tr>
    </thead>
    <tbody v-if="filteredItems.length > 0" class="table-body">
      <tr v-for="item in filteredItems">
        <td v-if="item.sdg" v-bind:style="{background: sdgColours[item.sdg]}">
          <div class="text-white h5 p-0 m-0">{{item.sdg}}</div>
          <span class="m-0 p-0">{{item.sdg_targets}}</span>
        </td>
        <td v-else style="background:lightgrey;">
          <div class="text-white h5 pl-1 m-0" style="font-size:30px;">*</div>
        </td>
        <td>{{item.description}}</td>
        <td><b>{{item.intensity}}</b></td>
        <td>{{item.stakeholder}}</td>
        <td>{{item.metric}}</td>
        <td>{{item.unit}}</td>
      </tr>

    </tbody>
  </table>
  <span v-if="filteredItems.length === 0">
    No qualifying Impacts
  </span>



</div>
</template>

<script>
import { chartBackgroundColours, chartBorderColours } from '@/common/utils'
import { sdgColours } from '@/common/utils'

export default {
  name: 'ppChart2',
  props: {
    forPDF: {
      default: false,
    },
    items: {}
  },
  data: function() {
    return {
      filter: '',
      descending: 1,
      showColours: true,
      sdgColours
    }
  },
  computed: {
    filteredItems: function() {
      if (!this.items) {
        return []
      }

      if (this.filter !== '') {
        return this.items.sort((a, b) => {

          var varA = a[this.filter]
          var varB = b[this.filter]

          if (this.filter === 'sdg' || this.filter === 'metric') {
            varA = Number(varA)
            varB = Number(varB)
          }

          if (typeof varA === 'string') {
            varA = varA.split(" ", 1)[0].toLowerCase()
            varB = varB.split(" ", 1)[0].toLowerCase()
          }

          if (varA < varB) {
            return -1 * this.descending
          }
          if (varA > varB) {
            return 1 * this.descending
          }
          return 0
        })
      } else {
        return this.items
      }

    }
  },

  methods: {
    getArrow: function(name) {
      const solid_up = '&#9650;'
      const solid_down = '&#9660;'
      const border_up = '&#9651;'
      const border_down = '&#9661;'
      let res = ''
      if (name === this.filter) {
        res = this.descending === -1 ? solid_up : solid_down
      } else {
        res = border_down
      }
      return res
    },
    clickFilter: function(name) {
      if (this.filter === name) {
        this.descending = this.descending === 1 ? -1 : 1
      } else {
        this.descending = 1

      }
      this.filter = name
    },
  },
}
</script>

<style scoped>
.chart2 {
  font-family: Helvetica;
  font-size: 0.8em;
}

.table-header {
  color: #4b5762;
}

.table-body {
  color: #3f4346;
}

.filter-arrow {
  font-size: 10px;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}

.t-click {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
