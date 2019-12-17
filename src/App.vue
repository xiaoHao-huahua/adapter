<template>
  <div class="wrapper">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShow"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { Button } from 'mint-ui';

import FooterGuide from './component/FooterGuide/FooterGuide.vue'
import Header from './component/Header/Header'
import Shop from './pages/Shop/shop'


Vue.component('Header',Header)
Vue.component('Shop',Shop)

Vue.component(Button.name, Button);
export default {
  components:{
    FooterGuide
  },
  async mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
