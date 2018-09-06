// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    username (state, name) {
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
  template: '<App/>',
  components: { App }
})
