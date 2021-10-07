
<template>
<div class="container-fluid noselect">
  <div class="row">
    <nav id="sidebarMenu" class="noselect col-2 sidebar ">
      <div class="sidebar-sticky">
        <span @click="goto('/home')" class="noselect navbar-brand m-3">IBT Admin</span>
        <span @click="goto('/profile')" class="ml-3 noselect btn btn-outline-secondary btn-sm ">Profile</span>
        <ul class="navbar-nav ml-3 mt-5 noselect">
          <li class="nav-item" @click="goto('/home')">
            <span class="nav-link noselect" v-bind:class="{ 'active': isActive('home')}">Home</span>
          </li>
          <li class="nav-item" @click="goto('/users')">
            <span class="nav-link noselect" v-bind:class="{ 'active': isActive('users')}">Users</span>
          </li>
          <li class="nav-item" @click="goto('/companies')">
            <span class="nav-link noselect" v-bind:class="{ 'active': isActive('companies')}">Companies</span>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="col-10 pl-0 pr-0">
      <router-view></router-view>
    </main>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {
      stats: {}
    }
  },
  created: function() {
    this.getData()
  },
  components: {},
  methods: {
    goto: function(path) {
      // because it does this weird highlighting when using the router-link
      this.$router.push({ path: path })
    },
    isActive: function(value, depth) {
      return this.$route.path.includes(value)
    },
    getData: function() {
      this.$http.get('/admin/stats').then((response) => {
        this.stats = response.data
      })
    },
  },
}
</script>

<style>
.router-link-active {
  color: red !important;
  border: none !important;
}

.router-link {
  border: none !important;
}

.nav-link {
  cursor: pointer;
}
</style>
