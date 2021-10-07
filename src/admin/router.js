import Vue from 'vue'
import VueRouter from 'vue-router'
import UrlNotFound from '@/common/components/UrlNotFound.vue'
import Profile from '@/admin/components/Profile.vue'
import Users from '@/admin/components/Users.vue'
import Companies from '@/admin/components/Companies.vue'
import Home from '@/admin/components/Home.vue'
import Main from '@/admin/views/Main.vue'
import Login from '@/common/views/Login.vue'
import store from '@/admin/store.js'

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
      { path: '/home', component: Home, },
      { path: '/profile', component: Profile, },
      { path: '/users', component: Users, },
      { path: '/companies', component: Companies, },
    ],
    beforeEnter: requireAuth
  },
  { path: '*', component: UrlNotFound }
]

const router = new VueRouter({
  routes,
  mode: process.env.VUE_APP_DEBUG === 'true' ? 'hash' : 'history'
})


export default router
