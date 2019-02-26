<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand style="cursor: pointer;" @click="$router.push('/')">Budget Tracker</b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />
    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="this.$store.state.isAuth" @click="logout">Logout</b-nav-item>
        <b-nav-item v-if="!this.$store.state.isAuth" @click="$router.push('/login')">Login</b-nav-item>
        <b-nav-item @click="$router.push('/expenses')">View Expenses</b-nav-item>
        <b-nav-item @click="$router.push('/categories')">View Categories</b-nav-item>
        <b-nav-item @click="$router.push('/new')">New Expense</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <nuxt/>
</div>
</template>

<script>
// Import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  methods: {
    logout() {
      localStorage.removeItem('budgetToken')
      location.href = '/login'
    }
  }
}
</script>

<style>

</style>
