<template>
<div class="reports col-10 offset-1 text-left">

  <div class="row mt-5"> </div>
  <h3 class="weight-100">ESG Risks Report</h3>
  <div v-if="$store.state.scores.be !== 100" class=""><i>ESG Risks - {{$store.state.scores.be}}% complete</i></div>
  <div class="row mt-5"> </div>


  <div class="row">
    <div class="col-6">
      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-shield-check text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
        <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <span class="text-success">
        Environmental and social risks the company is doing the most to mitigate.
      </span>

      <div class="row">
        <div class="col-4 "> <b> ESG Risk </b> </div>
        <div class="col-4"> <b> Progress Indicator </b> </div>
        <div class="col-4"> <b> SDGs </b> </div>
      </div>

      <div class="w-100 divider-lg"></div>

      <div class="row" v-for="(item, index) in progress">
        <div v-if="index > 0" style="width:94%;" class="divider-sm p-0 ml-2"></div>
        <div class="col-4">
          <span>{{item.title}}</span>
        </div>
        <div class="col-4 mb-1">
          {{item.progress_score}}%
          <span class="progress mb-1">
            <div class="progress-bar bg-success" role="progressbar" v-bind:style="'width: ' + item.progress_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            </div>
          </span>
        </div>
        <div class="col-4 mb-1 mt-1">
          <div class="d-flex flex-wrap">
            <span class="" v-for="sdg in item.sdgs">
              <div class="text-center sdg-colour-box " v-bind:style="{background: sdgColours[sdg]}">{{sdg}}</div>
            </span>
          </div>
        </div>
      </div>
    </div>


    <div class="col-6">
      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-shield-lock text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z" />
        <path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        <path d="M7.411 8.034a.5.5 0 0 1 .493-.417h.156a.5.5 0 0 1 .492.414l.347 2a.5.5 0 0 1-.493.585h-.835a.5.5 0 0 1-.493-.582l.333-2z" />
      </svg>

      <span class="text-danger">
        Potentially negative environmental and social impacts the company should most pay attention to.
      </span>

      <div class="row">
        <div class="col-4 "> <b> ESG Risk </b> </div>
        <div class="col-4"> <b> Data Awareness </b> </div>
        <div class="col-4"> <b> SDGs </b> </div>
      </div>
      <div class=" divider-lg"></div>

      <div class=" row" v-for="(item, index) in awareness">
        <div v-if="index > 0" style="width:94%;" class="divider-sm p-0 ml-2"></div>
        <div class="col-4">
          <span>{{item.title}}</span>
        </div>
        <div class="col-4">
          <span>{{item.awareness_score}}%</span>
          <span class="progress mb-1">
            <div class="progress-bar bg-danger " role="progressbar" v-bind:style="'width: ' + item.awareness_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            </div>
          </span>
        </div>
        <div class="col-4 mb-1 mt-1">
          <div class="d-flex flex-wrap">
            <span class="" v-for="sdg in item.sdgs">
              <div class="text-center sdg-colour-box " v-bind:style="{background: sdgColours[sdg]}">{{sdg}}</div>
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- <h4 onclick="window.print();"> Print </h4> -->
  </br>
  </br>
  </br>
  </br>



  <div class="row mt-5 ">
    <div class="col"><b> Business area </b></div>
    <div class="col"> <b>ESG Risk</b> </div>
    <div class="col"><b> Data awareness</b> </div>
    <div class="col"><b> Progress Indicator </b></div>
  </div>

  <div class="" v-for="area in breakEvens">
    <div class=" row">

      <div class="w-100 divider-lg"></div>

      <div class="col-2">
        {{area.title}}
      </div>

      <div class="col-10">
        <div v-for="(item, index) in area.items" class="row" v-if="!hideNA || (hideNA && item.applicable && item.complete) ">
          <div class="col" v-bind:class="{'text-black-50': !item.applicable}">
            {{item.title}}
          </div>

          <div class="col">
            <span v-if="!item.complete">
              Incomplete
            </span>
            <span class="text-black-50" v-if="item.applicable === false">
              n/a
            </span>
            <span v-if="item.complete && item.applicable !== false">
              <span>{{item.awareness_score}}%</span>
              <span class="progress mb-1">
                <div class="progress-bar" role="progressbar" v-bind:style="'width: ' + item.awareness_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </span>
            </span>
          </div>

          <div class="col">
            <span class="text-black-50" v-if="item.applicable === false">
              <!-- n/a -->
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


  <!-- <div class="">
    <be-polar-sdg></be-polar-sdg>
  </div> -->

  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

</div>
</template>

<script>
import bePolarSdg from '@/tool/components/charts/bePolarSdg'
import { sdgColours } from '@/common/utils'
import jsPDF from 'jspdf';

export default {
  name: 'ReportBE',
  data: function() {
    return {
      breakEvens: [],
      progress: [],
      awareness: [],
      hideNA: false,
      polarData: [],
      sdgColours
    }
  },
  created: function() {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  components: {
    bePolarSdg,
  },
  methods: {
    getData: function() {
      this.$http.get('/chart/be/list').then((response) => {
        this.breakEvens = response.data
      })
      this.$http.get('/chart/be/worst_and_best').then((response) => {
        this.progress = response.data.progress
        this.awareness = response.data.awareness
      })

      // var doc = new jsPDF()
      //
      // doc.text('Hello world!', 10, 10)
      // doc.save('a4.pdf')
    },
    sdgUrl: function(sdg) {
      return require(`@/assets/sdg_icons/${sdg}.png`)
    },

  },
}
</script>

<style>

</style>
