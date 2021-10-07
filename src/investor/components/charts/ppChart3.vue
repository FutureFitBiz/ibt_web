<template>
<div class="container col-10 text-left mt-5">


  <!-- <div class="m-1 float-right">
    <button @click="toggleColours" type="button" class="btn btn-light">{{showColours ? 'Hide Colours' : 'Show Colours'}}</button>
  </div> -->

  <table class="table table-sm chart2">
    <thead>
      <tr class="table-header">


        <th @click="clickFilter('sdg')" class="t-click" scope="col-2">
          <span>SDG (targets)</span>
          <span v-html="getArrow('sdg')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('positive_impact')" class="t-click" scope="col">
          <span>Positive Impact</span>
          <span v-html="getArrow('positive_impact')" class="ml-1 filter-arrow"></span>
        </th>
        <th @click="clickFilter('intensity')" class="t-click" scope="col">
          <span>Intensity</span>
          <span v-html="getArrow('intensity')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('stakeholder')" class="t-click" scope="col">
          <span>Stakeholder</span>
          <span v-html="getArrow('stakeholder')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('metric')" class="t-click flex" scope="col">
          <span>Metric</span>
          <span v-html="getArrow('metric')" class="ml-1 filter-arrow"></span>
        </th>

        <th @click="clickFilter('unit')" class="t-click" scope="col">
          <span>Unit</span>
          <span v-html="getArrow('unit')" class="ml-1 filter-arrow"></span>
        </th>

      </tr>
    </thead>
    <tbody v-if="results" class="table-body">
      <tr v-for="item in filteredResults">
        <td v-bind:style="{background: sdgColours[item.sdg]}">
          <div class="text-white h5 p-0 m-0">{{item.sdg}}</div>
          <span class="m-0 p-0">{{item.sdg_targets}}</span>
        </td>
        <td>{{item.positive_impact}}</td>
        <td><b>{{item.intensity}}</b></td>
        <td>{{item.stakeholder}}</td>
        <td>{{item.metric}}</td>
        <td>{{item.unit}}</td>
      </tr>
    </tbody>
  </table>



</div>
</template>

<script>
import { chartBackgroundColours, chartBorderColours } from '@/common/utils'
import { sdgColours } from '@/common/utils'

export default {
  name: 'ppChart2',
  data: function() {
    return {
      results: [],
      filter: '',
      descending: 1,
      showColours: true,
      sdgColours
    }
  },
  computed: {
    filteredResults: function() {
      if (this.filter !== '') {
        return this.results.sort((a, b) => {
          var varA = a[this.filter]
          var varB = b[this.filter]
          console.log(typeof varA)
          if (typeof varA === 'string') {
            varA = varA.toUpperCase()
            varB = varA.toUpperCase()
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
        return this.results
      }

    }
  },
  watch: {
    '$route': 'getData'
  },
  created: function() {
    this.getData()
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
    getData: function() {
      this.$http.get('/chart/pp/2').then((response) => {
        this.results = response.data
      })
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
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+/Edge */
  user-select: none;
  /* Standard */
}
</style>
