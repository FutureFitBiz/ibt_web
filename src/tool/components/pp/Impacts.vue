<template>
<div class="container text-left offset-1 col-10 mt-5 mb-5">
  <Breadcrumb :crumbs="crumbs" />

  <h3 class=" mt-5">Positive Impacts - Detailed View
    <span class="text-black-50 weight-100">
      (<span v-if="!product.complete">{{product.completed_impacts}}/{{product.total_impacts}}</span>
      <span v-else>Complete</span>)
    </span>

  </h3>
  <sup class="">&#8224;</sup>We generate the Impacts based on your answers in Setup & Identification as accurately as possible, however if a particular Impact does not make sense,
  you can mark it as not applicable (n/a), these Impacts will not show up in the final report.

  <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col"></th>
        <th scope="col">Name</th>
        <th scope="col">Positive Pursuit</th>
        <th scope="col">SDGs</th>
        <th scope="col"></th>
        <th scope="col">n/a<sup class="">&#8224;</sup> ({{product.na_impacts}})</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in $store.state.currentImpacts" v-bind:class="{ 'alert alert-not-applicable': !item.active}">
        <td>#{{item.number}}</td>
        <td>
          <div v-if="item.active" class="progress" style="width: 50px;">
            <div class="progress-bar" v-bind:class="{  'bg-warning': (item.percent_complete < 100 && item.percent_complete >= 50) , 'bg-danger': item.percent_complete < 50, 'bg-success': item.percent_complete == 100}" role="progressbar"
              :style="'width:' + item.percent_complete + '%'" :aria-valuenow="item.percent_complete" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </td>
        <td class=""><span v-if="$store.state.debugMode">{{item.option}} - </span>{{item.description}}</td>
        <td>{{item.pp}}</td>
        <td class="">{{item.sdgs}}</td>
        <td>
          <router-link :to="{ path: `/positive-impacts/${product.path}/impacts-detailed/${item.id}` }" v-if="item.active" class="m-0 p-0">
            <button v-if="item.completed" type="button" class="btn m-0 pt-0 pb-0 btn-light">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
              </svg>
            </button>
            <button v-else-if="item.percent_complete == 0" class="btn m-0 pt-0 pb-0 btn-outline-success">Start</button>
            <button v-else class="btn m-0 pt-0 pb-0 btn-outline-success">Finish</button>
          </router-link>
        </td>
        <td class="">
          <div class="mt-1 form-check custom-checkbox">
            <input v-bind:id="item.id" :checked="!item.active" @change="enableDisableImpact($event)" type="checkbox" class="custom-control-input">
            <label :for="item.id" class="custom-control-label">
            </label>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-if="$store.state.currentImpacts.length === 0" class="highlight mt-5" role="alert">

    <h6 class="m-0">
      Please complete
      <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/setup` }" class="m-0 p-0">
        <a type="button" class="text-success"><u><b>Setup</b></u></a>
      </router-link>
      &
      <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/identification` }" class="m-0 p-0">
        <a type="button" class="text-success"><u><b>Identification</b></u></a>
      </router-link>

      to be assigned Impacts
    </h6>

  </div>



</div>
</template>

<script>
import { findProduct } from '@/tool/utils/utils'
import Breadcrumb from '@/tool/components/Breadcrumb'


export default {
  name: 'Impacts',
  data: function() {
    return {
      product: {},
      actions: [],
      crumbs: []
    }
  },
  components: {
    Breadcrumb,
  },
  watch: {
    '$route': 'loadActions'
  },
  created: function() {
    this.loadActions()
  },
  methods: {
    loadActions: function() {
      this.$store.dispatch('getProducts').then(() => {
        this.product = findProduct(this.$route.params.product_code)
        this.$http.get(`/product/${this.product.id}/impacts`).then((response) => {
          this.$store.commit('setActions', response.data.actions)
        })
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
          },
        ]
      })
    },
    enableDisableImpact: function(e) {
      var active = !e.target.checked;
      var path = '/product/impact/' + e.target.id + '/set_active/' + active;
      this.$http.post(path).then((response) => {
        this.loadActions();
      })
    },
  },
}
</script>
