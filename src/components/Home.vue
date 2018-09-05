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
    fetch('http://167.114.23.86:7789/?token=' + localStorage.getItem('token'))
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            this.items = json.items
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      location.reload()
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
