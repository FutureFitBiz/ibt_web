<template>
<div class="row">
  <div class="col-6">
    <div class="row">
      <div class="col-2">
        <svg width="55px" height="55px" viewBox="0 0 16 16" class=" bi bi-shield-check text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
          <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
        </svg>
      </div>
      <div class="col-10">
        <span class="text-success">
          ESG topics where the company best mitigated the risks of negative impacts during the period
        </span>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-4 "> <b> ESG Risk </b> </div>
      <div class="col-4"> <b> Progress Indicator </b> </div>
      <div class="col-4"> <b> SDGs </b> </div>
    </div>

    <div class="w-100 divider-lg"></div>

    <div class="row mt-1" v-for="(item, index) in progress">
      <div v-if="index > 0" style="width:94%;" class="divider-sm p-0 ml-2"></div>
      <div class="col-4">
        <span>{{item.middle_name}}</span>
      </div>
      <div class="col-4 mb-1">
        {{item.progress_score}}%
        <span class="progress mb-1">
          <div class="progress-bar bg-success" role="progressbar" v-bind:style="'width: ' + item.progress_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          </div>
        </span>
      </div>
      <div class="col-4 m-auto">
        <div class="d-flex mt-1 flex-wrap">
          <span class="" v-for="sdg in item.sdgs">
            <div class="text-center sdg-colour-box " v-bind:style="{background: sdgColours[sdg]}">{{sdg}}</div>
          </span>
        </div>
      </div>
    </div>
  </div>


  <div class="col-6">
    <div class="row">
      <div class="col-2">
        <svg width="55px" height="55px" viewBox="0 0 16 16" class="bi bi-shield-lock text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
          <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M7.411 8.034a.5.5 0 0 1 .493-.417h.156a.5.5 0 0 1 .492.414l.347 2a.5.5 0 0 1-.493.585h-.835a.5.5 0 0 1-.493-.582l.333-2z" />
        </svg>
      </div>
      <div class="col-10 ">

        <span class="text-danger">
          ESG topics where the company has most steps still needed to track and mitigate risks of negative impacts
        </span>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-4 "> <b> ESG Risk </b> </div>
      <div class="col-4"> <b> Data Awareness </b> </div>
      <div class="col-4"> <b> SDGs </b> </div>
    </div>
    <div class=" divider-lg"></div>

    <div class="mt-1 row" v-for="(item, index) in awareness">
      <div v-if="index > 0" style="width:94%;" class="divider-sm p-0 ml-2"></div>
      <div class="col-4">
        <span>{{item.middle_name}}</span>
      </div>
      <div class="col-4">
        <span>{{item.awareness_score}}%</span>
        <span class="progress mb-1">
          <div class="progress-bar bg-danger " role="progressbar" v-bind:style="'width: ' + item.awareness_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          </div>
        </span>
      </div>
      <div class="m-auto col-4 ">
        <div class=" d-flex flex-wrap mt-1">
          <span class="" v-for="sdg in item.sdgs">
            <div class="text-center sdg-colour-box " v-bind:style="{background: sdgColours[sdg]}">{{sdg}}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { sdgColours } from '@/common/utils'

export default {
  name: 'beBestAndWorst',
  data: function() {
    return {
      hideNA: false,
      polarData: [],
      sdgColours
    }
  },
  props: {
    forPDF: { default: false },
    progress: {
      type: Array,
      default: () => []
    },
    awareness: {
      type: Array,
      default: () => []
    },
  }
}
</script>
