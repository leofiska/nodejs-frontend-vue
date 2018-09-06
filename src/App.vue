<template>
  <div>
    <api ref='api' :token="token" @setToken="token = $event" />
    <Navigator :token="token" @setToken="token = $event" />
    <div id="app">
      <router-view @fetch="fetch"/>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api.vue'
import Navigator from '@/components/Navigator'

export default {
  name: 'App',
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  components: {
    api,
    Navigator
  },
  methods: {
    fetch (method, item) {
      this.$refs.api.fetch(method, item)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
