import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import router from '@/tool/router.js'


function getSurveyPosition(items, path) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].items) {
      let subItems = items[i].items
      for (let y = 0; y < subItems.length; y++) {
        if (subItems[y].path === path) {
          return [i, y]
        }
      }

    }
  }
}

Vue.use(Vuex)

var plugins = process.env.VUE_APP_DEBUG === 'true' ? [] : [createPersistedState({ key: HASH })]
export default new Vuex.Store({
  plugins: plugins,
  state: {
    app: 'IBT',
    token: '',
    userEmail: '',
    userName: '',
    loginTitle: 'Impact Benchmark',
    loginTitle2: 'Company Assessment',
    showSidebar: false,
    editingSetupAnswers: false,
    debugMode: false,
    welcome: false,
    current_year: '',
    intro_complete: false,
    company: {},
    menuItems: [],
    currentImpacts: [],
    products: [],
    breakEvens: [],
    scores: {
      be: 0,
      pp: 0,
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    logout(state) {
      state.token = ''
      router.push({ path: '/login' })
    },
    login(state, data) {
      this.commit('setToken', data.access_token)
      if (data.intro_complete) {
        this.dispatch('getBreakEvens')
      }
      state.current_year = data.current_year
      state.menuItems = data.menu_items
      state.welcome = data.welcome
      this.commit('setIntro', data.intro_complete) // this will also redirect to '/'
    },
    setIntro(state, value) {
      state.intro_complete = value
      router.push({ path: '/' })
    },
    setCurrentYear(state, value) {
      state.current_year = value
    },
    setUserEmail(state, value) {
      state.userEmail = value
    },
    setUserName(state, value) {
      state.userName = value
    },
    resetIntro(state) {
      state.intro_complete = false
      state.token = ''
      router.push({ path: '/login' })
    },
    setCompany(state, company) {
      state.company = company
    },
    toggleDebug(state) {
      state.debugMode = !state.debugMode
    },
    setActions(state, actions) {
      state.currentImpacts = actions
    },
    setBreakEvens(state, data) {
      state.breakEvens = data
      this.commit('setScores')
    },
    setProducts(state, products) {
      state.products = products
      this.commit('setScores')
    },
    welcomeComplete(state) {
      state.welcome = true
    },
    showWelcome(state) {
      state.welcome = false
    },
    setScores(state) {
      function totalPercent(items) {
        let total = 0
        let percent = 0
        let result = 0
        for (let item of items) {
          total += 1
          percent += item.percent_complete
        }
        if (total && percent) {
          result = Math.round(percent / total)
        }
        return result
      }
      state.scores.be = totalPercent(state.breakEvens)
      state.scores.pp = totalPercent(state.products)
    },
    setEditingSetupAnswers(state, id) {
      state.editingSetupAnswers = id
    },
    setShowSidebar(state, status) {
      state.showSidebar = status
    },
  },
  actions: {
    setCompanyInfo: function(state) {
      Vue.prototype.$http.get('user/company').then((response) => {
        var data = response.data
        if (data.status === 'success') {
          state.commit('setCompany', data.company)
          state.commit('setUserEmail', data.user_email)
          state.commit('setUserName', data.user_first)
          this.dispatch('getBreakEvens')
        } else {
          state.commit('setIntro', true)
        }
      })
    },
    resetIntro: function(state) {
      Vue.prototype.$http.get('delete_company').then((response) => {
        state.commit('resetIntro')
      })
    },
    deleteProducts: function(state) {
      Vue.prototype.$http.get('delete_products').then((response) => {
        state.commit('resetIntro')
      })
    },
    completeIntro: function(state, data) {
      Vue.prototype.$http.post('company_intro', { data: data }).then((response) => {
        if (response.data.status == 'success') {
          state.commit('setIntro', true)
        }
      })
    },
    getProducts: function(state) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.get('product').then((response) => {
          if (Object.keys(response.data).length !== 0) {
            state.commit('setProducts', response.data.data)
          } else {
            state.commit('setProducts', [])
          }
          resolve()
        })
      })
    },
    getBreakEvens: function(state) {
      Vue.prototype.$http.get('be').then((response) => {
        if ( Object.keys(response.data).length !== 0) {
          state.commit('setBreakEvens', response.data)
        } else {
          state.commit('setBreakEvens',[])
        }
      })
    },
  },
  modules: {},
  getters: {},
})
