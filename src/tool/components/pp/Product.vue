<template>
<div class="container text-left offset-1 col-10 mt-5 mb-5">
  <div class="row mt-5">
    <div class="col-10">
      <Breadcrumb :crumbs="crumbs" />
      <h1 class="float-left weight-100 mt-5">{{product.name}} </h1>
    </div>
    <div class="col-2">
      <router-link class="align-text-top ml-3" :to="{ path: `/positive-impacts/${this.$route.params.product_code}/edit` }">
        <button type="button" class="btn btn-light float-right ">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
  <div class="">
    <div class="row mt-2">
      <div class="col-3 weight-100"> Description </div>
      <div class="col-9"> {{product.description}}
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-3 weight-100"> Stage </div>
      <div class="col-9"> {{product.stage_name}} </div>
    </div>
    <div class="row mt-2">
      <div class="col-3 weight-100"> Revenue </div>
      <div class="col-9"> {{product.revenue_type == '0' ? 'N/A' : product.revenue | toCurrency}} </div>
    </div>
    <div class="row mt-2">
      <div class="col-3 weight-100"> Cost </div>
      <div class="col-9"> {{product.cost | toCurrency}} </div>
    </div>
  </div>
  <h4 class=" mt-5">Positive Impacts
    <span class="text-black-50 weight-100">
      (<span v-if="!product.complete">{{product.completed_impacts}}/{{product.total_impacts}}</span>
      <span v-else>Complete</span>)
    </span>
    <router-link :to="{ path: `/positive-impacts/${product.path}/impacts-detailed` }" class="m-0 p-0">
      <span class="h6 btn btn-outline-info float-right  weight-100">
        Detailed view
      </span>
    </router-link>
  </h4>
  <p>
    Below are the Positive Impacts of this activity, identified by the options selected in Setup and Identification. The related Positive Pursuit from Future-Fit’s methodology and UN SDGs are also shown.
  </p>
  <div v-show="!loading">
    <table v-show="product.has_facets && product.has_properties && $store.state.currentImpacts.length" class="table mt-4">
      <tbody>
        <tr v-for="item in $store.state.currentImpacts" v-bind:class="{ 'alert alert-not-applicable': !item.active}">
          <td>#{{item.number}}</td>
          <td>
            <div v-if="item.active" class="progress" style="width: 50px;">
              <div class="progress-bar" v-bind:class="{ 'bg-warning': (item.percent_complete < 100 && item.percent_complete >= 50), 'bg-danger': item.percent_complete < 50, 'bg-success': item.percent_complete == 100}" role="progressbar"
                :style="'width:' + item.percent_complete + '%'" :aria-valuenow="item.percent_complete" aria-valuemin="0" aria-valuemax="100">
              </div>
            </div>
          </td>
          <td class="">{{item.description}}</td>
          <td v-if="item.active">
            <router-link :to="{ path: `/positive-impacts/${product.path}/impacts-detailed/${item.id}` }" class="m-0 p-0">
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
          <td v-else>n/a
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="!product.has_facets || !product.has_properties" class="highlight mt-5" role="alert">
      <h6 class="m-0">
        Please complete
        <span v-if="!product.has_facets">
          <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/setup` }" class="m-0 p-0">
            <a type="button" class="text-success"><u><b>Setup</b></u></a>
          </router-link>
          <span v-if="!product.has_facets && !product.has_properties">
            &
          </span>
        </span>
        <span v-if="!product.has_properties">
          <router-link :to="{ path: `/positive-impacts/${this.$route.params.product_code}/identification` }" class="m-0 p-0">
            <a type="button" class="text-success"><u><b>Identification</b></u></a>
          </router-link>
        </span>

        to be assigned Impacts
      </h6>
    </div>
  </div>
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
      crumbs: [],
      loading: true,
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
      this.loading = true
      this.product = {}
      this.$store.dispatch('getProducts').then(() => {
        this.product = findProduct(this.$route.params.product_code)
        this.$http.get(`/product/${this.product.id}/impacts`).then((response) => {
          // console.log(response.data)
          this.$store.commit('setActions', response.data.actions)
        })

        this.crumbs = [{
            title: 'Positive Impacts',
            path: 'positive-impacts'
          },
          {
            title: this.product.name,
          }
        ]
        this.loading = false
      })
    },
  },
}
</script>

<style>

</style>
