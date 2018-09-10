// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Footer from './Footer'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import Vuex from 'vuex'
import api from '@/lib/api'

Vue.use(Vuex)
Vue.use(api)
Vue.use(BootstrapVue)
Vue.component('v-api', api)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    token (state, name) {
      state.token = name
    }
  },
  actions: {
    update_token (store, name) {
      store.commit('token', name)
    }
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  api,
  template: '<App/>',
  components: { App }
})
new Vue({
  el: '#footer',
  router,
  store,
  template: '<Footer/>',
  components: { Footer }
})
