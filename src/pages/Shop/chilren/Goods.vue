<template>
<div> 
  <div class="goods">
    <div class="menu-wrapper" ref='left'>
      <ul >
        <li class="menu-item" v-for="(good,index) in goods" :key='index' 
            :class="{current:index===currentIndex}" @click="clickItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon"/>
            {{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref='right'>
      <ul ref='rightUI'>
        <li class="food-list-hook" v-for="(good,index) in goods" :key='good.name'>
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" @click="showFood(food)">
              <div class="icon">
                <img
                  width="57"
                  height="57"
                  :src="food.icon"
                />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart/>
  </div>
  <Food :food="food" ref="food"/>
</div>
</template>

<script type="text/ecmascript-6"> 
import BScroll from 'better-scroll'
import {mapState} from 'vuex'

import Food from '../../../component/Food/Food'
import ShopCart from '../../../component/ShopCart/ShopCart'

export default {
  data(){
    return {
      scrollY:'',// 1). 右侧列表滑动的Y轴坐标: scrollY  在滑动过程中不断改变
      tops:[], // 2). 右侧每个分类<li>的top值的数组tops: 第一次列表显示后统计后面不再变化
      food:{} //需要显示的food列表
    }
  },
  computed:{
    ...mapState({
      goods:state=>state.shop.shop.goods || []
    }),
    currentIndex(){
      const {scrollY,tops} = this
      const index =  tops.findIndex((top,index)=>scrollY >= top && scrollY < tops[index+1])
      if(index !== this.index && this.leftScroll){
        this.index = index
        const li = this.$refs.rightUI.children[index]
        this.leftScroll.scrollToElement(li,300)
      }
      return index
    }

  },
  methods:{
    _initScrollY(){
      if(!this.leftScroll){
        this.leftScroll = new BScroll(this.$refs.left,{
          click: true,
        })
        
        this.rightScroll = new BScroll(this.$refs.right,{
          click: true,
          probeType:1 // 非实时 / 触摸
        })

        //右侧列表绑定Scroll监听
        this.rightScroll.on('scroll',({x,y})=>{
          console.log('scroll',x,y);
          this.scrollY = Math.abs(y)
        })

        // 右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd',({x,y})=>{
          console.log('scrollEnd',x,y);
          this.scrollY = Math.abs(y)
        })
      }else{
        this.rightScroll.refresh()
        this.leftScroll.refresh()
      }
      

    },

    //右侧所有分li的top的数组
    _initTops(){
      const tops = []
      let top = 0
      tops.push(top)
      const lis = Array.prototype.slice.call(this.$refs.rightUI.children)
      lis.forEach(li => {
        top += li.clientHeight
        tops.push(top)
      });
      this.tops = tops
    },
    clickItem(index){
      //得到对应的top
      const top = this.tops[index]
      //立即更新scrollY为目标值(立即选中当前分类项)
      this.scrollY = top
      //让右侧列表滑动到对应的位置
      this.rightScroll.scrollTo(0,-top,300)
    },
    showFood(food){
      //保存到状态
      this.food = food
      //显示food组件
      this.$refs.food.toggleShow()
    }

  },
  mounted() {
    if(this.goods.length > 0){
      this._initScrollY()
      this. _initTops()
    }
  },
  watch:{
    goods(){
      this.$nextTick(()=>{
        this._initScrollY()
        this. _initTops()
      })
    }
  },
  components:{
    Food,
    ShopCart
  }
  
};
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 64px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

