import 'bootstrap-css-only/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

import VueEllipseProgress from 'vue-ellipse-progress'
import axios from 'axios'
import * as filters from '@/common/filters'

const APP = 'IBT'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`
Vue.config.productionTip = false

Vue.use(VueEllipseProgress)

axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log(error)
  return error
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
