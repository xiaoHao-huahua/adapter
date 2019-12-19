import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import shop from './modules/shop.js'
import msite from './modules/msite.js'
import user from './modules/user.js'


Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules:{
    msite,
    shop,
    user
  }
})