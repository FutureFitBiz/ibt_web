<template>
<div class="container text-left offset-lg-1 col-lg-7 mt-5 mb-5">
  <form @submit.prevent="updateProfile">
    <h2>Profile</h2>
    <div class=" form-group">
      <label class="mt-3">Email</label>
      <input v-model.trim="user.email" type="email" class="form-control" maxlength="120" required>
    </div>
    <div class="form-group">
      <label>First Name</label>
      <input v-model.trim="user.first" class="form-control" maxlength="120">
    </div>
    <div class="form-group">
      <label>Last Name</label>
      <input v-model.trim="user.last" class="form-control" maxlength="120">
    </div>
    <h5 class="mt-5">Change password</h5>
    <div class="form-group">
      <label>Current Password</label>
      <input v-model="user.password" type="password" class="form-control" id="user-password">
    </div>
    <div class="form-group">
      <label>New Password</label>
      <input v-model="user.new_password" type="password" class="form-control" id="user-password2">
    </div>
    <div class="form-group">
      <label>Confirm New Password</label>
      <input v-model="user.confirm_password" type="password" class="form-control" id="user-password3">
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
      <div v-on:click.prevent="$store.commit('logout')" class="btn btn-outline-danger float-left">Logout</div>
      <button type="submit" disabled style="display: none" aria-hidden="true"></button>
      <button type="submit" class="btn btn-success ml-2 float-right">Save</button>
    </div>
    <br>
    <br>
    <br>
  </form>
</div>
</template>


<script>
import { years, months, businessModels } from '@/common/utils.js'

export default {
  name: 'Login',
  data: function() {
    return {
      user: {},
      errors: [],
      message: '',
      showMessage: false,
      showErrors: false,
      years,
      months,
      businessModels
    }
  },
  created: function() {
    this.$http.get('user/profile').then((response) => {
      this.user = response.data
    })
  },
  components: {},
  methods: {
    updateProfile: function() {
      this.showMessage = false
      this.showErrors = false

      if (this.user.new_password) {
        if (this.user.new_password != this.user.confirm_password) {
          this.errors = ["New password confirmation, passwords don't match"]
          this.showErrors = true
          return
        }
      }
      setTimeout(() => {
        this.$http.post('user/profile', { data: this.user }).then((response) => {
          if (response.data.status == 'success') {
            this.$store.dispatch('setCompanyInfo')
            this.showMessage = true
          } else {
            this.errors = response.data.message
            this.showErrors = true
          }
        })
      }, 300)
      // }
    },
  }
}
</script>


<style>

</style>
