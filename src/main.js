import Vue from 'vue'
import 'lib-flexible'
import i18n from './i18n'
import App from './App'
import router from './router/index.js'
import store from './vuex/store.js'
import './validate.js'
import Star from './component/Star/Star.vue'
import *as API from './api'
import './moke/moke-server.js'



Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('Star',Star)



new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')