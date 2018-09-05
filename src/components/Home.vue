<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <Loading v-if="loading"></Loading>
    <ul v-if="!loading">
    <li v-for="item in items" :key="item.id">
      {{ item.name }} - {{ item.cpf }}
     </li>
    </ul>
    <button @click='logout'>Logout</button>
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'user',
  components: {Loading},
  data () {
    return {
      loading: true,
      items: []
    }
  },
  created () {
    this.$router.push('/collaborators')
  },
  methods: {
    logout () {
      this.$parent.$refs.api.logout()
    }
  },
  computed: {
    greeting  () {
      return 'Welcome ' + localStorage.getItem('id')
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
