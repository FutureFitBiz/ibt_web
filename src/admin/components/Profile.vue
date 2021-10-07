<template>
<div class="container text-left offset-lg-1 col-lg-7 mt-5 mb-5">
  <form @submit.prevent="updateProfile">
    <h2>Profile</h2>
    <div class="mt-5 form-group">
      <label for="exampleInputEmail1">Email</label>
      <input v-model="user.email" type="email" class="form-control" id="user-email" placeholder="">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Change Password</label>
      <input v-model="user.password" type="password" class="form-control" id="user-password">
    </div>

    <div class="form-group">
      <label>First Name</label>
      <input v-model.trim="user.first" class="form-control" maxlength="120">
    </div>
    <div class="form-group">
      <label>Last Name</label>
      <input v-model.trim="user.last" class="form-control" maxlength="120">
    </div>

    <p v-if="error" class="text-danger"> <a>{{ error }}</a> </p>
    <p v-if="message" class="text-success"> <a>{{ message }}</a> </p>
    <button class="mt-5 btn btn-success">Save</button>
  </form>
  <button @click="$store.commit('logout')" class="mt-4 btn btn-outline-danger">Logout</button>

</div>
</template>


<script>
export default {
  name: 'Login',
  data: function() {
    return {
      user: {},
      error: '',
      message: '',
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
      this.error = ''
      this.message = ''
      this.$http.post('user/profile', { 'data': this.user }).then((response) => {
        this.$store.commit('setMessage', response.data)
      })
    },
  }
}
</script>
