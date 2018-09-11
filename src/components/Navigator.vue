<template>
  <b-navbar toggleable="md" type="dark" variant="dark" :sticky="true">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">NFV</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="item.path" v-for="item in items.elements" :key="item.path" :disabled="!online" v-if="( item.meta.alwaysVisible || (item.meta.requireAuth && account !== null) || (!item.meta.requireAuth && (account === null && item.meta.guestOnly || !item.meta.guestOnly)) )">{{item.name}}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" :disabled="!online"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" :disabled="!online">Search</b-button>
        </b-nav-form>
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">English (International)</b-dropdown-item>
          <b-dropdown-item href="#">Portuguese (Brazil)</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right :disabled="!online" text="Account">
          <b-dropdown-item to="/login" v-if="!token" :disabled="!online">Sign-In</b-dropdown-item>
          <b-dropdown-item to="/profile" v-if="token" :disabled="!online">Profile</b-dropdown-item>
          <b-dropdown-item @click.prevent="logout" v-if="token" :disabled="!online">Sign-Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'navigator',
  data () {
    return {
      items: {
        tid: -1,
        loading: true,
        elements: [
          {
            name: 'Home',
            path: '/home',
            meta: {
              alwaysVisible: true,
              requireAuth: false,
              guestOnly: false
            }
          },
          {
            name: 'Collaborators',
            path: '/collaborators',
            meta: {
              alwaysVisible: false,
              requireAuth: true
            }
          }
        ]
      }
    }
  },
  props: [
    'token',
    'online'
  ],
  created: function () {
    // this.$emit('settoken', 'lepo')
  },
  methods: {
    logout: function () {
      this.$emit('logout')
    }
  }
}
</script>
