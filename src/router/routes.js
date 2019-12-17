/*
  配置所有的路由路径
 */

import MSite from '../pages/MSite/MSite.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/Login/login.vue'
import Shop from '../pages/Shop/shop.vue'
import Goods from '../pages/Shop/chilren/Goods.vue'
import Ratings from '../pages/Shop/chilren/Ratings.vue'
import Info from '../pages/Shop/chilren/Info.vue'
 

export default [
    {
      path:'/msite',
      component:MSite,
      meta:{
        isShow:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        isShow:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{ // 路由元信息
        isShow:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        isShow:true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:Goods
        },
        {
          path:'/shop/ratings',
          component:Ratings
        },
        {
          path:'/shop/info',
          component:Info
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },
    {
      path:'/',
      redirect:'/msite'
    }
  ]