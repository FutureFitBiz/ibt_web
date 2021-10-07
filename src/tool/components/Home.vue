<template>
<div class="dashboard text-left col-md-10 offset-md-1 col-xl-8 offset-xl-2">
  <div class="row mt-5">
    <div class="col">
      <h4 class="weight-100">Company Info
        <span v-if="editSetup">(Editing)</span>
      </h4>
      <div v-show="editSetup" class="">
        <form @submit.prevent="updateProfile">
          <div class=" form-group">
            <label class="mt-3">Name</label>
            <input class="form-control" v-model.trim="company.name" type="text" maxlength="120" required="">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" v-model="company.description" rows="3"></textarea>
          </div>
          <div class="form-group mt-4">
            <label>Industry</label>
            <p class="text-black-50">The main industry type your company falls under.</p>
            <input class="form-control" v-model="company.industry_type" maxlength="120" type="text" required>
          </div>
          <div class="form-group mt-4">
            <label>Total revenue</label>
            <p class="text-black-50">Please enter the total amount of revenue (gross income) the company recognised from all sources combined, during the period, in US$.</p>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">$</div>
              </div>
              <input v-model="company.total_revenue" type="number" min="0" class="form-control col-5" maxlength="120" required>
            </div>
          </div>
          <div class="form-group mt-4">
            <label>Total expenses</label>
            <p class="text-black-50">Please enter the total amount of expenses (including general expenses, cost of sales, cash and non-cash expenses, etc) the company incurred during the period, in US$.</p>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">$</div>
              </div>
              <input v-model="company.total_expenses" type="number" class="form-control col-5" maxlength="120" required>
            </div>
          </div>
          <div class="form-group mt-5">
            <label>Business Model</label>
            <p class="text-black-50">The main industry type your company falls under.</p>
            <select v-model="company.business_model" class="form-control custom-select" required>
              <option v-for="x in businessModels"> {{x}} </option>
            </select>
          </div>
          <div class="mt-5 alert alert-warning">
            <h6>
              Reporting Period
            </h6>
            <small>Make sure you think about the dates of the data you have already entered when changing these </small>
            <div class="form-group mt-3">
              <label>Year</label>
              <select v-model="company.year" class="form-control custom-select mr-sm-2">
                <option v-for="year in years"> {{year}} </option>
              </select>
            </div>
            <div class="form-group">
              <label>Month Start</label>
              <select v-model="company.month_start" class="form-control custom-select mr-sm-2">
                <option v-for="month in months"> {{month}} </option>
              </select>
            </div>
            <div class="form-group">
              <label>Month End</label>
              <select v-model="company.month_end" class="form-control custom-select mr-sm-2">
                <option v-for="month in months"> {{month}} </option>
              </select>
            </div>
          </div>
          <div class="alert alert-success message mt-4" v-show="showMessage" role="alert">
            Changes Saved
          </div>
          <div v-show="showErrors">
            <div class="alert alert-danger  mt-4">
              <p v-for="err in errors">{{err}}</p>
            </div>
          </div>
          <div class="mt-5 mb-5">
            <div v-on:click.prevent="cancel" class="btn btn-outline-secondary float-left">Cancel</div>
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
            <button type="submit" class="btn btn-success ml-2 float-right">Save</button>
          </div>
        </form>
      </div>
      <div v-show="!editSetup" class="w-100">
        <h4>
          {{company.name}}
          <button v-if="!showCompanyInfo" @click="showCompanyInfo = true" type="button" class="btn btn-light float-right ml-2">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <button v-if="showCompanyInfo" @click="showCompanyInfo = false" type="button" class="btn btn-light float-right ml-2">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
          </button>
          <button @click="editSetup = true" type="button" class="btn btn-light float-right ml-2">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
              <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
            </svg>
          </button>
        </h4>
        <div v-if="warnings.length" class="alert alert-warning mt-4" role="alert">
          Warning
          <div class="" v-for="warning in warnings">
            {{warning}}
          </div>
        </div>
        <div v-show="showCompanyInfo">
          <div class="row mt-4">
            <div class="col-3 weight-100"> Reporting Period </div>
            <div class="col-9"> {{company.reporting_period}} </div>
          </div>
          <div class="row mt-2">
            <div class="col-3 weight-100"> Revenue </div>
            <div class="col-9"> {{company.total_revenue | toCurrency}} </div>
          </div>
          <div class="row mt-2">
            <div class="col-3 weight-100"> Cost </div>
            <div class="col-9"> {{company.total_expenses | toCurrency}} </div>
          </div>
          <div class="row mt-2">
            <div class="col-3 weight-100"> Business Model </div>
            <div class="col-9"> {{company.business_model | toCurrency}} </div>
          </div>
          <div class="row mt-2">
            <div class="col-3 weight-100"> Industry </div>
            <div class="col-9"> {{company.industry_type | toCurrency}} </div>
          </div>
          <div class="row mt-2">
            <div class="col-3 weight-100"> Description </div>
            <div class="col-9"> {{company.description}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="row mt-5">
    <div class="col-lg-4">
      <vue-ellipse-progress :progress="$store.state.scores.pp" :line="'butt'" :color="gradient.pp">
        <span slot="legend-value">% Complete</span>
        <p slot="legend-caption">Positive Impacts</p>
      </vue-ellipse-progress>
    </div>
    <div class="col-lg-8">
      <h4 @click="goto('/positive-impacts')" class="weight-100 link-hover">Positive Impacts</h4>
      <table class="table  table-sm mt-3">
        <thead>
          <tr>
            <th scope="col-6">Activity</th>
            <th scope="col">Impacts completed</th>
            <th scope="col-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in $store.state.products">
            <td @click="goto(`/positive-impacts/${item.path}`)" class="col-6 link-hover">{{item.name}}</td>
            <td class="">{{item.completed_impacts}} / {{item.total_impacts}}</td>
            <td class="col-2">
              <div class="progress">
                <div class="progress-bar" v-bind:class="{ 'bg-success': item.percent_complete === 100, 'bg-warning':(item.percent_complete < 100 && item.percent_complete >= 50), 'bg-danger': item.percent_complete < 50}" role="progressbar"
                  :style="'width:' + item.percent_complete + '%'" :aria-valuenow="item.percent_complete" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col-lg-4">
      <vue-ellipse-progress :progress="$store.state.scores.be" :color="gradient.be" :line="'butt'">
        <span slot="legend-value">% Complete</span>
        <p slot="legend-caption">ESG Risks</p>
      </vue-ellipse-progress>
    </div>
    <div class="col-lg-8">
      <h4 @click="goto('/esg-risks')" class="weight-100 link-hover">ESG Risks</h4>
      <table class="table table-sm mt-3">
        <thead>
          <tr>
            <th scope="col-6">Business Area</th>
            <th scope="col">Sections completed</th>
            <th scope="col-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in $store.state.breakEvens">
            <td @click="goto(`/esg-risks/${item.path}`)" class="col-6 link-hover">{{item.title}}</td>
            <td class="">{{item.total_complete}} / {{item.total}}</td>
            <td class="col-2">
              <div class="progress">
                <div class="progress-bar" v-bind:class="{ 'bg-success': item.percent_complete === 100, 'bg-warning':(item.percent_complete < 100 && item.percent_complete >= 50), 'bg-danger': item.percent_complete < 50}" role="progressbar"
                  :style="'width:' + item.percent_complete + '%'" :aria-valuenow="item.percent_complete" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-5">
  </div>
</div>
</div>
</div>
</template>


<script>
import { years, months, businessModels } from '@/common/utils.js'

const progressCircles = {
  be: {
    radial: false,
    colors: [{
        color: '#c1dfc4',
        offset: 0.1,
        opacity: '1',
      },
      {
        color: '#bbd4ce',
        offset: 100,
        opacity: '0.6',
      },
    ]
  },
  pp: {
    radial: false,
    colors: [{
        color: '#fdd6bd',
        offset: 0.1,
        opacity: '1',
      },
      {
        color: '#f794a4',
        offset: 100,
        opacity: '0.6',
      },
    ]
  },
}
export default {
  name: 'Home',
  data: function() {
    return {
      gradient: progressCircles,
      setupComplete: false,
      editSetup: false,
      missingSetupItems: [],
      showCompanyInfo: false,
      showMessage: false,
      company: {},
      errors: [],
      message: '',
      showMessage: false,
      showErrors: false,
      years,
      months,
      businessModels,
      warnings: []
    }
  },
  created: function() {
    this.getCompany()
  },
  methods: {
    goto: function(path) {
      this.$router.push({ path: path }).catch(err => {})
    },
    getCompany: function() {
      this.$http.get('company/profile').then((response) => {
        this.company = response.data
        this.warnings = response.data.warnings
      })
    },
    cancel: function() {
      this.showMessage = false
      this.showErrors = false
      this.editSetup = false
    },
    updateProfile: function() {
      this.showMessage = false
      this.showErrors = false
      setTimeout(() => {
        this.$http.post('company/profile', { data: this.company }).then((response) => {
          if (response.data.status == 'success') {
            this.getCompany()
            this.$store.dispatch('setCompanyInfo')
            this.showMessage = true
          } else {
            this.errors = ['error saving']
            this.showErrors = true
          }
        })
      }, 300)
      // }
    },
  },
}
</script>
