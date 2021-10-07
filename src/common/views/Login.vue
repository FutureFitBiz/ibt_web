<template>
<div class="">
  <div class="text-center login mt-5">
    <form v-if="!reset" @submit.prevent="login" class="form-signin shadow-lg rounded-more">
      <img class="mb-4 align-middle" src="@/assets/ff-logo.png" alt="" width="272" height="72">
      <h3 class=" mt-4 font-weight-normal">{{$store.state.loginTitle}}</h3>
      <h5 v-if="$store.state.loginTitle2" class="weight-100 mb-4 pb-2">{{$store.state.loginTitle2}}</h5>
      <p v-if="error" class="text-danger">
        <a>{{ error }}</a>
      </p>

      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model.trim="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <button class="btn btn-lg btn-primary btn-block">Sign in</button>
      <a @click="showReset" class="btn-block text-black-50 link" href="#"><u>Reset Password</u></a>
      <p class="mt-5 mb-3 text-muted">Future-Fit 2020</p>
    </form>

    <form v-if="reset" @submit.prevent="resetPassword" class="form-signin shadow-lg">
      <img class="mb-4 align-middle" src="@/assets/ff-logo.png" alt="" width="272" height="72">
      <h3 class=" m-4 pb-2 font-weight-normal">Impact Benchmark Tool</h3>
      <p v-if="error" class="text-danger"> <a>{{ error }}</a> </p>
      <p v-if="message" class="text-success"> <a>{{ message }}</a> </p>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <button class="mt-2 btn btn-lg btn-primary btn-block">Send</button>
      <a @click="back" class="btn-block text-black-50" href="#"><u>Back</u></a>
      <p class="mt-5 mb-3 text-muted">Future-Fit 2020</p>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    let state = {
      reset: false,
      user: {
        email: '',
        password: '',
        app: this.$store.state.app
      },
      error: '',
      message: '',
    }
    if (process.env.VUE_APP_DEBUG === 'true') {
      state.user.email = 'tester@futurefitbusiness.org'
      state.user.password = '123456'
    }
    return state
  },
  components: {},
  methods: {
    login: function() {
      this.error = ''
      this.user.app = this.$store.state.app
      this.$http.post('login', this.user).then((response) => {
        if (Object.keys(response.data).length && response.data.access_token) {
          this.$store.commit('login', response.data)
        } else {
          this.error = response.data.message
        }
      })
    },
    back: function() {
      this.error = ''
      this.message = ''
      this.reset = false
    },
    showReset: function() {
      this.error = ''
      this.message = ''
      this.reset = true
    },
    resetPassword: function() {
      this.error = ''
      this.message = ''
      this.$http.post('reset/password', this.user).then((response) => {
        if (response.data && response.data.status === 'success') {
          this.message = response.data.message
          this.reset = false
          this.error = ''
        } else {
          this.error = response.data.message
        }
      })
    }
  }
}
</script>


<style scoped>
.bg {
  background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
}

.btn-primary {
  color: #fff;
  background-color: #1c93b5;
  border-color: #1c93b5;
  background-color: rgba(54, 162, 235) !important;
  border-color: rgba(54, 162, 235) !important;
}


.login {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.rounded-more {
  border-radius: 1em;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
