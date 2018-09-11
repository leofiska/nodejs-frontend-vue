import Vue from 'vue'
import App from './App'
import Footer from './Footer'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import api from '@/lib/api'

Vue.use(BootstrapVue)
Vue.component('v-api', api)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  api,
  template: '<App/>',
  components: { App }
})
new Vue({
  el: '#footer',
  router,
  template: '<Footer/>',
  components: { Footer }
})
