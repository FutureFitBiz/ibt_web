<template>
<div class="text-left">
  <div class="setup-top w-100">
    <div class="pt-5 pb-5 col-10 offset-1 col-xl-8 offset-xl-2">
      <Breadcrumb :crumbs="crumbs" />
      <h2 class="text-white mt-3">{{title_section.title}}</h2>
      <p class="setup-top-description" v-for="text in title_section.description">{{text}}</p>
    </div>
  </div>
  <div class="text-left mt-5 mb-5 col-10 offset-1 col-xl-8 offset-xl-2">
    <div class="m-3" v-if="$store.state.debugMode">
      <button type="button" class="btn btn-outline-info  ml-2" @click="checkAll">Check All</button>
      <button type="button" class="btn btn-outline-info ml-2" @click="clearAll">Uncheck All</button>
    </div>
    <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
      Selected answer codes: {{answers.join(', ')}}
    </div>

    <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
      Questions hidden by facets: {{hiddenOptions.join(', ')}}
    </div>

    <form v-if="part1 || (part2 && has_facets)" @submit.prevent="submit">
      <div>
        <div v-for="item in questions" class="question">
          <div v-if="answers.length && item.title === 'Energy'" class="mt-5">
            <p v-if="item.description" v-for="text in item.description" class="text-black-50">
              {{text}}
            </p>
          </div>
          <div v-show="isVisible(item)">
            <div v-if="item.type ==='section'" class="mt-5">
              <div class="bd-callout">
                <h4 v-if="item.title" class="h4 mt-2"><strong><u>{{item.title}}</u></strong></h4>
                <p v-for="text in item.description">{{text}}</p>
              </div>
            </div>

            <div v-else class="">
              <p v-if="item.header" class="mb-1 "><strong><u>{{item.header}}</u></strong></p>

              <div>

                <h5 v-if="item.title" class="question-title mt-5">
                  {{item.title}}
                </h5>
                <div v-if="answers.length && item.title === 'Impact Areas'">
                  <p v-if="item.description" v-for="text in item.description" class="text-black-50">
                    {{text}}
                  </p>
                </div>

                <div v-if="item.type === 'checkbox'" :class="{'highlight': item.title === 'Impact Areas'}" class="form-group ml-2 mt-3">


                  <div v-for="item1 in item.options" class="mt-1 form-check custom-checkbox">
                    <div class="d-flex flex-row mt-2" v-show="!hiddenOptions.includes(item1.value)">
                      <input v-bind:id="item1.value" v-bind:value="item1.value" v-model="answers" @change="checkboxChanged($event)" type="checkbox" class="custom-control-input">
                      <label v-bind:for="item1.value" class="custom-control-label">
                        {{item1.title}}
                        <span v-if="$store.state.debugMode" class="text-black-50">({{item1.value}})</span>
                      </label>
                      <a v-show="item1.help_text" class="ml-2" @click="clickHelp(item1.value)">
                        <HelpCircle :clicked="show_help.includes(item1.value)" />
                      </a>

                    </div>

                    <div v-show="show_help.includes(item1.value)" class="mt-0 pt-0">
                      <div class="bd-callout bd-callout-info">
                        <p><i>{{item1.title}}</i></p>
                        <p>{{item1.help_text}}</p>
                      </div>
                    </div>
                    <!-- 2 -->
                    <div v-show="!hiddenOptions.includes(item2.value) && answers.includes(item1.value)" v-for="item2  in item1.options" class="mt-2 form-check custom-checkbox">
                      <input v-bind:id="item2.value" v-bind:value="item2.value" v-model="answers" @change="checkboxChanged($event)" type="checkbox" class="custom-control-input">
                      <label v-bind:for="item2.value" class="custom-control-label">
                        {{item2.title}}
                        <span v-if="$store.state.debugMode" class="text-black-50">({{item2.value}})</span>
                      </label>
                      <!-- 3 -->
                      <div v-show="!hiddenOptions.includes(item3.value) && answers.includes(item2.value)" v-for="item3  in item2.options" class="mt-1 form-check custom-checkbox">
                        <input v-bind:id="item3.value" v-bind:value="item3.value" v-model="answers" @change="checkboxChanged($event)" type="checkbox" class="custom-control-input">
                        <label v-bind:for="item3.value" class="custom-control-label">
                          {{item3.title}}
                          <span v-if="$store.state.debugMode" class="text-black-50">({{item3.value}})</span>
                        </label>
                        <!-- 4 -->
                        <div v-show="!hiddenOptions.includes(item4.value) && answers.includes(item3.value)" v-for="item4  in item3.options" class="mt-1 form-check custom-checkbox">
                          <input v-bind:id="item4.value" v-bind:value="item4.value" v-model="answers" @change="checkboxChanged($event)" type="checkbox" class="custom-control-input">
                          <label v-bind:for="item4.value" class="custom-control-label">
                            {{item4.title}}
                            <span v-if="$store.state.debugMode" class="text-black-50">({{item4.value}})</span>
                          </label>
                          <!-- 5 levels down, there is only 1 of these.. -->

                          <div v-show="!hiddenOptions.includes(item5.value) && answers.includes(item4.value)" v-for="item5  in item4.options" class="mt-1 form-check custom-checkbox">
                            <input v-bind:id="item5.value" v-bind:value="item5.value" v-model="answers" @change="checkboxChanged($event)" type="checkbox" class="custom-control-input">
                            <label v-bind:for="item5.value" class="custom-control-label">
                              {{item5.title}}
                              <span v-if="$store.state.debugMode" class="text-black-50">({{item5.value}})</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="alert alert-success mt-5" role="alert" v-show="showSavedMessage">
        {{ part1 ? 'Changes Saved' : 'Saved & Impacts generated'}}

        <router-link v-show="part2" :to="{ path: `/positive-impacts/${this.$route.params.product_code}/impacts-detailed` }">
          <div style="line-height: 1;" class="btn btn-success float-right ml-2">
            View Impacts
          </div>
        </router-link>
      </div>
      <div class=" mt-3" v-if="!show_preview && changes">

        <div class="mt-5" v-if="!show_preview && ((part1 && this.$store.state.debugMode) || part2)">
          <h3>Preview</h3>
          <div class="highlight">
            <h5>Current changes
              <div class="btn btn-outline-info float-right" @click="showOptionChanges = !showOptionChanges">{{showOptionChanges ? 'Hide' :'Show'}} </div>
            </h5>
            <div v-show="showOptionChanges" class="mt-3" v-for="property in changes.properties">
              <span v-if="property.added.length || property.deleted.length">
                <b style="font-weight: 700;"> {{property.name}}</b>
              </span>
              <div v-if="property.added.length">
                <span class="text-success" style="font-weight: 700;"> Added </span>
                <div class="" v-for="item in property.added">
                  - {{item.description}}
                </div>
              </div>
              <div v-if="property.deleted.length">
                <span class="text-info" style="font-weight: 700;"> Removed </span>
                <div class="" v-for="item in property.deleted">
                  - {{item.description}}
                </div>
              </div>
            </div>
          </div>


          <div class="highlight">
            <h5>Impacts</h5>
            <div class="mt-3" v-for="property in changes.impacts" v-if="property.added.length || property.deleted.length || property.modified.length">
              <b style="font-weight: 700;"> {{property.name}}</b>

              <div v-if="property.added.length">
                <span class="text-success" style="font-weight: 700;">To be Added </span>
                <div class="row mt-2" v-for="item in property.added">
                  <div class="col-7"> - {{item.text}} </div>
                  <div class="col-2"> {{item.pp}} </div>
                  <div class="col-3"> {{item.sdgs}} </div>
                </div>
              </div>
              <div v-if="property.modified.length">
                <span class="text-info" style="font-weight: 700;"> Modified </span>
                <span class="text-info"> (Data entered will not be affected)</span>
                <div class="row mt-2" v-for="item in property.modified">
                  <div class="col-7"> - {{item.text}} </div>
                  <div class="col-2"> {{item.pp}} </div>
                  <div class="col-3"> {{item.sdgs}} </div>
                </div>
              </div>
              <div v-if="property.deleted.length">
                <span class="text-danger" style="font-weight: 700;">To be Removed </span>
                <span class="text-danger"> (Warning! any data entered will also be removed)</span>
                <div class="row mt-2" v-for="item in property.deleted">
                  <div class="col-7"> - {{item.text}} </div>
                  <div class="col-2"> {{item.pp}} </div>
                  <div class="col-3"> {{item.sdgs}} </div>
                </div>
              </div>
            </div>
            <div v-else>
              <b style="font-weight: 700;"> {{property.name}}</b>
              <p>
                No changes
              </p>
            </div>
          </div>

        </div>
      </div>

      <div class="mt-5 row">
        <div class="col m-2">
          <small class="text-black-50 weight-100 float-right" v-if="part1"><i>*both Setup & Identification are needed to generate Impacts</i></small>
        </div>
      </div>

      <div class="mb-5 ">
        <div v-show="!loading">
          <button type="submit" class="btn btn-success float-right ml-2" :disabled="(!hasNoPreviousAnswers && part1 && !editing) || (part2 && !answers.length)" v-show="(part2 && editing && !show_preview) || part1 || hasNoPreviousAnswers">
            {{part1 && !this.$store.state.debugMode ? 'Save & Continue' : 'Save'}}
          </button>
          <button type="submit" class="btn btn-outline-success float-right ml-2" :disabled="!editing" v-show="answers.length && !hasNoPreviousAnswers && part2 && show_preview">
            Preview changes
          </button>
        </div>
        <div class="float-right" v-show="loading">
          Loading..
        </div>
      </div>

      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
    </form>

    <div v-else class="m-5">
      Please complete
      <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/setup` }" class="m-0 p-0">
        <a type="button" class="text-success"><u>Setup</u></a>
      </router-link> first.
    </div>

  </div>
</div>
</template>

<script>
import { checkLogic, findProduct } from '@/tool/utils/utils'
import HelpCircle from '@/common/components/HelpCircle'
import Breadcrumb from '@/tool/components/Breadcrumb'


export default {
  name: 'ppLoader',
  data: function() {
    return {
      // both
      part1: false,
      part2: false,
      editing: false,
      questions: {},
      title_section: {},
      product: {},
      path: '',
      answers: [],
      changes: null,
      hasNoPreviousAnswers: false,
      hiddenOptions: [],
      showSavedMessage: false,
      visible: {},
      show_help: [],
      crumbs: [],
      show_preview: true,
      showOptionChanges: false,
      loading: false,
      has_facets: false,
    }

  },
  components: {
    HelpCircle,
    Breadcrumb,
  },
  created: function() {
    this.setup()
  },
  watch: {
    '$route': 'setup',
  },
  computed: {},
  methods: {
    setup: function() {
      const routePath = this.$route.path
      this.part1 = routePath.includes('setup')
      this.part2 = routePath.includes('identification')
      this.show_preview = this.part2 === true
      this.showOptionChanges = false
      this.changes = null

      this.product = findProduct(this.$route.params.product_code)
      let part = this.part1 ? '1' : '2'
      this.path = `product/${this.product.id}/setup/${part}/`

      this.crumbs = [
        { title: 'Positive Impacts', path: 'positive-impacts' },
        { title: this.product.name, path: this.product.path, },
        { title: this.part1 ? 'Setup' : 'Identification', },
      ]

      this.getData()
    },
    clickHelp: function(code) {
      if (this.show_help.includes(code)) {
        this.show_help = this.show_help.filter(item => item !== code)
      } else {
        this.show_help.push(code)
      }
    },
    isVisible: function(q) {
      let visible = true
      if (q.logic && q.logic.length > 0) {
        visible = checkLogic(q.logic, this.answers)
      }
      return visible
    },
    checkboxChanged: function(e) {
      this.show_preview = true
      this.editing = true
      this.clearSubOptions(e)
    },
    clearSubOptions: function(e) {
      this.showSavedMessage = false
      const value = e.target.id

      if (!e.target.checked) {
        this.answers = this.answers.filter(el => !el.includes(value))

        // clear other suboptions that depend on this option
        for (var i = 0; i < this.questions.length; i++) {
          const q = this.questions[i]

          if (q.logic && q.logic.length > 0) {
            let visible = checkLogic(q.logic, this.answers)

            if (!visible) {
              var toDel = q.options ? q.options.map(el => el.value) : []
              this.answers = this.answers.filter(el => !toDel.includes(el))
            }
          }
        }
        if (value.includes('X-')) {
          let val = 'X' + value.split('.')[1]
          this.answers = this.answers.filter(el => !el.includes(val))
        }

      }
    },

    submit: function() {
      // don't save part 2 if there's no values,
      // but do if it's part 1
      if (this.part1 || !this.show_preview || this.hasNoPreviousAnswers) {
        this.save()
      } else {
        this.preview()
      }
    },
    preview: function() {
      if (this.part1 || this.answers.length > 0) {
        this.loading = true
        this.$http.post(this.path + 'preview', { 'data': this.answers }).then((response) => {
          this.changes = response.data.data
          this.show_preview = false
          this.loading = false
        })
      }
    },
    save: function() {
      if (this.part1 || this.answers.length > 0) {
        this.show_preview = true
        this.editing = false
        this.loading = true

        if (this.answers.length === 0) {
          this.answers = ['no facets']
        }
        this.$http.post(this.path, { 'data': this.answers }).then((response) => {
          this.changes = null
          this.$store.dispatch('getProducts').then(() => {
            if (this.part1) {
              if (!this.$store.state.debugMode) {
                this.$router.push({ path: `/positive-impacts/${this.$route.params.product_code}/identification` }).catch(err => {})
              } else {
                this.showSavedMessage = true
              }
            } else {
              this.showSavedMessage = true
            }
            this.loading = false
          })
        })
      }
    },
    getData: function() {
      this.$http.get(this.path).then((response) => {
        const data = response.data.data
        this.title_section = data.survey.questions[0]
        this.questions = data.survey.questions.slice(1)
        this.has_facets = data.has_facets
        this.answers = data.checked_values
        this.hasNoPreviousAnswers = this.answers.length === 0
        this.hiddenOptions = data.hidden_options
        this.showSavedMessage = false
      })
    },
    checkAll: function() {
      var res = []
      for (var item of this.questions) {
        let result = this.getItemCodes(item)
        res = res.concat(result)
      }
      this.answers = res
    },
    clearAll: function() {
      this.answers = []
    },
    getItemCodes: function(item) {
      var res = []
      for (var index in item.options) {
        var i = item.options[index]
        res.push(i.value)

        if (i.options && i.options.length > 0) {
          res = res.concat(this.getItemCodes(i))
        }
      }
      return res
    }
  }
}
</script>
