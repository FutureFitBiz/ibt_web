<template>
<div class="m-5">
  <h3 class="mt-3 mb-3">Users</h3>
  <div class="">

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search</span>
      </div>
      <input type="text" class="form-control" v-model="search" placeholder="">
      <button @click="showNewUser = true" class="ml-3 btn btn-outline-success ">Add User</button>

    </div>

    <div v-show="showNewUser" class=" ">
      <div class="container text-left list-group-item mb-5 add-user">
        <form @submit.prevent="addNewUser" class="pb-3">
          <div class="mt-3 form-group">
            <h4>New User</h4>
            <label class="mt-3" for="user-first">First</label>
            <input v-model="newUser.first" type="text" class="form-control" id="user-first" placeholder="" required="">
          </div>
          <div class="mt-3 form-group">
            <label class="mt-3" for="exampleInputEmail1">Last</label>
            <input v-model="newUser.last" type="text" class="form-control" id="user-last" placeholder="">
          </div>
          <div class="mt-3 form-group">
            <label class="mt-3" for="exampleInputEmail1">Email</label>
            <input v-model="newUser.email" type="email" class="form-control" id="user-email" placeholder="" required>
            <small class="text-muted">A password will be auto-generated</small>
          </div>

          <div class="form-group mt-4">
            <label for="user-company">Company</label>
            <p><small>Leave this empty, if they are the first user & have not logged in / completed the initial setup yet</small> </p>
            <select v-model="newUser.company_id" class="form-control custom-select mr-sm-2" id="user-company">
              <option value="">Please select a company</option>
              <option v-bind:value="company.id" v-for="company in companies">
                {{company.name}}
              </option>

            </select>
          </div>

          <div class="form-group mt-5">
            <div @click="showNewUser = false" class="ml-1 btn btn-outline-secondary ">Close</div>
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
            <button type="submit" class="btn btn-success ml-2 float-right">Add User</button>
          </div>

        </form>
      </div>
    </div>

    <div class="mt-5 pl-3 pr-3">
      <div class="row text-center">
        <div class="col">
          First
        </div>
        <div class="col">
          Last
        </div>
        <div class="col">
          Email
        </div>
        <div class="col-1">
          user id
        </div>
        <div class="col-3">
          Company id/name
        </div>
        <div class="col-1 text-nowrap">
          Admin
        </div>
        <div class="col-1 text-nowrap">
          Investor
        </div>
      </div>
      <span class="w-100 border-bottom"></span>
    </div>

    <div class="mt-3 text-left">
      <div class="mb-1 " v-for="item in items" :key="item.id">
        <div @click="open(item.id)" class="user d-flex w-100 list-group-item list-group-item-action" v-bind:class="{ 'active-item': active === item.id }">
          <div class="col">
            {{item.first}}
          </div>
          <div class="col">
            {{item.last}}
          </div>
          <div class="col overflow-auto">
            {{item.email}}
          </div>
          <div class="col-1">
            {{item.id}}
          </div>
          <div class="col-3 overflow-hidden">
            {{item.company_id}}: {{item.company}}
          </div>
          <div class="col-1">
            <svg v-if="item.admin" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
          <div class="col-1">
            <svg v-if="item.investor" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
        </div>

        <div v-show="active === item.id" class="list-group-item shadow mb-3">
          <form @submit.prevent="saveUser(item)" class="pb-3">

            <div class="mt-2 form-group">
              <label class="mt-3" for="user-first">First*</label>
              <input v-model="item.first" type="text" class="form-control" id="user-first" placeholder="" maxlength="120" required>
            </div>

            <div class="mt-2 form-group">
              <label class="mt-3" for="user-last">Last</label>
              <input v-model="item.last" type="text" class="form-control" id="user-last" placeholder="" maxlength="120">
            </div>

            <div class="mt-2 form-group">
              <label class="mt-3" for="user-email">Email*</label>
              <input v-model="item.email" type="email" class="form-control" id="user-email" placeholder="" maxlength="120" required>
            </div>

            <div class="mt-5 alert alert-light">
              <h4 class="alert-heading">Company</h4>
              <div class="form-group">
                <select v-model="item.company_id" class="form-control custom-select mr-sm-2" id="">
                  <option v-bind:value="company.id" v-for="company in companies">
                    {{company.name}}
                  </option>
                </select>
              </div>
            </div>

            <div class="alert alert-secondary" role="alert">
              <h4 class="alert-heading">Permissions</h4>
              <div class="mt-1 form-check custom-checkbox">
                <input v-model="item.admin" class="form-check-input" type="checkbox" value="" :id="'check1' + item.id">
                <label class="form-check-label" :for="'check1' + item.id">
                  Admin
                </label>
              </div>

              <div class="mt-1 form-check custom-checkbox">
                <input v-model="item.investor" class="form-check-input" type="checkbox" value="" :id="'check2' + item.id">
                <label class="form-check-label" :for="'check2' + item.id">
                  Investor
                </label>
              </div>

            </div>

            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Emails</h4>
              <div class="form-group">
                <div @click="sendEmail('welcome',item.id)" type="button" class="btn btn-outline-info">Send Welcome email</div>
                <small class="ml-2 text-muted">Send the user a welcome email (WARNING this will also set a new password)</small>
              </div>
              <div class="form-group ">
                <div @click="sendEmail('reset',item.id)" type="button" class="btn btn-outline-danger">Reset Password & send email</div>
                <small class="ml-2 text-muted">Send the user an email with a new password</small>
              </div>
            </div>

            <div class="form-group ">
              <div @click="showModal=true" class="btn btn-outline-danger mt-5">Delete User</div>
            </div>

            <div class="mt-5">
              <div @click="active = ''" class="btn btn-outline-secondary">Close</div>
              <button type="submit" disabled style="display: none" aria-hidden="true"></button>
              <button type="submit" class="btn btn-success ml-2 float-right">Save</button>
            </div>

            <delete-confirm :title="'Confirm User delete'" :text="'Delete ' + item.first + ' ' + item.last + '. Are you sure?'" v-if="showModal" @close="showModal=false" @delete="onDelete(item.id)" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
