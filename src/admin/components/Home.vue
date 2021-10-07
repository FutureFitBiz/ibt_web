<template>
<div class="admin-bg-dark-blue h-100">
  <div class="home-top">
    <div class="p-5 home-text">
      <h1 class="display-5">Hello, {{$store.state.user.first}}!</h1>
      <p>
        Bugs / issues / suggestions / etc, message me on teams, or add to one of the
        <a target="_blank" rel="noopener noreferrer" href="https://www.notion.so/futurefitbiz/Bug-reporting-and-tracking-e9ebf8ab88b3477ba428c753812406fe">Notion.so </a> boards
      </p>
      <br>
    </div>
  </div>


  <div class="container col-8 admin-text-beige">
    <h4 class="m-2 mt-5">Stats</h4>
    <table class="admin-text-light-blue table table-borderless container mt-3">

      <tbody>
        <tr>
          <th scope="row">Users</th>
          <td>{{stats.users}}</td>
        </tr>
        <tr>
          <th scope="row">Users (admin)</th>
          <td>{{stats.admin_users}}</td>
        </tr>
        <tr>
          <th scope="row">Companies </th>
          <td>{{stats.companies}}</td>
        </tr>
        <tr>
          <th scope="row">Products </th>
          <td>{{stats.products}}</td>
        </tr>
        <tr>
          <th scope="row">Impacts Generated </th>
          <td>{{stats.impacts}}</td>
        </tr>

      </tbody>
    </table>
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
    getData: function() {
      this.$http.get('/admin/stats').then((response) => {
        this.stats = response.data
      })
    },
  },
}
</script>

<style>

</style>
