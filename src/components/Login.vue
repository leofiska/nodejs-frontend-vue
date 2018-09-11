<template>
  <div>
    <h2>Provide your credentials</h2>
    <form action="/post" v-if="!loading">
      <input ref='username' type="text" v-model="username" :placeholder="s.username"><br />
      <input type="password" v-model="password" :placeholder="s.password"><br /><br />
      <input class='btn btn-dark' type="submit" v-on:click.prevent="login" value='login' >
    </form>
    <Loading v-if="loading"></Loading>
     {{ result }}
  </div>
</template>
<script>
import Loading from './Loading.vue'

export default {
  name: 'login',
  components: {
    Loading
  },
  data () {
    return {
      s: {
        username: 'Username',
        password: 'Password'
      },
      loading: false,
      username: '',
      password: '',
      result: ''
    }
  },
  methods: {
    login: function () {
      this.$parent.$refs.api.login(this.username, this.password)
    }
  },
  mounted () {
    this.$refs.username.focus()
  }
}
</script>
<style scoped>
input[type="text"],input[type="password"] {
  padding: 2px 5px;
  margin: 5px 0px !important;
}
</style>
