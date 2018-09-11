<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    {{token}}
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
  props: [
    'title',
    'token'
  ],
  mounted () {
    document.title = 'home | ' + this.title
  },
  methods: {
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
