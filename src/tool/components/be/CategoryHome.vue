<template>
<div class="text-left mt-5 col-10 offset-1 col-xl-8 offset-xl-2">
  <Breadcrumb :crumbs="crumbs" />
  <h2 class="category-title mt-2"> {{category.title}}</h2>
  <div class="mt-4">
    <p class="" v-for="text in category.description">{{text}}</p>
  </div>

  <table class="table mt-5">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col-2"></th>
        <th scope="col-2">Data Awareness </th>
        <th scope="col">Progress Indicator</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in category.items">
        <td @click="goto(`/esg-risks/${item.category_path}/${item.path}`)" class="link-hover">{{item.title}}</td>
        <td class="col-2">
          <div v-if="item.applicable" class="progress" style="width: 50px;">
            <div class="progress-bar" v-bind:class="{ 'bg-warning': (item.percent_complete < 100 && item.percent_complete >= 50), 'bg-danger': item.percent_complete < 50, 'bg-success': item.percent_complete == 100}" role="progressbar"
              :style="'width:' + item.percent_complete + '%'" :aria-valuenow="item.percent_complete" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div>
        </td>
        <td class="col-2">
          <span v-if="item.applicable === false">
            n/a
          </span>
          <span v-if="item.applicable !== false && item.awareness_score">
            {{item.awareness_score}}<span>{{item.awareness_unit}}</span>
            <span class="progress">
              <div class="progress-bar bg-blue" role="progressbar" v-bind:style="'width: ' + item.awareness_score + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </span>
          </span>
        </td>
        <td class="">
          <span v-if="item.applicable === false">
            n/a
          </span>
          <span v-if="item.applicable !== false && item.progress_score">
            {{item.progress_score}}<span>{{item.progress_unit}}</span>
          </span>
        </td>
        <td>
          <router-link :to="{ path: `/esg-risks/${item.category_path}/${item.path}` }" class="m-0 p-0">
            <button v-if="item.complete" type="button" class="btn m-0 pt-0 pb-0 btn-light">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
              </svg>
            </button>
            <button v-else class="btn m-0 pt-0 pb-0 btn-outline-success">Start</button>
          </router-link>
        </td>
      </tr>
    </tbody>

  </table>

</div>
</template>


<script>
import Breadcrumb from '@/tool/components/Breadcrumb'

export default {
  name: 'CategoryHome',
  data: function() {
    return {
      category: {},
      crumbs: []
    }
  },
  created: function() {
    this.getData()
  },
  watch: {
    '$route': 'getData'
  },
  components: {
    Breadcrumb
  },
  methods: {
    goto: function(path) {
      this.$router.push({ path: path }).catch(err => {})
    },
    getData: function() {
      for (let c of this.$store.state.breakEvens) {
        if (c.path == this.$route.params.category) {
          this.category = c
        }
      }
      this.crumbs = [{
          title: 'ESG Risks',
          path: 'esg-risks'
        },
        {
          title: this.category.title,
        }
      ]
    },
  }
}
</script>
