<template>
  <header id='navigator'>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">NFV</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="item.link" v-for="item in items" :key="item.link">{{item.name}}</b-nav-item>
          <b-nav-item to="/login" v-if="!token">Login</b-nav-item>
          <b-nav-item @click.prevent="logout" v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>

export default {
  name: 'navigator',
  data () {
    return {
      activeUser: (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null),
      items: [
        { name: 'Home', link: '/home', requireAuth: false },
        { name: 'Collaborators', link: '/collaborators', requireAuth: true }
      ]
    }
  },
  props: [ 'token' ],
  created: function () {
    // this.$emit('setToken', 'lepo')
  },
  methods: {
    logout: function () {
      this.$parent.$refs.api.logout()
    }
  }
}
</script>