import DeleteConfirm from '@/common/components/DeleteConfirm'

export default {
  name: 'Users',
  data: function() {
    return {
      showNewUser: false,
      showModal: false,
      active: null,
      lastSaved: null,
      search: '',
      newUser: {
        company_id: "",
      },
      companies: [],
      users: []
    }
  },
  components: {
    DeleteConfirm
  },
  computed: {
    items: function() {
      var search = this.search
      return this.users.filter(function(item) {
        if (search === '') {
          return true
        } else {
          return (item.company + item.email + item.first + item.last).toLowerCase().includes(search)
        }
        return false
      })
    }
  },
  created: function() {
    this.getUsers()
    this.getCompanies()
  },
  methods: {
    getUsers: function() {
      this.users = []
      this.$http.get('admin/user').then((response) => {
        this.users = response.data.data
      })
    },
    getCompanies: function() {
      this.$http.get('admin/company').then((response) => {
        this.companies = response.data.data
      })
    },
    open: function(id) {
      this.active = id === this.active ? null : id
    },
    closeUser: function(id) {
      this.active = null
    },
    addNewUser: function(id) {
      this.$http.post('admin/user', { data: this.newUser }).then((response) => {
        this.$store.commit('setMessage', response.data)
        if (response.data.status === 'success') {
          this.resetAddUser()
          this.getUsers()
          this.setBorder(this.newUser.email)
        }
      })
    },
    sendEmail: function(type, id) {
      this.$http.get(`admin/email/${type}/${id}`).then((response) => {
        // if (resposne.data) {
        this.$store.commit('setMessage', response.data)
        this.getUsers()
        // }
      })
    },
    resetAddUser: function(user) {
      this.showNewUser = false
      this.newUser = {
        email: '',
        first: '',
        last: '',
        company_id: "",
        admin: false,
      }
    },
    setBorder: function() {
      // this.border = id
    },
    saveUser: function(user) {
      // this.active = null
      this.$http.post('admin/user', { data: user }).then((response) => {
        this.$store.commit('setMessage', response.data)
        this.getUsers()
        this.closeUser(user.id)
      })
    },
    onDelete: function(id) {
      console.log('WHAT')
      this.active = null
      this.$http.get('admin/user/delete/' + id).then((response) => {
        this.getUsers()
      })
      this.showModal = false
    },
  },
}
</script>

<style>
.add-user {
  border: 1px solid #28a745 !important;
  background: #f8fff887 !important;
}
</style>
