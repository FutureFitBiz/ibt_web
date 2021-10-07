
<template>
<div class="" style="display: flex;">

  <nav v-if="$store.state.showSidebar" class=" d-md-block h-100 collapse sidebar-width">

    <div class="text-left h-100 pl-2 sidebar-width main-menu">

      <div style="cursor:pointer;" class="h4 nav-link text-left" @click="goto('/')">
        <div class="mt-3">Impact</div>
        <div class=""><span id="benchmark"> Benchmark</span></div>
        <div class="investor-title"><span id=""> Investor Dashboard</span></div>
      </div>
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

  <main role="main" class="w-100 h-100">
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  name: 'Main',
  data: function() {
    return {
      prod: process.env.NODE_ENV.includes(['production']),
      showModal: false,
      showTestButtons: true,
    }
  },
  mounted: function() {},
  components: {},
  computed: {},
  methods: {
    goto: function(path) {
      this.$router.push({ path: path }).catch(err => {})
    },
    isActive: function(value, depth) {
      return this.$route.path.includes(value)
    },
  }
}
</script>


<style>
.sidebar-width {
  width: 100%;
  max-width: 180px;
}

.investor-title {
  color: #8c8c8c;
  font-size: 0.6em;
  line-height: 30px;
}

.main-menu {
  position: fixed;
  overflow: auto;
  top: 0;
  background: var(--colour-sidebar-bg);
  border-right: 1px solid var(--colour-sidebar-border);
}

.bottom-menu-border {
  border-top: 1px solid #d3d3d369;
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  background: var(--colour-sidebar-bg);
  border-right: 1px solid var(--colour-sidebar-border);
}

#benchmark {
  border-bottom: 2px solid #bbd4ce;
}

.nav-text {
  font-size: .9rem;
}

.arrow {
  font-size: 1.6em;
  line-height: 0px;
}

.nav-hover:hover {
  cursor: pointer;
  text-decoration: underline;
}


.fflogo-sm {
  height: 22px;
  vertical-align: text-top;
}

.ff-link-hover:hover {
  text-decoration: underline;
}


.arrow-inactive {
  color: rgba(0, 0, 0, 0.27) !important;
}


.sidebar {
  text-align: left;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding-right: 18px;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh);
  overflow-x: hidden;
  overflow-y: auto;
}

.nav-icon {
  color: grey;
}

.nav-icon:hover {
  cursor: pointer;
  color: black;
}

.nav-bottom {
  position: fixed;
  bottom: 0;
  left: 5%;
  overflow-x: hidden;
  overflow-y: auto;
}

@media (max-width: 969px) {
  .nav-bottom {
    position: fixed;
    bottom: 0;
    left: 2%;
  }
}


@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar-item {
  padding-top: 4px;
  font-size: 100% !important;
}

.sidebar-item span:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
