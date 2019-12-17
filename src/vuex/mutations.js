//保存直接接改变状态数据方法的对象
//不可以有异步代码和逻辑代码
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
  } from './mutation-types.js'

export default {
  //更新state中的
  [RECEIVE_ADDRESS](state,address){  
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RECEIVE_TOKEN](state,{token}){
    state.token = token
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  }
}