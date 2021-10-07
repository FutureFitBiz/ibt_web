<template>
<div class="">



  <div class="highlight pb-3 pl-5 pr-3 pt-1 col-10 offset-1 mt-0">
    <div class="text-center mt-2"><u>Legend</u></div>
    <div class="row ">
      <div class="col-3"> <b>n/a</b> </div>
      <div class="col-9">Risks which are not applicable to the company</div>
      <div class="col-3 mt-1"> <b>Data Awareness</b> </div>
      <div class="col-9 mt-1">The percentage of the key data points needed to calculate the Progress Indicator currently available to the company</div>
      <div class="col-3 mt-1"> <b>Progress Indicators</b> </div>
      <div class="col-9 mt-1">The company’s progress towards mitigating the risk of negative impacts</div>
    </div>
  </div>

  <div class="row mt-4 text-left">
    <div class="col-2"><b> Business Area </b></div>
    <div class="col-10 row">
      <div class="col"> <b>ESG Risk</b> </div>
      <div class="col"><b> Data Awareness</b> </div>
      <div class="col"><b> Progress Indicator </b></div>
    </div>
  </div>

  <div class="" v-for="area in pageItems">
    <div class=" row">
      <div class="w-100 divider-lg"></div>

      <div class="col-2">
        {{area.title}}
      </div>

      <div class="col-10">
        <div v-for="(item, index) in area.items" class="row" v-if="!hideNA || (hideNA && item.applicable && item.complete) ">
          <div class="col-3 mt-2" v-bind:class="{'text-black-50': !item.applicable}">
            {{item.middle_name}}
          </div>

          <div class="col">
            <span class="" v-if="!item.complete">
              <div class="row mt-2">
                <div class="col-3 text-center"> Incomplete </div>
                <div class="col-9"> </div>
              </div>
            </span>
            <span class="text-black-50" v-if="item.applicable === false">
              <div class="row mt-2">
                <div class="col-3 text-center"> n/a </div>
              </div>
            </span>
            <span v-if="item.complete && item.applicable !== false">
              <div class="row mt-2">
                <div class="col-3 text-blue text-center">{{item.awareness_score}}%</div>
                <div class="col-9">
                  <span class="progress mb-1">
                    <div class="progress-bar bg-blue" role="progressbar" v-bind:style="'width: ' + item.awareness_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </span>

                </div>

              </div>
            </span>
          </div>

          <div class="col">
            <span class="text-black-50" v-if="item.applicable === false">
            </span>
            <span v-if="item.applicable !== false && item.awareness_score">
              {{item.progress_score}}{{item.progress_unit}}<span></span>
            </span>
          </div>

          <div v-if="index !== area.items.length -1" class="w-100 divider-sm"></div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import { sdgColours } from '@/common/utils'

export default {
  name: 'beOverview',
  props: {
    forPDF: {
      default: false,
    },
    pageItems: {},
  },
  data: function() {
    return {
      sdgColours,
      hideNA: false,
    }
  },
}
</script>
