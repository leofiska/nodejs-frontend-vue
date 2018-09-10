import Vue from 'vue'
import App from './App'
import Footer from './Footer'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import Vuex from 'vuex'
import api from '@/lib/api'
import feapi from '@/lib/feapi'

Vue.use(Vuex)
Vue.use(feapi)
Vue.use(BootstrapVue)
Vue.component('v-api', api)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    ws: null,
    online: false
  },
  mutations: {
    ws (state, ws) {
      state.ws = ws
    },
    online (state, online) {
      state.online = online
    }
  },
  actions: {
    update_ws (store, ws) {
      ws.createSocket()
      store.commit('ws', ws)
    },
    set_online (store, online) {
      store.commit('online', online)
    }
  }
})

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
