
<template>
<div class="text-left pl-0 pr-0">
  <div class=" be-top w-100">
    <div v-show="!finished" class="pt-5 pb-5 col-10 offset-1 col-xl-8 offset-xl-2">
      <Breadcrumb :crumbs="crumbs" :colour="'white'" />
      <h2 class="text-white mt-3">{{title_section.title}}</h2>
      <p class="be-top-description" v-for="text in title_section.description">{{text}}</p>
    </div>
  </div>
  <div class="text-left mt-5 col-10 offset-1 col-xl-8 offset-xl-2">
    <!-- be loader -->

    <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
      Selected answer codes: {{answers}}
    </div>

    <div v-show="!finished">
      <form @submit.prevent="save">
        <div v-for="item in questions" class="question">
          <div class="mt-5">
            <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
              Code {{item.value ? item.value: 'n/a'}}:
              </br>
              Title {{item.value ? item.title: 'n/a'}}:
              </br>
              Logic: {{item.logic.join(', ')}}
            </div>

            <div v-show="!item.logic || item.logic.length === 0  || isVisible(item.logic)">

              <div v-if="item.type ==='section'" class="mt-5">
                <div class="">
                  <h4 v-if="item.title" class="h4 mt-2">{{item.title}}</h4>
                  <p v-for="text in item.description">{{text}}</p>
                </div>
              </div>

              <div v-else>
                <span class="mr-1 question-unfinished">
                  <svg v-if="hasAnswers && !(item.value in answers)" width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-circle-fill text-warning align-middle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </span>
                <h5 v-if="item.title" class="question-title" v-bind:class="{'question-ok': item.value in answers}">
                  {{item.title}}
                </h5>
                <p v-if="item.description" v-for="text in item.description" class="text-black-50">
                  {{text}}
                </p>
              </div>


              <div v-if="item.type === 'radio'" v-for="(option, index2) in item.options">
                <div class="mt-3 form-check">
                  <input v-model="answers[item.value]" v-bind:id="option.title + item.value" v-bind:name="item.value" v-bind:value="option.value" @change="clearSubOptions($event)" type="radio" class="form-check-input">
                  <label v-bind:for="option.title + item.value" class="ml-2 mb-0">
                    {{option.title}}
                  </label>
                  <p v-if="option.description" class="text-black-50 mt-0">
                    <span v-html="option.description"></span>
                  </p>
                </div>
              </div>


              <div v-if="item.type === 'number'" class="form-group">
                <div class="form-row align-items-center">
                  <div class="col-sm-3 my-1 input-group ">
                    <div v-if="item.sub_type === 'currency'" class="input-group-prepend">
                      <div class="input-group-text">$</div>
                    </div>
                    <input v-model="answers[item.value]" type="number" class="form-control">
                  </div>

                  <div v-if="item.unit" class="col-auto my-1">
                    {{item.unit}}
                  </div>
                </div>
              </div>


              <div v-if="item.type === 'text'" class="form-group">
                <div class="">
                  <input v-model="answers[item.value]" type="text" class="form-control" maxlength="120">
                </div>
              </div>

              <div v-if="item.type === 'select'" class="form-group">
                <div class="form-group">
                  <label>{{item.description}}</label>
                  <select v-model="answers[item.value]" class="form-control">
                    <option v-for="option in items[6].options" v-bind:value="option.value">{{option.title}}</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div class="mb-5 mt-5">
          <button type="submit" disabled style="display: none" aria-hidden="true"></button>

          <button v-bind:disabled="noAnswes()" type="submit" class="btn btn-success ml-2 float-right"> Save </button>
        </div>

        <br>
        <br>
        <br>
        <br>
        <br>
      </form>
    </div>


    <div v-show="finished">

      <h3>Thank you for completing <i>{{be.long_name}}</i></h3>

      <div v-if="applicable" class="mt-5">
        <div class="">Data Awareness <i>{{awareness_score}}{{awareness_unit}}</i></div>
        <div class="">Progress Indicator <i>{{progress_score}}{{progress_unit}}</i></div>
      </div>
      <div v-if="!applicable" class="text-black-50">
        <div class="mt-5">Marked as <i><u>not applicable</u></i></b></div>
      </div>

      <div class="row mt-5">
        <div class="col-6">
          <h5 class="text-black-50">Return to</h5>
          <h5>{{be.category}} > {{be.title}}</h5>
        </div>
        <div v-if="next.code !== 'finished'" class="col-6 text-right">
          <h5 class="text-black-50">Next up</h5>
          <h5>{{next.category}} > {{next.title}}</h5>
        </div>

        <div v-if="next.code === 'finished'" class="col-6 text-right">
          <h5 class="text-black-50">You have completed all ESG Risks</h5>
          <h5></h5>
        </div>

      </div>
      <div class="mt-3">
        <router-link v-if="next.code !== 'finished'" class="float-right" :to="{ path: `/esg-risks/${next.category_path}/${next.path}` }">
          <div class="btn btn-success">
            Next
          </div>
        </router-link>
        <router-link v-if="next.code === 'finished'" class="float-right" :to="{ path: '/reports/esg-risk' }">
          <div class="btn btn-success">
            View ESG Risks Report
          </div>
        </router-link>
        <div @click="finished=false" class="btn btn-outline-success ml-2 float-left">
          Back
        </div>
      </div>
    </div>


  </div>
