import Vue from 'vue'
import VueRouter from 'vue-router'

// general
import Main from '@/tool/views/Main.vue'
import Login from '@/common/views/Login.vue'
import CompanySetup from '@/tool/views/CompanySetup.vue'
import UrlNotFound from '@/common/components/UrlNotFound.vue'
import Home from '@/tool/components/Home.vue'
import Profile from '@/tool/components/Profile.vue'

// reports
import Report from '@/tool/components/report/Report.vue'
import ReportPP from '@/tool/components/report/ReportPP.vue'
import ReportBE from '@/tool/components/report/ReportBE.vue'
import ReportData from '@/tool/components/report/ReportData.vue'
import ReportDownload from '@/common/report/ReportDownload.vue'

// break evens
import BEHomePage from '@/tool/components/be/BEHomePage.vue'
import BECategoryHome from '@/tool/components/be/CategoryHome.vue'
import BELoader from '@/tool/components/be/Loader.vue'

// positive impacts
import Manage from '@/tool/components/pp/Manage.vue'
import Product from '@/tool/components/pp/Product.vue'
import Impacts from '@/tool/components/pp/Impacts.vue'
import PPLoader from '@/tool/components/pp/Loader.vue'
import PPActionLoader from '@/tool/components/pp/PPActionLoader.vue'
import AddEditProduct from '@/tool/components/pp/AddEditProduct.vue'
import PPHomePage from '@/tool/components/pp/PPHomePage.vue'

import store from '@/tool/store.js'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
  sidebar(to.path)
  if (store.state.token.length === 0) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (to.name !== 'intro' && !store.state.intro_complete) {
    next({ path: '/intro', query: { redirect: '/' } })
  } else {
    next()
  }
}
function pageChecks(to, from, next) {
  sidebar(to.path)
  next()
}

function sidebar(path) {
  if (path != 'reports/download') {
    store.commit('setShowSidebar', true)
  }

}

const routes = [
  { path: '/intro', name: 'intro', component: CompanySetup, beforeEnter: requireAuth },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/',
    component: Main,
    beforeEnter: requireAuth,
    children: [
      { path: '/', redirect: '/home', beforeEnter: pageChecks },
      { path: '/home', component: Home, beforeEnter: pageChecks },
      { path: 'esg-risks', component: BEHomePage, beforeEnter: pageChecks },
      { path: 'esg-risks/:category', component: BECategoryHome, beforeEnter: pageChecks },
      { path: 'esg-risks/:category/:code', component: BELoader, beforeEnter: pageChecks },
      { path: 'positive-impacts', component: PPHomePage, beforeEnter: pageChecks },
      { path: 'positive-impacts/manage', component: Manage, beforeEnter: pageChecks },
      { path: 'positive-impacts/manage/new', component: AddEditProduct, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code/edit', component: AddEditProduct, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code/setup', component: PPLoader, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code/identification', component: PPLoader, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code/impacts-detailed', component: Impacts, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code', component: Product, beforeEnter: pageChecks },
      { path: 'positive-impacts/:product_code/impacts-detailed/:pp_action_id', component: PPActionLoader, beforeEnter: pageChecks },

      { path: 'reports', component: Report, beforeEnter: pageChecks },
      { path: 'reports/esg-risk', component: ReportBE, beforeEnter: pageChecks },
      { path: 'reports/positive-impact', component: ReportPP, beforeEnter: pageChecks },
      { path: 'reports/download', component: ReportDownload, beforeEnter: pageChecks },
      { path: 'reports/data', component: ReportData, beforeEnter: pageChecks },
      { path: 'profile', component: Profile, beforeEnter: pageChecks },
    ],
  },
  { path: '*', component: UrlNotFound, beforeEnter: requireAuth }
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
