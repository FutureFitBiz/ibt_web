<template>
<div class="text-left ">
  <div class="pp-top w-100">
    <div class="pt-5 pb-5 col-10 offset-1 col-xl-8 offset-xl-2">
      <Breadcrumb :crumbs="crumbs" />
      <h2 class="pp-top-title mt-3">{{title_section.title}}</h2>
      <p class="pp-top-description" v-for="text in title_section.description">{{text}}</p>
    </div>
  </div>
  <div class="mt-5 col-10 offset-1 col-xl-8 offset-xl-2">
    <div class="">
      <h2 class="weight-100">Impact #{{action.number}}</h2>
      <h2>{{action.description}}</h2>
      <div class="mt-4">
        <div class=""> <span class="weight-100">Activity: </span> {{product.name}} </div>
        <div class=""> <span class="weight-100">Reporting Period: </span>{{product.reporting_period}} </div>
        <div class=""> <span class="weight-100">Because you clicked: </span>{{action.text}} </div>
        <div class=""> <span class="weight-100">Positive Pursuit: </span><span class="text-black-50">({{action.pp}})</span> {{action.pp_text}} </div>
        <div class="mt-3"> <span class="weight-100"><i>Please note that all data should apply to the reporting period, only. </i></span></div>
      </div>
    </div>
    <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
      Selected answer codes: {{answers}}
    </div>
    <form @submit.prevent="save">
      <div v-for="item in questions" class="question">
        <div class="mt-5">
          <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
            Code {{item.value ? item.value: 'n/a'}}:
            </br>
            Title {{item.value ? item.title: 'n/a'}}:
            </br>
            Logic: {{item.logic}}
          </div>
          <div v-show="!item.logic || item.logic.length === 0  || isVisible(item.logic)">
            <div v-if="item.type ==='section'" class="mt-5">
              <h3 v-if="item.title" class="pt-5 weight-100">{{item.title}}</h3>
              <p class="mt-0 pt-0" v-for="text in item.description">{{text}}</p>
            </div>
            <div v-else>
              <span class="mr-1 question-unfinished">
                <svg v-if="hasAnswers && !(item.value in answers)" width="0.8em" height="0.8em" viewBox="0 0 16 16" class="bi bi-circle-fill text-warning align-middle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </span>
              <h5 v-if="item.title" class="question-title mb-1" :class="{'question-ok-title': item.value in answers, 'question-unfinished-title': hasAnswers && !(item.value in answers)}">
                {{item.title}}
              </h5>
              <p v-if="item.description" v-for="text in item.description" class="mt-0 pt-0"
                :class="{'text-black-50': !hasAnswers && !(item.value in answers),'question-ok-description': item.value in answers, 'question-unfinished-description': hasAnswers && !(item.value in answers)}">
                {{text}}
              </p>
              <img v-if="item.value === 'A-2'" class="w-100" src="@/assets/pi-3.png">
            </div>
            <div class="mt-2" v-if="item.type === 'radio'" v-for="(option, index2) in item.options">
              <div class="mt-3 form-check">
                <input v-model="answers[item.value]" v-bind:id="option.title + item.value" v-bind:name="item.value" v-bind:value="option.value" @change="clearSubOptions($event)" type="radio" class="form-check-input">
                <div class=" d-flex flex-row">
                  <label v-bind:for="option.title + item.value" class="ml-2 mb-0">
                    {{option.title}}
                  </label>
                  <a v-show="option.help_text" class="ml-2" @click="clickHelp(option.value)">
                    <HelpCircle :clicked="show_help.includes(option.value)" />
                  </a>
                </div>
                <div v-show="show_help.includes(option.value)" class="text-black-50">
                  <div class="bd-callout bd-callout-info">
                    <p><i>{{option.title}}</i></p>
                    <p>{{option.help_text}}</p>
                  </div>
                </div>
                <p v-if="option.description" class="text-black-50 mt-0">
                  <span v-html="option.description"></span>
                </p>
              </div>
            </div>
            <div v-if="item.type === 'number'" class="form-group">
              <div class="input-group align-items-center">
                <div v-if="item.sub_type === 'currency'" class="input-group-prepend">
                  <div class="input-group-text">$</div>
                </div>
                <input v-model="answers[item.value]" type="number" class="form-control col-5" maxlength="120">

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
            <div v-if="item.type === 'text area'" class="form-group">
              <textarea class="form-control" v-model="answers[item.value]" rows="3"></textarea>
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
      <div class="alert alert-success message mt-4" v-show="showMessage" role="alert">
        Changes Saved
        <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/impacts-detailed` }">
          <div style="line-height: 1;" class="btn btn-outline-success float-right ml-2 mb-5">Return to Impacts</div>
        </router-link>
      </div>
      <div class="mb-5 mt-5">
        <button type="submit" disabled style="display: none" aria-hidden="true"></button>
        <button type="submit" class="btn btn-success ml-2 float-right">Save</button>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
    </form>
  </div>
</div>
</template>

<script>
import { checkLogic, findProduct } from '@/tool/utils/utils'
import HelpCircle from '@/common/components/HelpCircle'
import Breadcrumb from '@/tool/components/Breadcrumb'

export default {
  name: 'ppAction',
  data: function() {
    return {
      questions: {},
      title_section: {},
      answers: {},
      action: {},
      actionId: '',
      product: {},
      saved: true,
      showImpactsBtn: false,
      showMessage: false,
      show_help: [],
      crumbs: [],
      hasAnswers: false,
    }
  },
  components: {
    HelpCircle,
    Breadcrumb,
  },
  created: function() {
    this.init()
  },
  watch: {
    '$route': 'init'
  },
  methods: {
    init: function() {
      this.product = findProduct(this.$route.params.product_code)
      this.actionId = this.$route.params.pp_action_id
      for (const item of this.$store.state.currentImpacts) {
        if (String(item.id) === this.actionId) {
          this.action = item
        }
      }
      this.crumbs = [{
          title: 'Positive Impacts',
          path: 'positive-impacts'
        },
        {
          title: this.product.name,
          path: this.product.path,
        },
        {
          title: 'Impacts',
          path: 'impacts-detailed',
        },
        {
          title: '#' + this.action.number,
        }
      ]

      this.getSurvey()
      this.getData()
    },
    clickHelp: function(code) {
      if (this.show_help.includes(code)) {
        this.show_help = this.show_help.filter(item => item !== code)
      } else {
        this.show_help.push(code)
      }
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
      this.$http.get('/survey/pp_action').then((response) => {
        this.questions = response.data.questions.slice(1)
        this.title_section = response.data.questions[0]
      })
    },

    getData: function() {
      this.$http.get(`/product/${this.product.id}/impact/${this.actionId}`).then((response) => {
        this.answers = response.data.answers
        this.hasAnswers = Object.keys(this.answers).length
        this.showMessage = false
      })
    },
    save: function() {
      var data = {}
      data['answers'] = this.answers;
      data['pp'] = this.action['pp']
      data['text'] = this.action['text']
      data['id'] = this.action['id']

      this.$http.post(`/product/${this.product.id}/impact/${this.actionId}`, { 'data': data }).then((response) => {
        this.showMessage = true
        this.showImpactsBtn = true
        this.$store.dispatch('getProducts')

      })
    },
    isVisible: function(logic) {
      return checkLogic(logic, this.answers)
    }
  }
}
</script>
