import Vue from 'vue'
import 'lib-flexible'
import i18n from './i18n'
import App from './App'
import './moke/moke-server.js'
import VueLazyload from 'vue-lazyload'

import router from './router/index.js'
import store from './vuex/store.js'
import './validate.js'
import Star from './component/Star/Star.vue'
import *as API from './api'
import CartControl from './component/CartControl/CartControl.vue'
import loading from './common/images/loading.gif'



Vue.use(VueLazyload, {
  loading,  // 在要显示的图片没有加载到前显示
})
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)



new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')