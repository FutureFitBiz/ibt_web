import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/investor/views/Main.vue'
import Login from '@/common/views/Login.vue'
import UrlNotFound from '@/common/components/UrlNotFound.vue'
import Home from '@/investor/components/Home.vue'
import Profile from '@/investor/components/Profile.vue'
import ReportDownload from '@/common/report/ReportDownload.vue'


import store from '@/investor/store.js'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
  if (store.state.token.length === 0) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

const routes = [
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', component: Home, },
      { path: 'reports', redirect: '/' },
      { path: 'report/:company_id', component: ReportDownload, },
      { path: 'profile', component: Profile },
    ],
    beforeEnter: requireAuth
  },
  { path: '*', component: UrlNotFound }
]

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      // return to the top of the page
      return { x: 0, y: 0 }
    }
  },
  routes,
  mode: process.env.VUE_APP_DEBUG === 'true' ? 'hash' : 'history'
})

export default router
