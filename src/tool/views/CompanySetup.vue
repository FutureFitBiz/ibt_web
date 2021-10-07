<template>
<div class="container-fluid mt-5 mb-5 col-8 col-lg-5 text-left">
  <h2>Impact Benchmark Setup</h2>
  <form @submit.prevent="$store.dispatch('completeIntro', survey)">
    <p>
      We need some initial information to set up your account. Please fill in the required fields (you can edit these options later on your profile page):
    </p>
    <h3 class="mt-5">Company Information</h3>
    <p>
      Some information to give report readers a better idea of what the company does.
    </p>
    <div class="question mt-5">
      <h5 class="question-title">Company Name</h5>
      <p class="text-black-50">The company’s full name.</p>
      <input v-model="survey.company_name" type="text" class="form-control" maxlength="120" required>
    </div>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Description</h5>
        <p class="text-black-50">A brief description of the company and its business model.</p>
        <div class=" form-group">
          <textarea class="form-control" v-model="survey.company_description" rows="3"></textarea>
        </div>
      </div>
    </div>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Industry type</h5>
        <p class="text-black-50">The industry the company operates in.</p>
        <input v-model="survey.industry_type" type="text" class="form-control" maxlength="120" required>
      </div>
    </div>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Business Model</h5>
        <p class="text-black-50">Is the company a B2C, a B2B, or a B2M company? (Are direct customers individuals, other businesses or both?)</p>
        <select v-model="survey.business_model" class="form-control custom-select" required>
          <option v-for="x in businessModels"> {{x}} </option>
        </select>
      </div>
    </div>
    <h3 class="mt-5">Reporting Period</h3>
    <p>
      The period of time that the report applies to. These reports are designed to be used side-by-side with the company’s financial information, so to make the report as useful as possible, we suggest making the company’s first report cover the same
      period of time as the last completed financial statements - the company’s last fiscal year.
    </p>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Year</h5>
        <p class="text-black-50">Please select the year you wish to create a report for. This year should be the one in which your reporting period ends.</p>
        <select v-model="survey.year" class="form-control custom-select" required>
          <option v-for="year in years"> {{year}} </option>
        </select>
      </div>
    </div>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Reporting Period - Starting Month</h5>
        <p class="text-black-50">Please select the starting month of the reporting period.</p>
        <select v-model="survey.month_start" class="form-control custom-select" required>
          <option v-for="month in months"> {{month}} </option>
        </select>
      </div>
    </div>
    <div>
      <div class="form-group mt-5">
        <h5 class="question-title">Reporting Period - End Month</h5>
        <p class="text-black-50">Please select the ending month of the reporting period.</p>
        <select v-model="survey.month_end" class="form-control custom-select" required>
          <option v-for="month in months"> {{month}} </option>
        </select>
      </div>
    </div>
    <div class="form-group mt-5">
      <h5 class="question-title">Total revenue</h5>
      <p class="text-black-50">Please enter the total amount of revenue (gross income) the company recognised from all sources combined, during the reporting period, in US$.</p>
      <div class="form-row align-items-center">
        <input v-model="survey.total_revenue" type="number" class="form-control col-5" maxlength="120">
        <span class="ml-2">$</span>
      </div>
    </div>
    <div class="form-group mt-5">
      <h5 class="question-title">Total expenses</h5>
      <p class="text-black-50">Please enter the total amount of expenses (including general expenses, cost of sales, cash and non-cash expenses, etc) the company incurred during the reporting period, in US$.</p>
      <div class="form-row align-items-center">
        <input v-model="survey.total_expenses" type="number" class="form-control col-5" maxlength="120">
        <span class="ml-2">$</span>
      </div>
    </div>
    <button type="submit" disabled style="display: none" aria-hidden="true"></button>
    <button type="submit" class="mb-5 mt-5 btn btn-success float-right">Complete</button>
  </form>
</div>
</template>

<script>
import { months, years, businessModels } from '@/common/utils.js'

export default {
  name: 'Intro',
  data: function() {
    return {
      survey: {},
      months,
      years,
      businessModels,
    }
  },
  components: {},
  methods: {}
}
</script>


<style>
</style>
