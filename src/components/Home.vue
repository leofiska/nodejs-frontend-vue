<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {
      loading: true,
      items: []
    }
  },
  created () {
  },
  methods: {
    logout () {
      this.$parent.$refs.api.logout()
    }
  },
  computed: {
    greeting  () {
      var str = 'Welcome'
      if (localStorage.getItem('id') !== null) {
        str += ' ' + localStorage.getItem('id')
      }
      return str
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
