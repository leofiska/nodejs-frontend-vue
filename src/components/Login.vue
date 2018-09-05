<template>
  <div>
    <h2>Provide your credentials</h2>
    <form action="/post" v-if="!loading">
      <label><b>Username</b></label>
      <input type="text" v-model="username"><br />
      <label><b>Password</b></label>
      <input type="password" v-model="password"><br /><br />
      <input type="submit" v-on:click.prevent="login" value='login'>
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
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
