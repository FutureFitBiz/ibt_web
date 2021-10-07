<template>
<div class="" style="display: flex;">
  <nav v-if="$store.state.showSidebar" class=" d-md-block h-100 collapse sidebar-width" style="width:350px;">
    <div class="text-left h-100 pl-2 sidebar-width main-menu">
      <div style="cursor:pointer;" class="h4 nav-link text-left" @click="goto('/')">
        <div class="mt-3">Impact</div>
        <div class=""><span id="benchmark"> Benchmark</span></div>
      </div>
      <ul class="nav flex-column mb-5 mt-5 nav-text">
        <li class="nav-item mt-3 5 ml-3">
          <div class="sidebar-item pl-0 mt-2" v-for="item in $store.state.menuItems" :key="item.title">
            <div class="nav-hover" @click="goto(`/${item.path}`)">
              <span class="link main-underscore" v-bind:class="{ 'active': isActive(item.path)}">{{ item.title }}</span>
            </div>
            <div v-if="item.path === 'positive-impacts' && isActive('positive-impacts')" class="indent sidebar-item">
              <div class="nav-hover mb-3" @click="goto('/positive-impacts/manage')">
                <span class="link" v-bind:class="{ 'active':isActive('manage') }">Manage Activities</span>
              </div>
              <span class="text-black-50 noselect">Activities</span>
              <div style="border-bottom:1px solid lightgrey"></div>
              <div class="sidebar-item p-0 mb-1 mt-1" v-for="product in $store.state.products" :key="product.id">
                <div class="nav-hover" style="position:relative;" @click="goto(`/positive-impacts/${product.path}`)">
                  <div class="sidebar-status" :class="{'bg-warning': product.percent_complete < 100 && product.percent_complete > 0, 'bg-success': product.percent_complete === 100, 'bg-white': product.percent_complete === 0}"> </div>
                  <span class="link" v-bind:class="{ 'active': isActive(product.path)}">
                    {{ product.name }}
                  </span>
                </div>
                <div v-if="isActive(product.path)" class="indent " v-for="productItem in product.menu_items" :key="productItem.path">
                  <div class="nav-hover" style="position:relative;" @click="goto(`/positive-impacts/${product.path}/${productItem.path}`)">
                    <div class="sidebar-status" :class="{'bg-warning': productItem.percent_complete < 100 && productItem.percent_complete > 0, 'bg-success': productItem.percent_complete === 100, 'bg-white': productItem.percent_complete === 0}">
                    </div>
                    <span class="link" v-bind:class="{ 'active': isActive(productItem.path), 'nav_progress_bar': productItem.percent_complete != undefined}">
                      <span class="align-text-center">{{ productItem.title }}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-3"> </div>
            </div>

            <!-- BE -->

            <div v-show="item.path === 'esg-risks' && isActive('esg-risks')" class="indent sidebar-item">
              <div class="sidebar-item p-0 mb-1 mt-1" v-for="category in $store.state.breakEvens" :key="category.order">
                <div class="nav-hover" style="position:relative;" @click="goto(`/esg-risks/${category.path}`)">
                  <div class="sidebar-status" :class="{'bg-warning': category.percent_complete < 100 && category.percent_complete > 0, 'bg-success': category.percent_complete === 100, 'bg-white': category.percent_complete === 0}"> </div>
                  <span class="link" v-bind:class="{ 'active': isActive(category.path)}">
                    {{ category.title }}
                  </span>
                </div>
                <div v-if="isActive(category.path)" class="indent " v-for="be in category.items" :key="be.order">
                  <div class="nav-hover" style="position:relative;" @click="goto(`/esg-risks/${category.path}/${be.path}`)">
                    <div class="sidebar-status" :class="{'bg-warning': be.percent_complete < 100 && be.percent_complete > 0, 'bg-success': be.percent_complete === 100, 'bg-white': be.percent_complete === 0}"> </div>
                    <span class="link" v-bind:class="{ 'active': isActive(be.path)}">
                      {{ be.title }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="mt-3"> </div>
            </div>
            <div v-show="item.path === 'reports' && isActive('reports')" class="indent sidebar-item">
              <div class="sidebar-item p-0 mb-1 mt-1" v-for="item2 in item.items">
                <div class="nav-hover" @click="goto(`/${item.path}/${item2.path}`)">
                  <span class="link" v-bind:class="{ 'active': isActive(`/${item.path}/${item2.path}`)}">{{ item2.title }}</span>
                </div>
              </div>
              <div class="mt-3"> </div>
            </div>
          </div>
        </li>
        <li v-show="!prod" class="nav-item mt-4 ml-3" style="d-block">
          </br>
          <div v-show="!$store.state.debugMode">
            <div v-on:click="$store.commit('toggleDebug')" style="cursor: pointer;" class=" text-secondary">
              <span>&#128027;</span>
              Enable DEBUG mode
            </div>
          </div>
          <div v-show="$store.state.debugMode">
            <div v-on:click="$store.commit('toggleDebug')" style="cursor: pointer;" class=" text-secondary">
              <span>&#128030;</span>
              Disable DEBUG mode
            </div>
          </div>
          <div class="mt-2" v-show="$store.state.debugMode">
            <div @click="$store.commit('logout')" style="cursor: pointer;" class="mt-2 text-danger">Logout</div>
            <div @click="$store.dispatch('resetIntro')" style="cursor: pointer;" class="mt-1 text-danger">Reset all data</div>
            <div @click="$store.commit('showWelcome')" style="cursor: pointer;" class="mt-1 text-info">Welcome page</div>
            <div @click="goto('/intro')" style="cursor: pointer;" class="mt-1 text-info">Initial setup page</div>
          </div>
        </li>
      </ul>
      </br>
      </br>
      </br>
      </br>
      </br>
    </div>
    <div class="sidebar-width bottom-menu">
      <div class="bottom-menu-border"></div>
      <div class="mt-2 text-black-50">
        <span @click="goto('/profile')" class="nav-icon">
          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
            <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
          </svg>
        </span>
        <span class="ml-2 nav-icon" target="_blank" rel="noopener noreferrer" href="https://futurefitbusiness.org/">
          <a target="_blank" rel="noopener noreferrer" href="https://help.sfibt.com/" class="nav-icon">
            <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-question-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path
                d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </a>
        </span>
      </div>
      <div class="nav-text">
        <div class="text-black-50 mt-2">{{$store.state.userEmail}}</div>
        <div class="text-black-50">
          made by
          <a target="_blank" rel="noopener noreferrer" href="https://futurefitbusiness.org/" class="ff-blue ff-link-hover">Future-Fit
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main role="main" class="w-100">
    <router-view></router-view>
  </main>
  <Welcome v-if="!$store.state.welcome" />
</div>
</template>

<script>
import Welcome from '@/tool/components/Welcome2'


export default {
  name: 'Main',
  data: function() {
    return {
      prod: process.env.NODE_ENV.includes(['production']),
      showModal: false,
      showTestButtons: true,
    }
  },
  mounted: function() {
    this.$store.dispatch('setCompanyInfo')
    this.$store.dispatch('getProducts')
  },
  components: {
    Welcome
  },
  computed: {},
  methods: {
    goto: function(path) {
      this.$router.push({ path: path }).catch(err => {})
    },
    showArrow: function(item) {

    },
    isActive: function(value, depth) {
      return this.$route.path.includes(value)
    },
    clearCache: function() {
      localStorage.clear()
      location.reload()
    },
  }
}
</script>
