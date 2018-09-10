<template>
  <div>
    <v-api ref='api' :token="token" @setToken="token = $event" :online="online" @setOnline="online = $event" />
    <Navigator :token="token" @setToken="token = $event" @logout="logout" :online="online" />
    <div id="app">
      <router-view @fetch="fetch" @subscribe="subscribe" @unsubscribe="unsubscribe" :title="title" :online="online" />
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator'

export default {
  name: 'App',
  data () {
    return {
      token: localStorage.getItem('token'),
      online: false,
      title: 'NFV'
    }
  },
  created () {
  },
  components: {
    Navigator
  },
  methods: {
    fetch (method, options, item) {
      this.$refs.api.fetch(method, options, item)
    },
    subscribe (method, options, item) {
      this.$refs.api.subscribe(method, options, item)
    },
    unsubscribe (method, options, item) {
      this.$refs.api.unsubscribe(method, options, item)
    },
    logout () {
      this.$refs.api.logout()
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  min-height: 100vh;
}
</style>
