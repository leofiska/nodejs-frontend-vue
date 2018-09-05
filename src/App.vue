<template>
  <div>
    <Navigator />
    <div id="app">
      <router-view/>
      <api ref='api' />
    </div>
  </div>
</template>

<script>
import api from '@/lib/api.vue'
import Navigator from '@/components/Navigator'

export default {
  name: 'App',
  components: {
    api,
    Navigator
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
