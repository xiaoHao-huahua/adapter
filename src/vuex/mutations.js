//保存直接接改变状态数据方法的对象
//不可以有异步代码和逻辑代码
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN

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
  }
}