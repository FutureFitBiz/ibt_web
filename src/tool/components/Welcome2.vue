<template>
<transition>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="card bg-light" style="width: 400px; height: 300px;">
        <div class=" card-header">Introduction</div>
        <div class="card-body" style="height: 11em;">
          <div v-if="currentPage === 1">
            <h4 class="card-title m-0 mt-3">Welcome!</h4>
            <p class="card-text">
              Thank you for signing up.
            <p>
              Here is some quick information to get you started.
            </p>
            </p>
          </div>
          <div v-if="currentPage === 2">
            <p class="card-text mt-3">
              There are two main sections:
              <b>Positive Impacts</b> (at an <i>Activity</i> level), and
              <b>ESG Risks</b> (at a <i>Company</i> level)
              Both tie in to the final report, and are explained in more detail further on.
            </p>
          </div>

          <div v-if="currentPage === 3">
            <h5 class="card-title mt-3">In development</h5>
            <p class="card-text">
              The site is still in development, so if you stumble upon any issues don't hesitate to reach out.
            </p>
          </div>

          <div v-if="currentPage === 4">
            <h5 class="card-title">Need help?</h5>
            <p class="card-text">
              Click the
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg>
              icon to open the help wiki.
            <p>
              Or you can reach out to us at <b>support@futurefitbusiness.org</b>
            </p>
            </p>
          </div>
          <div v-if="currentPage === 5">
            <h5 class="card-title mt-4">Get started!</h5>
            <p class="card-text">
              We recommend starting with <i>Positive Impacts</i>
            </p>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-4">
              <button v-if="currentPage !== 1" @click="back" type="button" class="btn btn-outline-secondary float-left">Back</button>
            </div>
            <div class="col-4">
              <span v-for="i in pages" class="ml-1">
                <svg v-if="i <= currentPage" v-bind:width="dotsize" v-bind:height="dotsize" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" />
                </svg>
                <svg v-else v-bind:width="dotsize" v-bind:height="dotsize" viewBox="0 0 16 16" class="bi bi-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                </svg>
              </span>
            </div>
            <div class="col-4">
              <button v-if="currentPage !== pages" @click="next" type="button" class="btn btn-secondary float-right">Next</button>
              <button v-else @click="finish" type="button" class="btn btn-success float-right">Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Welcome',
  data: function() {
    return {
      pages: 5,
      currentPage: 1,
      dotsize: '0.6em',
    }
  },
  components: {},
  methods: {
    finish: function() {
      this.$store.commit('welcomeComplete')
      this.$http.get('user/welcome_complete')
      this.$router.push({ path: '/positive-impacts' }).catch(err => {})
    },
    next: function() {
      let page = this.currentPage + 1
      if (page > this.pages) {
        page = this.pages
      }
      this.currentPage = page
    },
    back: function() {
      let page = this.currentPage - 1
      if (page < 1) {
        page = 1
      }
      this.currentPage = page
    },
  },
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 1200px;
  margin: 0px auto;
  margin-top: 4em;
  transition: all 0.3s ease;
}
</style>
