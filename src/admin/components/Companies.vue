<template>
<div class="m-5">
  <h3 class="mb-3 mt-5">Companies</h3>
  <div class="">

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search</span>
      </div>
      <input type="text" class="form-control" v-model="search" placeholder="Company">
      <button @click="showNew = true" class="ml-3 btn btn-outline-success ">Add Company</button>
    </div>

    <div v-if="showNew" class=" ">
      <div class="container text-left list-group-item mb-5 add-user">
        <form @submit.prevent="addNew" class="pb-3">
          <div class="mt-3 form-group">
            <h4>New Company</h4>
            <label class="mt-3">Name</label>
            <input v-model="newItem.name" type="text" class="form-control" id="" placeholder="" required>
          </div>

          <div>
            <div class="form-group">
              <label for="">Description</label>
              <input v-model="newItem.description" type="text" class="form-control" id="" placeholder="">
            </div>

            <div class="form-group">
              <label for="">Industry type</label>
              <input v-model="newItem.industry_type" type="text" class="form-control" id="" placeholder="">
            </div>

            <div class="form-group">
              <label for="">Reason of use</label>
              <input v-model="newItem.reason_of_use" type="text" class="form-control" id="" placeholder="">
            </div>

            <h4 class="alert-heading">Reporting period / Initial Benchmark</h4>
            <div class="form-group">
              <label for="">Year</label>
              <select v-model="newItem.year" class="form-control" id="" required>
                <option v-for="year in years"> {{year}} </option>
              </select>
              <small>The initial year they will see</small>
            </div>
            <div class="form-group">
              <label for="">Month Start</label>
              <select v-model="newItem.month_start" class="form-control" id="" required>
                <option v-for="month in months"> {{month}} </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Month End</label>
              <select v-model="newItem.month_end" class="form-control" id="" required>
                <option v-for="month in months"> {{month}} </option>
              </select>
            </div>
            <div class="form-group">
              <div class="alert alert-secondary" role="alert">
                <div class="mt-1 form-check custom-checkbox">
                  <input v-model="newItem.hidden" id="approved-check" type="checkbox" class="custom-control-input">
                  <label for="approved-check" class="custom-control-label">
                    Mark Company as hidden (ie a test company) <span class="text-black-50 ml-2">this will hide it from the data shown in the investor app.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group mt-5">
            <button @click="showNew = false" class="ml-1 btn btn-outline-secondary ">Close</button>
            <button type="submit" class="ml-1 btn btn-outline-success float-right">Add Company</button>
          </div>

        </form>
      </div>
    </div>

    <div class="mt-5 container">
      <div class="row ">
        <div class="col-4">
          Name
        </div>
        <div class="col-2">
          id
        </div>
        <div class="col-3">
          Industry
        </div>
        <div class="col-1">
          PP
        </div>
        <div class="col-1">
          BE
        </div>
        <div class="col-1 text-nowrap">
          Hidden
        </div>
      </div>
    </div>

    <div class="mt-3 text-left">
      <div class="mb-1" v-for="item in items" :key="item.id">


        <button @click="open(item.id)" class="d-flex w-100 list-group-item list-group-item-action" v-bind:class="{ 'active-item': active === item.id }">
          <div class="col-4">
            {{item.name}}
          </div>
          <div class="col-2">
            {{item.id}}
          </div>
          <div class="col-3">
            {{item.industry_type}}
          </div>
          <div class="col-1">
            {{item.pp_percent}}% <span class="text-black-50"> ({{item.pp_finished}}/{{item.pp_total}}) </span>
          </div>
          <div class="col-1">
            {{item.be_percent}}% <span class="text-black-50">({{item.be_finished}}/{{item.be_total}}) </span>
          </div>
          <div class="col-1">
            <svg v-if="item.hidden" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
        </button>

        <div v-if="active === item.id" class="list-group-item shadow mb-3">

          <form @submit.prevent="updateItem(item)" class="">
            <div class="mt-2 form-group">
              <label class="mt-3">Name</label>
              <input v-model="item.name" type="text" class="form-control" required>
            </div>

            <div>
              <div class="form-group">
                <label for="">Description</label>
                <input v-model="item.description" type="text" class="form-control" placeholder="">
              </div>

              <div class="form-group">
                <label for="">Industry type</label>
                <input v-model="item.industry_type" type="text" class="form-control" placeholder="" required>
              </div>

              <div>
                <div class="form-group mt-5">
                  <h5 class="question-title">Business Model</h5>
                  <p class="text-black-50">The main industry type your company falls under.</p>
                  <select v-model="item.business_model" class="form-control custom-select" required>
                    <option v-for="x in businessModels"> {{x}} </option>
                  </select>
                </div>
              </div>


              <div class="form-group mt-3">
                <label>Reporting Year</label>
                <select v-model="item.year" class="form-control custom-select mr-sm-2">
                  <option v-for="year in years"> {{year}} </option>
                </select>
              </div>
              <div class="form-group">
                <label>Reporting Period Month Start</label>
                <select v-model="item.month_start" class="form-control custom-select mr-sm-2">
                  <option v-for="month in months"> {{month}} </option>
                </select>
              </div>
              <div class="form-group">
                <label>Reporting Period Month End</label>
                <select v-model="item.month_end" class="form-control custom-select mr-sm-2">
                  <option v-for="month in months"> {{month}} </option>
                </select>
              </div>


              <div class="form-group">
                <div class="alert alert-secondary" role="alert">
                  <div class="mt-1 form-check custom-checkbox">
                    <input v-model="item.hidden" id="approved-check2" type="checkbox" class="custom-control-input">
                    <label for="approved-check2" class="custom-control-label">
                      Mark Company as hidden (ie a test company) <span class="text-black-50 ml-2">this will hide it from the data shown in the investor app.</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group mt-5">
                <div @click="showModal=true" class="btn btn-outline-danger">Delete Company</div>
              </div>

              <div class="mt-5">
                <button @click="active = ''" class="btn btn-outline-secondary">Close</button>
                <button type="submit" disabled style="display: none" aria-hidden="true"></button>
                <button type="submit" class="btn btn-success ml-2 float-right">Save</button>
              </div>
              <delete-confirm :title="'Confirm Company Delete'" :text="'This will delete all associated benchmarks and surveys. Are you sure?'" v-if="showModal" @close="showModal=false" @delete="onDelete(item.id)" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import DeleteConfirm from '@/common/components/DeleteConfirm'
