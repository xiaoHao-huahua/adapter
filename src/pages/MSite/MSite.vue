<template>
  <div class="on">
    <section class="msite">
      <!--首页头部-->
        <Header :title="address.name || '定位中...'">
          <span class="header_login" slot='right'>
            <span class="header_login_text">登录|注册</span>
          </span>
          <span class="header_search" slot='left'>
            <i class="iconfont icon-sousuo"></i>
          </span>
        </Header>
      <!--首页导航-->
      <nav class="msite_nav">
        <div ref='sc1' class="swiper-container" v-if="categorys.length>0">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key='index'>
              <div class="link_to_food" v-for="(category,index) in categorys" :key='index'>
                <div class="food_container">
                  <img :src="'https://fuss10.elemecdn.com'+ category.image_url">
                </div>
                <span>{{category.title}}</span>
              </div>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="loading">
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <div class="shop_container">
          <ul class="shop_list" v-if="shops.length>0">
            <li class="shop_li border-1px" v-for="(shop,index) in shops" :key='index' @click="$router.push(`/shop/${shop.id}`)">
              <a>
                <div class="shop_left">
                  <img class="shop_img" :src="'https://fuss10.elemecdn.com' + shop.image_path">
                </div>
                <div class="shop_right">
                  <section class="shop_detail_header">
                    <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                    <ul class="shop_detail_ul">
                      <li class="supports" v-for="(support,index) in shop.supports" :key='index'>{{support.icon_name}}</li>
                    </ul>
                  </section>
                  <section class="shop_rating_order">
                    <section class="shop_rating_order_left">
                      <!-- 星星 -->
                      <Star :score="shop.rating" :size="24"/>
                      <div class="rating_section">
                        {{shop.rating}}
                      </div>
                      <div class="order_section">
                        {{shop.recent_order_num}}
                      </div>
                    </section>
                    <section class="shop_rating_order_right">
                      <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                    </section>
                  </section>
                  <section class="shop_distance">
                    <p class="shop_delivery_msg">
                      <span>¥{{shop.float_minimum_order_amount}}起送</span>
                      <span class="segmentation">/</span>
                      <span>配送费约¥{{shop.float_delivery_fee}}</span>
                    </p>
                  </section>
                </div>
              </a>
            </li>
          </ul>
          <ul v-else>
            <li>
              <img src="./images/shop_back.svg" alt="loding">
            </li>
            <li>
              <img src="./images/shop_back.svg" alt="loding">
            </li>
            <li>
              <img src="./images/shop_back.svg" alt="loding">
            </li>
            <li>
              <img src="./images/shop_back.svg" alt="loding">
            </li> 
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import chunk from 'lodash/chunk'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'


  export default {
    computed: {
      ...mapState({
        address:state=>state.msite.address,
        categorys:state=>state.msite.categorys,
        shops:state=>state.msite.shops
      }),
      categorysArr(){
        return chunk(this.categorys,8)
      }
    },
    async mounted(){
      this.$store.dispatch('getShops')
      // dispatch返回的promise在数据更新且界面更新之后才成功
      await this.$store.dispatch('getCategorys')
      // swiper对象必须要在列表数据显示之后创建
      new Swiper(this.$refs.sc1,{
        loop:true, // 循环模式选项
        pagination:{// 如果需要分页器
          el:'.swiper-pagination'
        }
      })
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
      .shop_container
        margin-bottom 50px
        .shop_list
          .shop_li
            bottom-border-1px(#f1f1f1)
            width 100%
            >a
              clearFix()
              display block
              box-sizing border-box
              padding 15px 8px
              width 100%
              .shop_left
                float left
                box-sizing border-box
                width 23%
                height 75px
                padding-right 10px
                .shop_img
                  display block
                  width 100%
                  height 100%
              .shop_right
                float right
                width 77%
                .shop_detail_header
                  clearFix()
                  width 100%
                  .shop_title
                    float left
                    width 200px
                    color #333
                    font-size 16px
                    line-height 16px
                    font-weight 700
                    &::before
                      content '品牌'
                      display inline-block
                      font-size 11px
                      line-height 11px
                      color #333
                      background-color #ffd930
                      padding 2px 2px
                      border-radius 2px
                      margin-right 5px
                  .shop_detail_ul
                    float right
                    margin-top 3px
                    .supports
                      float left
                      font-size 10px
                      color #999
                      border 1px solid #f1f1f1
                      padding 0 2px
                      border-radius 2px
                .shop_rating_order
                  clearFix()
                  width 100%
                  margin-top 18px
                  margin-bottom 8px
                  .shop_rating_order_left
                    float left
                    color #ff9a0d
                    .rating_section
                      float left
                      font-size 10px
                      color #ff6000
                      margin-left 4px
                    .order_section
                      float left
                      font-size 10px
                      color #666
                      transform scale(.8)
                  .shop_rating_order_right
                    float right
                    font-size 0
                    .delivery_style
                      transform-origin 35px 0
                      transform scale(.7)
                      display inline-block
                      font-size 12px
                      padding 1px
                      border-radius 2px
                    .delivery_left
                      color #fff
                      margin-right -10px
                      background-color #02a774
                      border 1px solid #02a774
                    .delivery_right
                      color #02a774
                      border 1px solid #02a774
                .shop_distance
                  clearFix()
                  width 100%
                  font-size 12px
                  .shop_delivery_msg
                    float left
                    transform-origin 0
                    transform scale(.9)
                    color #666
                  .segmentation
                    color #ccc
        












</style>
