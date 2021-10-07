import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import router from '@/admin/router.js'


Vue.use(Vuex)
var plugins = process.env.VUE_APP_DEBUG === 'true' ? [] : [createPersistedState({ key: HASH })]
export default new Vuex.Store({
  plugins: plugins,
  state: {
    user: {},
    company: {},
    status: '',
    message: '',
    messageTimeout: null,
    app: 'admin',
    loginTitle: 'Admin',
    loginTitle2: 'Impact Benchmark',
    current_year: '',
    intro_complete: false,
    token: '',
    surveyInfo: {
      current: {
        path: '',
        title: '',
        category: '',
      },
      next: {
        fullPath: '',
      },
    }
  },
  mutations: {
    login(state, data) {
      let token = data.access_token
      state.token = token
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
      state.company.name = data.company_name
      state.user.email = data.email
      state.user.first = data.first
      router.push({ path: '/' })
    },
    logout(state) {
      state.token = ''
      router.push({ path: '/login' })
    },
    setMessage(state, data) {
      clearTimeout(state.messageTimeout)
      state.messageTimeout = setTimeout(function() {
        state.message = ''
        state.status = ''
      }, 3000)

      state.message = data.message
      state.status = data.status
    },
  },
  actions: {
    setPositiveImpacts: function(state) {
      Vue.prototype.$http.get('product').then((response) => {
        if (response.data.status === 'success') {
          state.commit('setPositiveImpacts', response.data.data)
        }
      })
    },
    resetIntro: function(state) {
      Vue.prototype.$http.get('delete_company').then((response) => {
        state.commit('resetIntro')
      })
    },
    addProduct: function(state) {
      Vue.prototype.$http.post('product', { data: {} }).then((response) => {
        state.dispatch('setPositiveImpacts')
      })
    }
  },
  modules: {},
  getters: {},
})