import { years, months, businessModels } from '@/common/utils.js'
export default {
  name: 'Companies',
  data: function() {
    return {
      years,
      months,
      businessModels,
      showNew: false,
      showModal: false,
      active: null,
      search: '',
      newItem: {},
      companies: []
    }
  },
  components: {
    DeleteConfirm
  },
  computed: {
    items: function() {
      var search = this.search
      return this.companies.filter(function(item) {
        if (search === '') {
          return true
        } else {
          return (item.name + item.description + item.id).toLowerCase().includes(search)
        }
        return false
      })
    }
  },
  created: function() {
    this.getItems()
  },
  methods: {
    getItems: function() {
      this.companies = []
      this.loading = true
      this.$http.get('admin/company').then((response) => {
        this.companies = response.data.data
        this.loading = false
      })
    },
    open: function(id) {
      this.active = id === this.active ? null : id
    },
    addNew: function(id) {
      this.$http.post('admin/company', { data: this.newItem }).then((response) => {
        this.$store.commit('setMessage', response.data)
        if (response.data.status === 'success') {
          this.resetAddItem()
          this.getItems()
        }
      })
    },
    resetAddItem: function() {
      this.showNew = false;
      this.newItem = {
        email: '',
      }
    },
    updateItem: function(item) {
      this.$http.post('admin/company', { data: item }).then((response) => {
        this.$store.commit('setMessage', response.data)
        if (response.data.status === 'success') {
          this.getItems()
        }
      })
    },
    onDelete: function(id) {
      this.active = null
      this.$http.get('admin/company/delete/' + id).then((response) => {
        this.$store.commit('setMessage', response.data)
        this.getItems()
      })
      this.showModal = false
    },
  },
}
</script>

<style>
.add-user {
  border: 1px solid #28a745 !important;
  background: #f8fff887 !important
}

.active-item {
  background: #ecececb8 !important;
}
</style>
