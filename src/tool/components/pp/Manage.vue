<template>
<div>
  <div class="text-left mt-5 col-10 offset-1 col-xl-8 offset-xl-2">
    <Breadcrumb :crumbs="crumbs" />
    <h2 class="mt-3">Manage Activities</h2>
    <p>
      Use this page to create a list of the company's activities which lead to impacts (positive changes) for people or the environment. For tips on what to add to this list, scroll down to the instructions at the bottom of this page, or visit the
      Help site by using the (?) button on the left.
    </p>
    <div class=" mb-3">
      <table class="table table-hover mt-5">
        <thead class="">
          <tr class="">
            <th scope="col">Name</th>
            <th scope="col">Setup</th>
            <th scope="col">Impacts: Completed / Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr @mouseover="show=item.id" v-for="item in $store.state.products">
            <td>{{item.name}}</td>
            <td>
              <router-link :to="{ path: `/positive-impacts/${item.path}/setup` }" class="m-0 p-0">
                <button v-bind:class="{'btn-outline-success': !item.setup_complete, 'btn-outline-secondary': item.setup_complete}" class="btn  m-0 pt-0 pb-0">Setup</button>
              </router-link>
            </td>

            <td class="">
              <div v-if="item.setup_complete" class="row">
                <div class="col-5 text-right">
                  {{item.completed_impacts}} / {{item.total_impacts}}
                </div>
                <div class="col-7 text-left">
                  <router-link :to="{ path: `/positive-impacts/${item.path}/impacts-detailed` }" class="m-0 p-0 ml-2">
                    <button class="btn btn-outline-success m-0 pt-0 pb-0">View Impacts</button>
                  </router-link>
                </div>
              </div>
            </td>
            <td>
              <router-link :to="{ path: `/positive-impacts/${item.path}/edit` }" class="m-0 p-0">
                <button class="btn btn-light m-0 pt-0 pb-0">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
                  </svg>
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <div class="d-block">
    <router-link :to="{ path: '/positive-impacts/manage/new' }" class="">
      <button href="#" class="m-5 btn btn-success">Add Activity</button>
    </router-link>
  </div>
  <div class="container text-left mt-3 mb-5 col-10 offset-1 col-xl-8 offset-xl-2">
    <div>
      These activities can include:

      <ul>
        <li>
          <strong><u>Revenue-generating activities</u></strong>
          <p>
            The delivery of physical goods or services to customers, in exchange for which the company receives money. Examples include selling solar lamps, running a private school.
          </p>
        </li>
        <li>
          <strong><u>Non-revenue-generating activities</u></strong>
          <p>
            The delivery of physical goods and services on a philanthropic basis, to strengthen the company’s reputation, or to build trust and goodwill. Examples include donating medical supplies, or electively protecting natural habitats.
          </p>
        </li>
        <li>
          <strong><u>Day-to-day operational activities</u></strong>
          <p>
            Actions within the company's business model, outside of product and services, such as how the company works with its suppliers, runs its operations and interacts with society. Examples include initiatives to hire workers from
            disadvantaged groups, or using other companies' waste as a manufacturing input.
          </p>
        </li>
      </ul>

      <p>
        Activities create positive impact when they change conditions in ways that benefit ‘stakeholders’. Stakeholders can be people (customers, employees, suppliers, communities or markets) or environmental (specific ecosystems, atmospheric air
        quality, plants and animals, or oceans).
      </p>
    </div>
    <div class="list-group mt-5 mb-5" v-if="loading">
      loading
    </div>
  </div>
</div>
</template>

<script>
import Breadcrumb from '@/tool/components/Breadcrumb'
import DeleteConfirm from '@/common/components/DeleteConfirm.vue'

export default {
  name: 'Products',
  data: function() {
    return {
      loading: false,
      active: undefined,
      showDelete: false,
      showEdit: false,
      products: [],
      show: false,
      editItem: {},
      crumbs: [{
          title: 'Positive Impacts',
          path: 'positive-impacts'
        },
        {
          title: 'Manage',
        }
      ]

    }
  },
  components: {
    DeleteConfirm,
    Breadcrumb,
  },
  created: function() {
    this.getProducts()
  },
  methods: {
    openProduct: function(item) {
      this.active = this.active === item.id ? '' : item.id
    },
    onDelete: function(item) {
      this.$http.get(`product/delete/${item.id}`)
      this.showModal = false
      this.getProducts()
    },
    getProducts: function(item) {
      this.$store.dispatch('getProducts')
    },
    editProduct: function(item) {
      this.editItem = item
      this.showEdit = true
    }
  },
}
</script>
