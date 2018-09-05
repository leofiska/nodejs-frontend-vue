<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
    <Loading v-if="items.loading"></Loading>
    <ul v-if="!items.loading">
    <li v-for="item in items.elements" :key="item.id">
      {{ item.name }} - {{ item.cpf }}
     </li>
    </ul>
    <button @click='logout'>Logout</button>
    <button @click='update'>Update</button>
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'user',
  components: {Loading},
  data () {
    return {
      items: { tid: -1, loading: true, elements: [] }
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    update () {
      this.$parent.$refs.api.fetch('collaboratorslist', this.items)
    },
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