</div>
</template>

<script>
import { checkLogic } from '@/tool/utils/utils'
import Breadcrumb from '@/tool/components/Breadcrumb'


export default {
  name: 'beLoader',
  data: function() {
    return {
      next: {},
      title_section: {},
      finished: false,
      applicable: '',
      questions: {},
      answers: {},
      be_code: '',
      be: {},
      saved: true,
      showImpactsBtn: false,
      showMessage: false,
      show_help: [],
      score: '',
      score_unit: '',
      crumbs: {},
      awareness_score: 0,
      awareness_unit: '',
      progress_score: 0,
      progress_unit: '',
      hasAnswers: false,
    }
  },
  components: {
    Breadcrumb
  },
  created: function() {
    this.init()
  },
  watch: {
    '$route': 'init'
  },
  methods: {
    init: function() {
      this.be_path = this.$route.params.code
      const category_path = this.$route.params.category

      this.finished = false

      for (let c of this.$store.state.breakEvens) {
        if (c.path === category_path) {
          for (let item of c.items) {
            if (item.path === this.be_path) {
              this.be = item
            }
          }
        }
      }

      this.crumbs = [
        { title: 'ESG Risks', path: 'esg-risks' },
        { title: this.be.category, path: this.be.category_path },
        { title: this.be.title }
      ]

      this.getSurvey()
      this.getData()
    },
    noAnswes: function() {
      for (var i in this.answers) {
        return false
      }
      return true
    },
    clearSubOptions: function(e) {
      var checked_name = e.target.name;
      var hidden_values = [];

      var answer_keys = Object.keys(this.answers);

      for (var i = 0; i < answer_keys.length; i++) {
        for (var k = 0; k < this.questions.length; k++) {
          var question = this.questions[k];
          if (question.value == answer_keys[i]) {
            if (question.logic.length != 0 && !checkLogic(question.logic, this.answers)) {
              hidden_values.push(answer_keys[i])
            }
          }
        }
      }
      for (var j = 0; j < hidden_values.length; j++) {
        delete this.answers[hidden_values[j]];
      }
    },
    getSurvey: function() {
      this.$http.get(`/survey/be/${this.be.code}`).then((response) => {
        this.questions = response.data.questions.slice(1)
        this.title_section = response.data.questions[0]
      })
    },

    getData: function() {
      this.$http.get(`/be/${this.be.id}`).then((response) => {
        this.answers = response.data.answers
        this.showMessage = false
        this.hasAnswers = Object.keys(this.answers).length
      })
    },

    save: function() {
      this.$http.post(`/be/${this.be.id}`, { 'data': this.answers }).then((response) => {
        this.showMessage = true
        this.finished = true
        this.awareness_score = response.data.awareness_score
        this.awareness_unit = response.data.awareness_unit
        this.progress_score = response.data.progress_score
        this.progress_unit = response.data.progress_unit
        this.applicable = response.data.applicable
        this.next = {}
        this.getNext()
        this.$store.dispatch('getBreakEvens')
      })
    },
    getNext: function() {
      this.$http.get('/be/next').then((response) => {
        this.next = response.data
      })
    },
    isVisible: function(logic) {
      return checkLogic(logic, this.answers)
    }
  }
}
</script>
