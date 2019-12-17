<template>
  <div class='footer'>
    <span @click='goto("/msite")' class='item-group' :class='{on:$route.path === "/msite"}'>
      <span class='iconfont icon-Homehomepagemenu'></span>
      <span>{{$t('footer_home')}}</span>
    </span>
    <span @click='goto("/search")' class='item-group' :class='{on:$route.path === "/search"}'>
      <span class='iconfont icon-search'></span>
      <span>{{$t('footer_search')}}</span>
    </span>
    <span @click='goto("/order")' class='item-group' :class='{on:$route.path === "/order"}'>
      <span class='iconfont icon-order'></span>
      <span>{{$t('footer_order')}}</span>
    </span>
    <span @click='goto("/profile")' class='item-group' :class='{on:$route.path === "/profile" }'>
      <span class='iconfont icon-Profile'></span>
      <span>{{$t('footer_own')}}</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  
  methods:{
    goto(path){
      if(path !== this.$route.path ){
        this.$router.replace(path)
      }else{
        location = path
      } 
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.footer
  position fixed
  display flex
  left 0
  bottom 0
  height 50px
  width 100%
  background #fff
  .item-group
    display flex
    width 25%
    text-align center
    font-size 12px
    flex-direction column
    span 
      margin-top 3px
    &.on
      color $green
    .iconfont
      font-size 24px
    
</style>
