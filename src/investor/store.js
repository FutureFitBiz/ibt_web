import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import router from '@/investor/router.js'

Vue.use(Vuex)

var plugins = process.env.VUE_APP_DEBUG === 'true' ? [] : [createPersistedState({ key: HASH })]
export default new Vuex.Store({
  plugins: plugins,
  state: {
    app: 'INVESTOR',
    company: {},
    token: '',
    userEmail: '',
    loginTitle: 'Impact Benchmark',
    loginTitle2: 'Investor Dashboard',
    debugMode: false,
    reports: [],
    latest: [],
    incompleteCompanies: [],
    totalImpacts: 0,
    activeReport: false,
    activeFullReport: false,
    showSidebar: true,
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
      state.welcome = data.welcome
      state.showSidebar = true
      router.push({ path: '/' })
    },
    setUserEmail(state, value) {
      state.userEmail = value
    },
    showFullReport(state, id) {
      state.activeReport = id
      state.activeFullReport = true
      router.push({ path: '/reports' }).catch(()=>{})
    },
    hideFullReport(state) {
      state.activeFullReport = false
    },
    toggleactiveReport(state, id) {
      state.activeReport = id === state.activeReport ? null : id
    },
    setReports(state, data) {
      state.reports = data.companies
      state.incompleteCompanies = data.incomplete_companies
      state.latest = data.latest
      state.totalImpacts = data.total_impacts
    },
    setShowSidebar(state, status) {
      state.showSidebar = status
    },
    setCompany(state, company) {
      state.company = company
    },
  },
  actions: {
    getReports: function(state, id) {
      Vue.prototype.$http.get('investor/reports').then((response) => {
        state.commit('setReports', response.data)
      })
    },
  },
  modules: {},
  getters: {},
})
