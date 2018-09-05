<template>
  <div id="app">
    <router-view/>
    <api ref='api' />
  </div>
</template>

<script>
import api from '@/lib/api.vue'

export default {
  name: 'App',
  components: { api }
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
