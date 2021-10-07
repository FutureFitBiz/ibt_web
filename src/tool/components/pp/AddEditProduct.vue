
<template>
<div class="text-left mt-5 col-10 offset-1 col-xl-8 offset-xl-2">

  <h2 v-if="isNew" class="modal-title">Add a new Activity</h2>
  <h2 v-else class="modal-title">Edit {{product.name}}</h2>



  <form @submit.prevent="save">
    <div v-for="item in survey.questions" class="question">
      <div class="mt-5">
        <div class="alert alert-dark m-3" role="alert" v-if="$store.state.debugMode">
          Code {{item.value ? item.value: 'n/a'}}:
          </br>
          Title {{item.value ? item.title: 'n/a'}}:
          </br>
          Logic: {{item.logic.join(', ')}}
        </div>
        <div v-show="!item.logic || item.logic.length === 0  || isVisible(item.logic)">
          <div v-if="item.type ==='section'">
            <p v-if="item.title" class="mb-1 mt-5 h4"><strong><u>{{item.title}}</u></strong></p>
            <p v-for="text in item.description">{{text}}</p>
          </div>
          <div v-else>
            <h5 v-if="item.title" class="question-title">
              {{item.title}}
            </h5>
            <p v-if="item.description" v-for="text in item.description" class="text-black-50">
              {{text}}
            </p>
          </div>
          <div v-if="item.type === 'radio'" v-for="(option, index2) in item.options">
            <div class="mt-1 form-check">
              <input v-model="answers[item.value]" v-bind:id="option.value" v-bind:name="item.value" v-bind:value="option.value" @change="clearSubOptions($event)" type="radio" class="form-check-input">
              <label v-bind:for="option.value" class="ml-2 mb-0">
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

          <div v-if="item.type === 'text area'" class="form-group">
            <div class="">
              <textarea v-model="answers[item.value]" class="form-control" rows="2"></textarea>
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

    <div @click="showDeleteConfirm = true" v-show="!isNew" class="btn btn-outline-danger form-group mt-5 mb-5">
      Delete Activity
    </div>


    <div v-if="!isNew" class="alert alert-success mt-5" role="alert" v-show="show.savedMessage">
      Changes Saved
    </div>

    <div class="mt-5 mb-5">
      <router-link :to="{ path: '/positive-impacts/manage' }" class="">
        <div class="float-left btn btn-outline-secondary">Cancel</div>
      </router-link>
      <button type="submit" disabled style="display: none" aria-hidden="true"></button>
      <button :disabled="saveDisabled" type="submit" class="btn btn-success float-right">{{ isNew ? 'Add' : 'Save'}}</button>
    </div>

    <delete-confirm :title="'Confirm Delete Activity'" :text="'This will delete ALL actions/setup/information entered for this Activity.'" v-if="showDeleteConfirm" @delete="deleteProduct" @close="showDeleteConfirm=false" />

    <br>
    <br>
    <br>
    <br>
  </form>

</div>
</template>

<script>
import DeleteConfirm from '@/common/components/DeleteConfirm.vue'
import { checkLogic, findProduct } from '@/tool/utils/utils'


export default {
  name: 'AddEditProduct',
  data: function() {
    return {
      survey: {},
      answers: {},
      action: {},
      actionId: '',
      product: {},
      showMessage: false,
      showDeleteConfirm: false,
      isNew: false,
      saveDisabled: false,
      show: {
        savedMessage: false,
        addedMessage: false,
      }
    }
  },
  components: {
    DeleteConfirm
  },
  created: function() {
    this.init()
  },
  watch: {
    '$route': 'init'
  },
  methods: {
    init: function() {
      const code = this.$route.params.product_code
      if (code) {
        this.product = findProduct(this.$route.params.product_code)
        this.getData()
      } else {
        this.isNew = true
      }
      this.getSurvey()
    },
    clearSubOptions: function(e) {
      var checked_name = e.target.name;
      var hidden_values = [];

      var answer_keys = Object.keys(this.answers);

      for (var i = 0; i < answer_keys.length; i++) {
        for (var k = 0; k < this.survey.questions.length; k++) {
          var question = this.survey.questions[k];
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
      this.$http.get('/survey/add_edit_product').then((response) => {
        this.survey = response.data
      })
    },
    getData: function() {
      this.showMessage = false
      this.$http.get(`product/edit/${this.product.id}`).then((response) => {
        this.answers = response.data
      })
    },
    save: function() {
      this.show.savedMessage = false
      if (!('AE-1' in this.answers)) {
        return
      }
      this.saveDisabled = true

      if (this.isNew) {
        this.$http.post('product', { data: this.answers }).then((response) => {
          this.$store.dispatch('getProducts').then(() => {
            this.$router.push({ path: '/positive-impacts/manage' })
            // this.show.savedMessage = true
            this.saveDisabled = false
          })
        })
      } else {
        this.$http.post(`product/${this.product.id}`, { data: this.answers }).then((response) => {
          this.$store.dispatch('getProducts').then(() => {
            this.show.savedMessage = true
            this.saveDisabled = false
          })
        })
      }
    },
    isVisible: function(logic) {
      return checkLogic(logic, this.answers)
    },
    deleteProduct: function() {
      this.$http.get(`product/delete/${this.product.id}`).then((response) => {
        this.$router.push({ path: '/positive-impacts/manage' })
        this.$store.dispatch('getProducts')
      })

    },
  }
}
</script>
