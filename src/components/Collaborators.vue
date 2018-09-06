<template>
  <div class="hello">
    <h1>{{ greeting }}</h1>
      <div v-if="!adding">
      <Loading v-if="items.loading"></Loading>
      <ul v-if="!items.loading">
      <li v-for="item in items.elements" :key="item.id">
        {{ item.name }} - {{ item.cpf }}
       </li>
      </ul>
      <button class='btn btn-dark' @click='refresh'>{{s.refresh}}</button>
      <button class='btn btn-dark' @click='show_add'>{{s.add}}</button>
    </div>
    <div v-else>
      <form v-if="!this.loading" action="/api">
        <input ref="sname" type="text" v-model="name" :placeholder="s.name"><br />
        <input type="text" v-model="cpf" :placeholder="s.cpf"><br /><br />
        <button class='btn btn-dark' @click.prevent='add'>{{s.add}}</button>
        <button class='btn btn-dark' @click.prevent='hide_add'>{{s.cancel}}</button>
      </form>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'collaborators',
  components: {Loading},
  data () {
    return {
      adding: false,
      loading: false,
      sname: '',
      name: '',
      cpf: '',
      s: {
        add: 'add',
        cancel: 'cancel',
        cpf: 'cpf',
        name: 'name',
        refresh: 'refresh'
      },
      items: { tid: -1, loading: true, elements: [] }
    }
  },
  props: [ 'title' ],
  beforeMount () {
    this.$emit('fetch', 'collaborators', { f: 'subscribe' }, { f: this.storno, context: this, obj: this.items })
  },
  beforeDestroy () {
    this.$emit('fetch', 'collaborators', { f: 'unsubscribe' }, { f: this.storno, context: this, obj: this.items })
  },
  mounted () {
    document.title = 'collaborators | ' + this.title
  },
  methods: {
    refresh () {
      this.items.loading = true
      this.$emit('fetch', 'collaborators', { f: 'list' }, { f: this.storno, context: this, obj: this.items })
    },
    add () {
      this.items.loading = true
      this.loading = true
      this.$emit('fetch', 'collaborators', { f: 'add', name: this.name, cpf: this.cpf }, { f: this.storno, context: this, obj: this.items })
    },
    show_add () {
      this.adding = true
    },
    hide_add () {
      this.adding = false
      this.name = ''
      this.cpf = ''
    },
    storno (obj) {
      if (obj.content !== undefined && obj.content.items !== undefined) {
        this.items.elements = obj.content.items
        this.items.loading = false
      }
      if (obj.add !== undefined && obj.add) {
        this.loading = false
        this.hide_add()
      }
    }
  },
  computed: {
    greeting  () {
      var str = 'List'
      return str
    }
  }
}
</script>

<style scoped>
input {
  margin: 5px 0px;
  padding: 2px 5px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
